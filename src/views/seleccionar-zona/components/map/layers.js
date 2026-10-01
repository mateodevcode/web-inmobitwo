import { fetchStatesGeoJSON, fetchCitiesGeoJSON, fetchBarrios } from "@/lib/geoApi";
import { makeFill, makeLine, setLineOpacity, HOVER_DARK, HOVER_DARK_PINK } from "./mapStyles";
import { withState } from "./selInfo";

export function sourceData(map, id, data) {
  if (!map) return;
  if (map.getSource(id)) {
    map.getSource(id).setData(data);
    return;
  }
  try {
    map.addSource(id, { type: "geojson", data });
    const hoverColor =
      id === "region" || id === "dpto" ? HOVER_DARK : HOVER_DARK_PINK;
    map.addLayer(makeFill(id));
    map.addLayer(makeLine(id, hoverColor));
  } catch (e) {
    console.error(`[Zona] error al crear capa ${id}:`, e.message);
  }
}

export function sourceOff(map, id) {
  if (!map) return;
  try {
    if (map.getLayer(`${id}-line`)) map.removeLayer(`${id}-line`);
  } catch {}
  try {
    if (map.getLayer(`${id}-draw-line`)) map.removeLayer(`${id}-draw-line`);
  } catch {}
  try {
    if (map.getLayer(`${id}-fill`)) map.removeLayer(`${id}-fill`);
  } catch {}
  try {
    if (map.getSource(id)) map.removeSource(id);
  } catch {}
}

// capas solo-stroke para modo dibujo (geoman)
export function addDrawSource(map, id, data, strokeColor, minZoom, maxZoom) {
  if (!map) return;
  if (map.getSource(id)) {
    map.getSource(id).setData(data);
    return;
  }
  try {
    map.addSource(id, { type: "geojson", data });
    map.addLayer({
      id: `${id}-draw-line`,
      type: "line",
      source: id,
      minzoom: minZoom || 5,
      maxzoom: maxZoom || 22,
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": strokeColor || "#666",
        "line-width": 1.5,
        "line-opacity": 0.55,
      },
    });
  } catch (e) {
    console.error(`[Zona] error al crear capa draw ${id}:`, e.message);
  }
}

export function clearDrawLayers(map) {
  sourceOff(map, "region");
  sourceOff(map, "dpto");
  sourceOff(map, "mpio");
  sourceOff(map, "barrio");
}

export function removeSelectLayers(map) {
  ["region", "dpto", "mpio", "barrio"].forEach((id) => {
    try {
      if (map.getLayer(`${id}-fill`)) map.removeLayer(`${id}-fill`);
    } catch {}
    try {
      if (map.getLayer(`${id}-line`)) map.removeLayer(`${id}-line`);
    } catch {}
  });
}

export function loadDrawBoundaries(map, setLoading) {
  setLoading(true);
  fetchStatesGeoJSON()
    .then((dptoData) => {
      addDrawSource(map, "dpto", dptoData, "#555", 5, 7.5);
      setLineOpacity(map, "dpto", 1);
      return fetchCitiesGeoJSON("91"); // cargar todos los municipios de Bogotá/Colombia como referencia
    })
    .then((mpioData) => {
      addDrawSource(map, "mpio", mpioData, "#777", 7.5, 10.5);
    })
    .catch((e) => console.error("[Zona] error cargando límites dibujo:", e))
    .finally(() => setLoading(false));
}

// cargar barrios según zoom para modo dibujo
export function maybeLoadDrawBarrios(map, dptoCode, mpioCode) {
  if (!mpioCode) return;
  fetchBarrios(mpioCode)
    .then((data) => {
      if (!data?.features?.length) return;
      data.features = data.features.map((f) => ({
        ...f,
        properties: {
          ...f.properties,
          _mpioDane: mpioCode,
          _dptoDane: dptoCode,
        },
      }));
      addDrawSource(map, "barrio", data, "#999", 10.5, 14.5);
    })
    .catch(() => {});
}

// refrescar todas las capas segun seleccion + hover
// rawRefs: { region, dpto, mpio, barrio } (refs a FeatureCollections)
// selInfo: { region, dpto, mpio, barrio, regionRole, dptoRole, mpioRole }
export function refreshLayers(map, rawRefs, selInfo, hov) {
  if (!map || !map.isStyleLoaded()) return;
  const { region, dpto, mpio, barrio, regionRole, dptoRole, mpioRole } = selInfo;

  if (rawRefs.region.current) {
    const data = {
      ...rawRefs.region.current,
      features: withState(
        rawRefs.region.current.features,
        "slug",
        region,
        regionRole,
        hov,
      ),
    };
    sourceData(map, "region", data);
  }
  if (rawRefs.dpto.current) {
    const data = {
      ...rawRefs.dpto.current,
      features: withState(
        rawRefs.dpto.current.features,
        "DPTO_CCDGO",
        dpto,
        dptoRole,
        hov,
      ),
    };
    sourceData(map, "dpto", data);
  }
  if (rawRefs.mpio.current) {
    const data = {
      ...rawRefs.mpio.current,
      features: withState(
        rawRefs.mpio.current.features,
        "MPIO_CCNCT",
        mpio,
        mpioRole,
        hov,
      ),
    };
    sourceData(map, "mpio", data);
  }
  if (rawRefs.barrio.current) {
    const data = {
      ...rawRefs.barrio.current,
      features: withState(
        rawRefs.barrio.current.features,
        "BAR_COD",
        barrio,
        "selected",
        hov,
      ),
    };
    sourceData(map, "barrio", data);
  }
}

// carga de municipios de un departamento
export async function loadMunicipios(map, rawRefs, code, setLoading, doRefresh) {
  if (!map) return;
  setLoading(true);
  try {
    const data = await fetchCitiesGeoJSON(code);
    if (!data?.features?.length) {
      rawRefs.mpio.current = null;
      sourceOff(map, "mpio");
      setLineOpacity(map, "dpto", 1);
      return;
    }
    data.features = data.features.map((f) => ({
      ...f,
      properties: { ...f.properties, _dptoDane: code },
    }));
    rawRefs.mpio.current = data;
    doRefresh();
    setLineOpacity(map, "dpto", 0.5); // atenúa el borde del depto al haber municipios encima
  } catch (e) {
    console.error("[Zona] error cargando municipios:", e);
  } finally {
    setLoading(false);
  }
}

// carga de barrios de un municipio
export async function loadBarrios(map, rawRefs, code, dptoCode, setLoading, doRefresh) {
  if (!map) return;
  setLoading(true);
  try {
    const data = await fetchBarrios(code);
    if (!data?.features?.length) {
      rawRefs.barrio.current = null;
      sourceOff(map, "barrio");
      setLineOpacity(map, "mpio", 1);
      return;
    }
    data.features = data.features.map((f) => ({
      ...f,
      properties: { ...f.properties, _mpioDane: code, _dptoDane: dptoCode },
    }));
    rawRefs.barrio.current = data;
    doRefresh();
    setLineOpacity(map, "mpio", 0.5);
  } catch (e) {
    console.error("[Zona] error cargando barrios:", e);
  } finally {
    setLoading(false);
  }
}

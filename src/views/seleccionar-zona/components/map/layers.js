import { fetchStatesGeoJSON, fetchCitiesGeoJSON, fetchBarrios } from "@/lib/geoApi";
import { makeFill, makeLine, setLineOpacity, HOVER_DARK, HOVER_DARK_PINK, ID_POR_FUENTE } from "./mapStyles";

// Por mapa: qué FeatureCollection tiene cada fuente (para no repetir setData)
// y qué feature-states aplicamos (para cambiar solo la diferencia).
const datosPorMapa = new WeakMap();
const estadosPorMapa = new WeakMap();
const hoverPorMapa = new WeakMap();

const registro = (wm, map) => {
  if (!wm.has(map)) wm.set(map, {});
  return wm.get(map);
};

export function sourceData(map, id, data) {
  if (!map) return;
  const datos = registro(datosPorMapa, map);
  try {
    if (!map.getSource(id)) {
      map.addSource(id, { type: "geojson", data, promoteId: ID_POR_FUENTE[id] });
      datos[id] = data;
    } else if (datos[id] !== data) {
      map.getSource(id).setData(data);
      datos[id] = data;
    }
    const hoverColor = id === "region" || id === "dpto" ? HOVER_DARK : HOVER_DARK_PINK;
    if (!map.getLayer(`${id}-fill`)) map.addLayer(makeFill(id));
    if (!map.getLayer(`${id}-line`)) map.addLayer(makeLine(id, hoverColor));
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
  delete registro(datosPorMapa, map)[id];
  delete registro(estadosPorMapa, map)[id];
  const hov = hoverPorMapa.get(map);
  if (hov?.fuente === id) hoverPorMapa.delete(map);
}

// Aplica sel/anc a una fuente cambiando solo los polígonos que cambian.
function aplicarEstados(map, id, sel, anc) {
  if (!map.getSource(id)) return;
  const estados = registro(estadosPorMapa, map);
  const previo = estados[id] || { sel: new Set(), anc: new Set() };
  const cambiar = (code, estado) => {
    try {
      map.setFeatureState({ source: id, id: code }, estado);
    } catch {}
  };
  for (const c of previo.sel) if (!sel.has(c)) cambiar(c, { sel: false });
  for (const c of previo.anc) if (!anc.has(c)) cambiar(c, { anc: false });
  for (const c of sel) if (!previo.sel.has(c)) cambiar(c, { sel: true });
  for (const c of anc) if (!previo.anc.has(c)) cambiar(c, { anc: true });
  estados[id] = { sel: new Set(sel), anc: new Set(anc) };
}

// Resalta el polígono bajo el mouse (fuente + código); null lo apaga.
export function setHover(map, fuente, code) {
  if (!map) return;
  const previo = hoverPorMapa.get(map);
  if (previo?.fuente === fuente && previo?.code === code) return;
  if (previo && map.getSource(previo.fuente)) {
    try {
      map.setFeatureState({ source: previo.fuente, id: previo.code }, { hover: false });
    } catch {}
  }
  if (fuente && code != null && map.getSource(fuente)) {
    try {
      map.setFeatureState({ source: fuente, id: code }, { hover: true });
    } catch {}
    hoverPorMapa.set(map, { fuente, code });
  } else {
    hoverPorMapa.delete(map);
  }
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

// Sincroniza las capas de selección con los datos cargados y la selección
// actual. rawRefs: { region, dpto, mpio, barrio } (refs a FeatureCollections)
// estado: estadoMapa(zonas) de lib/zonasSeleccion.js
const VACIO = new Set();
export function refreshLayers(map, rawRefs, estado) {
  // Sin la guarda isStyleLoaded(): también es false mientras cargan teselas
  // (p. ej. en pleno vuelo a una zona) y el repintado se perdía. Solo se
  // llama después del evento "load" del mapa.
  if (!map) return;
  const { seleccion, ancestro } = estado;
  const niveles = [
    ["region", rawRefs.region, seleccion.region, VACIO],
    ["dpto", rawRefs.dpto, seleccion.departamento, ancestro.departamento],
    ["mpio", rawRefs.mpio, seleccion.municipio, ancestro.municipio],
    ["barrio", rawRefs.barrio, seleccion.barrio, VACIO],
  ];
  for (const [id, ref, sel, anc] of niveles) {
    if (!ref.current) continue;
    sourceData(map, id, ref.current);
    aplicarEstados(map, id, sel, anc);
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

import * as maplibregl from "maplibre-gl";
import { findFeature, featBounds } from "@/lib/geoUtils";
import { sourceOff, setHover } from "./layers";
import { zonaCardHTML } from "./zonaCard";
import { fetchGeoCountBatch, getCachedGeoCountBatch } from "@/lib/geoApi";
import { estaSeleccionada } from "../../lib/zonasSeleccion";

// ctx: {
//   zonasRef, drawModeRef, rawRefs, onToggleZona, getCountFilters,
//   popupRef, doLoadMunicipios, doLoadBarrios,
// }
// Se registra una sola vez: todo lo que cambia se lee por refs/getters.

const CAPAS = ["barrio-fill", "mpio-fill", "dpto-fill", "region-fill"];

const LEVEL_BY_LAYER = {
  "region-fill": "region",
  "dpto-fill": "departamento",
  "mpio-fill": "municipio",
  "barrio-fill": "barrio",
};
const FUENTE_BY_LAYER = {
  "region-fill": "region",
  "dpto-fill": "dpto",
  "mpio-fill": "mpio",
  "barrio-fill": "barrio",
};

// Zona (formato de la selección) a partir del polígono pulsado.
function zonaDesdeFeature(lid, p) {
  if (lid === "region-fill") {
    return { type: "region", slug: p.slug, name: p.REG_NAME, dptoDaneCode: null };
  }
  if (lid === "dpto-fill") {
    return { type: "departamento", daneCode: p.DPTO_CCDGO, name: p.DPTO_CNMBR };
  }
  if (lid === "mpio-fill") {
    return {
      type: "municipio",
      daneCode: p.MPIO_CCNCT,
      name: p.MPIO_CNMBR,
      dptoDaneCode: p._dptoDane,
    };
  }
  if (lid === "barrio-fill") {
    return {
      type: "barrio",
      daneCode: p.BAR_COD,
      name: p.NOMB_BARR,
      mpioDaneCode: p._mpioDane,
      dptoDaneCode: p._dptoDane,
    };
  }
  return null;
}

// Acerca solo si la zona no se ve entera o se ve muy pequeña: al marcar
// varias zonas vecinas el mapa no salta en cada clic.
export function zoomSiHaceFalta(map, bounds, padding = 40) {
  if (!bounds) return;
  const v = map.getBounds();
  const [[x1, y1], [x2, y2]] = bounds;
  const cabe = x1 >= v.getWest() && x2 <= v.getEast() && y1 >= v.getSouth() && y2 <= v.getNorth();
  const areaZona = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
  const areaVista = (v.getEast() - v.getWest()) * (v.getNorth() - v.getSouth());
  if (cabe && areaZona / areaVista > 0.04) return;
  map.fitBounds(bounds, { padding, duration: 900, maxZoom: 15 });
}

export function setupInteractivity(map, ctx) {
  function safeQuery(point) {
    const ids = CAPAS.filter((id) => map.getLayer(id));
    if (!ids.length) return [];
    try {
      return map.queryRenderedFeatures(point, { layers: ids });
    } catch {
      return [];
    }
  }

  map.on("click", (e) => {
    if (ctx.drawModeRef.current) return; // no selección en modo dibujo
    const feats = safeQuery(e.point);
    if (!feats.length) return;
    const f = feats[0];
    const lid = f.layer?.id;
    const zona = zonaDesdeFeature(lid, f.properties);
    if (!zona) return;

    const seQuita = estaSeleccionada(ctx.zonasRef.current, zona);
    ctx.onToggleZona(zona);
    // El próximo mousemove rehace la card con "añadir"/"quitar" al día.
    lastCode = null;
    if (ctx.popupRef.current) {
      ctx.popupRef.current.remove();
      ctx.popupRef.current = null;
    }
    if (seQuita) return; // desmarcar no mueve el mapa ni carga subzonas

    // Al marcar: acercar si hace falta y mostrar el siguiente nivel.
    if (lid === "region-fill") {
      ctx.rawRefs.mpio.current = null;
      sourceOff(map, "mpio");
      ctx.rawRefs.barrio.current = null;
      sourceOff(map, "barrio");
      const feat = findFeature(ctx.rawRefs.region.current, "slug", zona.slug) || f;
      zoomSiHaceFalta(map, featBounds(feat));
    } else if (lid === "dpto-fill") {
      ctx.rawRefs.barrio.current = null;
      sourceOff(map, "barrio");
      const feat = findFeature(ctx.rawRefs.dpto.current, "DPTO_CCDGO", zona.daneCode) || f;
      zoomSiHaceFalta(map, featBounds(feat));
      ctx.doLoadMunicipios(zona.daneCode);
    } else if (lid === "mpio-fill") {
      const feat = findFeature(ctx.rawRefs.mpio.current, "MPIO_CCNCT", zona.daneCode) || f;
      zoomSiHaceFalta(map, featBounds(feat));
      ctx.doLoadBarrios(zona.daneCode, zona.dptoDaneCode);
    }
    // Barrios: sin zoom (se marcan varios seguidos).
  });

  let lastCode = null;

  // Pinta la card del hover: primero "Cargando…", luego los conteos del
  // lote (cacheado o fetch). Si el mouse ya se movió a otra zona, no pinta.
  async function renderCard(popup, { level, code, name, parentCode, seleccionada }) {
    const { operation = "", inmueble = "" } = ctx.getCountFilters();
    const args = { type: level, parentDaneCode: parentCode, operation, inmueble };
    const draw = (counts) => {
      if (lastCode !== code || !popup.isOpen()) return;
      const c = counts[code];
      popup.setHTML(
        zonaCardHTML({ name, level, total: c ? c.total : 0, children: c?.children, seleccionada }),
      );
    };
    const cached = getCachedGeoCountBatch(args);
    if (cached) return draw(cached);
    popup.setHTML(zonaCardHTML({ name, level, total: null, seleccionada }));
    try {
      draw(await fetchGeoCountBatch(args));
    } catch {
      if (lastCode === code && popup.isOpen())
        popup.setHTML(zonaCardHTML({ name, level, seleccionada }));
    }
  }

  const limpiarHover = () => {
    lastCode = null;
    setHover(map, null, null);
    map.getCanvas().style.cursor = "";
    if (ctx.popupRef.current) {
      ctx.popupRef.current.remove();
      ctx.popupRef.current = null;
    }
  };

  map.on("mousemove", (e) => {
    if (ctx.drawModeRef.current) return; // no hover en modo dibujo
    const feats = safeQuery(e.point);
    if (!feats.length) {
      if (lastCode !== null) limpiarHover();
      return;
    }
    const f = feats[0];
    const lid = f.layer?.id;
    const zona = zonaDesdeFeature(lid, f.properties);
    if (!zona) return;
    const level = LEVEL_BY_LAYER[lid];
    const code = level === "region" ? zona.slug : zona.daneCode;

    // Misma zona: solo seguir al mouse (no recrear la card ni re-fetchear).
    if (code === lastCode && ctx.popupRef.current) {
      ctx.popupRef.current.setLngLat(e.lngLat);
      return;
    }

    lastCode = code;
    setHover(map, FUENTE_BY_LAYER[lid], code);
    map.getCanvas().style.cursor = "pointer";
    if (ctx.popupRef.current) ctx.popupRef.current.remove();
    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      anchor: "top",
      offset: 10,
      className: "zona-popup",
    })
      .setLngLat(e.lngLat)
      .addTo(map);
    ctx.popupRef.current = popup;
    const parentCode =
      level === "municipio" ? zona.dptoDaneCode : level === "barrio" ? zona.mpioDaneCode : "";
    renderCard(popup, {
      level,
      code,
      name: zona.name,
      parentCode,
      seleccionada: estaSeleccionada(ctx.zonasRef.current, zona),
    });
  });

  map.on("mouseleave", limpiarHover);
}

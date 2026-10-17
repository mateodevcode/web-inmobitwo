import * as maplibregl from "maplibre-gl";
import { findFeature, featBounds } from "@/lib/geoUtils";
import { currentDptoCode, currentMpioCode } from "./selInfo";
import { sourceOff } from "./layers";
import { zoomToBounds } from "@/components/map/mapUtils";
import { zonaCardHTML } from "./zonaCard";
import { fetchGeoCountBatch, getCachedGeoCountBatch } from "@/lib/geoApi";

// ctx: {
//   selRef, drawModeRef, rawRefs,
//   operation, tipoInmueble, onSelectZone,
//   setHovCode, popupRef, doRefresh, doLoadMunicipios, doLoadBarrios,
// }
// Nota: se registra una sola vez (como el original); operation/tipoInmueble/
// onSelectZone quedan capturados del primer render.
export function setupInteractivity(map, ctx) {
  function safeQuery(point) {
    const ids = [
      "barrio-fill",
      "mpio-fill",
      "dpto-fill",
      "region-fill",
    ].filter((id) => map.getLayer(id));
    if (!ids.length) return [];
    try {
      return map.queryRenderedFeatures(point, { layers: ids });
    } catch {
      return [];
    }
  }

  map.on("click", (e) => {
    if (ctx.drawModeRef.current) return; // no drill-down en modo dibujo
    const feats = safeQuery(e.point);
    if (!feats.length) return;
    const f = feats[0];
    const lid = f.layer?.id;
    const p = f.properties;
    const sel = ctx.selRef.current;

    if (lid === "region-fill") {
      const slug = p.slug,
        name = p.REG_NAME;
      if (sel?.type === "region" && sel.slug === slug) return;

      ctx.onSelectZone(
        { type: "region", slug, name, dptoDaneCode: null },
        ctx.operation,
        ctx.tipoInmueble,
      );
      ctx.rawRefs.mpio.current = null;
      sourceOff(map, "mpio");
      ctx.rawRefs.barrio.current = null;
      sourceOff(map, "barrio");

      const feat = findFeature(ctx.rawRefs.region.current, "slug", slug) || f;
      zoomToBounds(map, featBounds(feat), 40);
    } else if (lid === "dpto-fill") {
      const code = p.DPTO_CCDGO,
        name = p.DPTO_CNMBR;
      if (currentDptoCode(sel) === code) return; // ya es el depto activo → no se desmarca

      ctx.onSelectZone(
        { type: "departamento", daneCode: code, name },
        ctx.operation,
        ctx.tipoInmueble,
      );
      ctx.rawRefs.mpio.current = null;
      sourceOff(map, "mpio");
      ctx.rawRefs.barrio.current = null;
      sourceOff(map, "barrio");

      const feat = findFeature(ctx.rawRefs.dpto.current, "DPTO_CCDGO", code) || f;
      zoomToBounds(map, featBounds(feat), 40);
      ctx.doLoadMunicipios(code);
    } else if (lid === "mpio-fill") {
      const code = p.MPIO_CCNCT,
        name = p.MPIO_CNMBR,
        dpto = p._dptoDane;
      if (currentMpioCode(sel) === code) return; // ya es el municipio activo → no se desmarca

      ctx.onSelectZone(
        { type: "municipio", daneCode: code, name, dptoDaneCode: dpto },
        ctx.operation,
        ctx.tipoInmueble,
      );
      ctx.rawRefs.barrio.current = null;
      sourceOff(map, "barrio");

      const feat = findFeature(ctx.rawRefs.mpio.current, "MPIO_CCNCT", code) || f;
      zoomToBounds(map, featBounds(feat), 40);
      ctx.doLoadBarrios(code, dpto);
    } else if (lid === "barrio-fill") {
      const code = p.BAR_COD,
        name = p.NOMB_BARR,
        mpio = p._mpioDane,
        dpto = p._dptoDane;
      if (sel?.type === "barrio" && sel.daneCode === code) return; // ya es el barrio activo → no se desmarca

      ctx.onSelectZone(
        {
          type: "barrio",
          daneCode: code,
          name,
          mpioDaneCode: mpio,
          dptoDaneCode: dpto,
        },
        ctx.operation,
        ctx.tipoInmueble,
      );

      const feat = findFeature(ctx.rawRefs.barrio.current, "BAR_COD", code) || f;
      zoomToBounds(map, featBounds(feat), 60);
    }
  });

  const LEVEL_BY_LAYER = {
    "region-fill": "region",
    "dpto-fill": "departamento",
    "mpio-fill": "municipio",
    "barrio-fill": "barrio",
  };
  let lastCode = null;

  // Pinta la card del hover: primero "Cargando…", luego los conteos del
  // lote (cacheado o fetch). Si el mouse ya se movió a otra zona, no pinta.
  async function renderCard(popup, { level, code, name, parentCode }) {
    const { operation = "", inmueble = "" } = ctx.getCountFilters();
    const args = { type: level, parentDaneCode: parentCode, operation, inmueble };
    const draw = (counts) => {
      if (lastCode !== code || !popup.isOpen()) return;
      const c = counts[code];
      popup.setHTML(
        zonaCardHTML({ name, level, total: c ? c.total : 0, children: c?.children }),
      );
    };
    const cached = getCachedGeoCountBatch(args);
    if (cached) return draw(cached);
    popup.setHTML(zonaCardHTML({ name, level, total: null }));
    try {
      draw(await fetchGeoCountBatch(args));
    } catch {
      if (lastCode === code && popup.isOpen())
        popup.setHTML(zonaCardHTML({ name, level }));
    }
  }

  map.on("mousemove", (e) => {
    if (ctx.drawModeRef.current) return; // no hover en modo dibujo
    const feats = safeQuery(e.point);
    if (!feats.length) {
      lastCode = null;
      ctx.setHovCode(null);
      ctx.doRefresh(null);
      if (ctx.popupRef.current) {
        ctx.popupRef.current.remove();
        ctx.popupRef.current = null;
      }
      return;
    }
    const f = feats[0];
    const p = f.properties;
    let code = "",
      name = "";
    if (f.layer?.id === "region-fill") {
      code = p.slug;
      name = p.REG_NAME;
    } else if (f.layer?.id === "dpto-fill") {
      code = p.DPTO_CCDGO;
      name = p.DPTO_CNMBR;
    } else if (f.layer?.id === "mpio-fill") {
      code = p.MPIO_CCNCT;
      name = p.MPIO_CNMBR;
    } else if (f.layer?.id === "barrio-fill") {
      code = p.BAR_COD;
      name = p.NOMB_BARR;
    }
    const level = LEVEL_BY_LAYER[f.layer?.id];
    const parentCode =
      level === "municipio"
        ? p._dptoDane
        : level === "barrio"
          ? p._mpioDane
          : "";

    // Misma zona: solo seguir al mouse (no recrear la card ni re-fetchear).
    if (code === lastCode && ctx.popupRef.current) {
      ctx.popupRef.current.setLngLat([e.lngLat.lng, e.lngLat.lat]);
      return;
    }

    lastCode = code;
    ctx.setHovCode(code);
    ctx.doRefresh(code);
    if (ctx.popupRef.current) ctx.popupRef.current.remove();
    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      anchor: "top",
      offset: 10,
      className: "zona-popup",
    })
      .setLngLat([e.lngLat.lng, e.lngLat.lat])
      .addTo(map);
    ctx.popupRef.current = popup;
    renderCard(popup, { level, code, name, parentCode });
  });

  map.on("mouseleave", () => {
    lastCode = null;
    ctx.setHovCode(null);
    ctx.doRefresh(null);
    if (ctx.popupRef.current) {
      ctx.popupRef.current.remove();
      ctx.popupRef.current = null;
    }
  });
}

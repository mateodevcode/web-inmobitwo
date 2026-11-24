// Lógica pura del mapa de inmuebles: qué área pedir, cuándo hace falta volver
// a pedir y qué chinchetas pintar. Sin MapLibre ni React (fácil de probar).
import Supercluster from "supercluster";

// bbox = { minLng, minLat, maxLng, maxLat }

// Se pide más área de la visible para que mover un poco el mapa no dispare
// otra petición (factor 0.5 = media pantalla extra por cada lado).
export function expandirBbox(b, factor = 0.5) {
  const dx = (b.maxLng - b.minLng) * factor;
  const dy = (b.maxLat - b.minLat) * factor;
  return {
    minLng: Math.max(-180, b.minLng - dx),
    maxLng: Math.min(180, b.maxLng + dx),
    minLat: Math.max(-85, b.minLat - dy),
    maxLat: Math.min(85, b.maxLat + dy),
  };
}

export const contiene = (ext, int) =>
  ext.minLng <= int.minLng &&
  ext.minLat <= int.minLat &&
  ext.maxLng >= int.maxLng &&
  ext.maxLat >= int.maxLat;

const dentro = (b, lng, lat) =>
  lng >= b.minLng && lng <= b.maxLng && lat >= b.minLat && lat <= b.maxLat;

// ¿Sirven los datos en caché para esta vista o hay que pedir otra vez?
// - Otros filtros o vista fuera del área pedida → pedir.
// - Grupos del servidor: dependen del zoom → pedir si cambió el nivel.
// - Puntos: el cliente los reagrupa a cualquier zoom → sirven.
export function necesitaPedir(datos, vista, zoom, filtrosKey) {
  if (!datos) return true;
  if (datos.filtrosKey !== filtrosKey) return true;
  if (!contiene(datos.bbox, vista)) return true;
  if (datos.modo === "grupos" && Math.floor(zoom) !== datos.zoom) return true;
  return false;
}

let versionIndice = 0;

// Prepara la respuesta del backend para pintar (índice de supercluster una
// sola vez por respuesta, no en cada movimiento).
export function prepararDatos(respuesta, { bbox, zoom, filtrosKey }) {
  const base = { bbox, zoom: Math.floor(zoom), filtrosKey, total: respuesta.total ?? 0 };
  if (respuesta.modo === "grupos") {
    return { ...base, modo: "grupos", grupos: respuesta.grupos || [] };
  }
  const puntos = (respuesta.puntos || []).filter(
    (p) => Number.isFinite(p.lat) && Number.isFinite(p.lng),
  );
  const indice = new Supercluster({ radius: 60, maxZoom: 16 });
  indice.load(
    puntos.map((p) => ({
      type: "Feature",
      properties: p,
      geometry: { type: "Point", coordinates: [p.lng, p.lat] },
    })),
  );
  return { ...base, modo: "puntos", puntos, indice, version: ++versionIndice };
}

// Chinchetas a pintar en la vista + cuántos inmuebles hay en pantalla.
export function itemsParaVista(datos, vista, zoom) {
  if (!datos) return { items: [], totalVisible: 0 };
  const margen = expandirBbox(vista, 0.15); // que no "aparezcan" al borde

  if (datos.modo === "grupos") {
    const items = [];
    let totalVisible = 0;
    for (const g of datos.grupos) {
      if (dentro(vista, g.lng, g.lat)) totalVisible += g.total;
      if (!dentro(margen, g.lng, g.lat)) continue;
      items.push({
        clave: `s:${g.lng.toFixed(5)},${g.lat.toFixed(5)}:${g.total}`,
        tipo: "grupo",
        servidor: true,
        lng: g.lng,
        lat: g.lat,
        total: g.total,
      });
    }
    return { items, totalVisible };
  }

  let totalVisible = 0;
  for (const p of datos.puntos) if (dentro(vista, p.lng, p.lat)) totalVisible++;

  const feats = datos.indice.getClusters(
    [margen.minLng, margen.minLat, margen.maxLng, margen.maxLat],
    Math.floor(zoom),
  );
  const items = feats.map((f) => {
    const [lng, lat] = f.geometry.coordinates;
    if (f.properties.cluster) {
      return {
        clave: `c:${datos.version}:${f.properties.cluster_id}`,
        tipo: "grupo",
        clusterId: f.properties.cluster_id,
        lng,
        lat,
        total: f.properties.point_count,
      };
    }
    return { clave: `p:${f.properties.id}`, tipo: "punto", lng, lat, punto: f.properties };
  });
  return { items, totalVisible };
}

// Zoom al que hay que ir al pulsar un grupo para que se abra.
export function zoomAlAbrirGrupo(datos, item, zoomActual) {
  if (!item.servidor && datos?.indice && item.clusterId != null) {
    try {
      return Math.min(18, datos.indice.getClusterExpansionZoom(item.clusterId));
    } catch {}
  }
  return Math.min(18, Math.floor(zoomActual) + 2);
}

import { apiBackend } from "@/actions/apiBackend.js";
import { MAPPING_TIPOS } from "@/data/mappings_busqueda.js";

// ─────────────────────────────────────────────
// Caché de GeoJSON estáticos (regiones/departamentos de Colombia no
// cambian): evita re-pedirlos en cada montaje del mapa y tumbar el
// rate-limit (429 "Demasiadas solicitudes"). Memoria + sessionStorage,
// con promesas en vuelo compartidas para no duplicar peticiones.
// ─────────────────────────────────────────────
const geoCache = new Map();
const geoPending = new Map();

const leerCacheSesion = (clave) => {
  try {
    const raw = sessionStorage.getItem(`geo:${clave}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const guardarCacheSesion = (clave, datos) => {
  try {
    sessionStorage.setItem(`geo:${clave}`, JSON.stringify(datos));
  } catch {}
};

async function fetchGeoCacheado(clave, fetcher) {
  if (geoCache.has(clave)) return geoCache.get(clave);
  const deSesion = leerCacheSesion(clave);
  if (deSesion) {
    geoCache.set(clave, deSesion);
    return deSesion;
  }
  if (geoPending.has(clave)) return geoPending.get(clave);
  const promesa = (async () => {
    try {
      const datos = await fetcher();
      geoCache.set(clave, datos);
      guardarCacheSesion(clave, datos);
      return datos;
    } finally {
      geoPending.delete(clave);
    }
  })();
  geoPending.set(clave, promesa);
  return promesa;
}

export async function fetchRegionsGeoJSON() {
  return fetchGeoCacheado("regions", async () => {
    const res = await apiBackend("/api/regions/geojson");
    if (!res.success) throw new Error(res.error || "Error cargando regiones");
    return res.data;
  });
}

export async function fetchStatesGeoJSON() {
  return fetchGeoCacheado("states", async () => {
    const res = await apiBackend("/api/states/geojson");
    if (!res.success) throw new Error(res.error || "Error cargando departamentos");
    return res.data;
  });
}

export async function fetchCitiesGeoJSON(stateDaneCode) {
  return fetchGeoCacheado(`cities:${stateDaneCode}`, async () => {
    const res = await apiBackend(`/api/cities/geojson?stateDaneCode=${stateDaneCode}`);
    if (!res.success) throw new Error(res.error || "Error cargando municipios");
    return res.data;
  });
}

export async function fetchBarrios(cityDaneCode) {
  try {
    return await fetchGeoCacheado(`barrios:${cityDaneCode}`, async () => {
      const res = await apiBackend(`/api/barrios?cityDaneCode=${cityDaneCode}`);
      if (!res.success) return { type: "FeatureCollection", features: [] };
      return res.data;
    });
  } catch {
    return { type: "FeatureCollection", features: [] };
  }
}

function expandTipoInmueble(slug) {
  return MAPPING_TIPOS[slug] || slug;
}

export async function fetchGeoCount(type, daneCode, operation, tipoInmuebleSlug) {
  const inmueble = expandTipoInmueble(tipoInmuebleSlug);
  const params = new URLSearchParams({ type, daneCode });
  if (operation) params.set("operation", operation);
  if (inmueble) params.set("inmueble", inmueble);
  const res = await apiBackend(`/api/geo-count?${params.toString()}`);
  if (!res.success) return 0;
  return res.data.total || 0;
}

// ─────────────────────────────────────────────
// Conteos por lote para la card del hover (mapa SeleccionarZona): una sola
// petición por nivel (todas las zonas del nivel de golpe). TTL en memoria +
// promesa en vuelo compartida para no duplicar peticiones entre hovers.
// ─────────────────────────────────────────────
const BATCH_TTL = 5 * 60 * 1000;
const batchCache = new Map();
const batchInflight = new Map();

const batchKey = ({ type, parentDaneCode = "", operation = "", inmueble = "" }) =>
  `${type}:${parentDaneCode}:${operation}:${inmueble}`;

export function getCachedGeoCountBatch(args) {
  const hit = batchCache.get(batchKey(args));
  return hit && Date.now() - hit.at < BATCH_TTL ? hit.counts : null;
}

export async function fetchGeoCountBatch(args) {
  const key = batchKey(args);
  const cached = getCachedGeoCountBatch(args);
  if (cached) return cached;
  if (batchInflight.has(key)) return batchInflight.get(key);

  const { type, parentDaneCode = "", operation = "", inmueble = "" } = args;
  const params = new URLSearchParams({ type });
  if (parentDaneCode) params.set("parentDaneCode", parentDaneCode);
  if (operation) params.set("operation", operation);
  const expandido = expandTipoInmueble(inmueble);
  if (expandido) params.set("inmueble", expandido);

  const req = (async () => {
    try {
      const res = await apiBackend(`/api/geo-count/batch?${params.toString()}`);
      if (!res.success) throw new Error(res.error || "Error en geo-count/batch");
      const counts = res.data?.counts || {};
      batchCache.set(key, { at: Date.now(), counts });
      return counts;
    } finally {
      batchInflight.delete(key);
    }
  })();
  batchInflight.set(key, req);
  return req;
}

export async function fetchInmueblesEnPoligono(polygon, operation, tipoInmuebleSlug) {
  const inmueble = expandTipoInmueble(tipoInmuebleSlug);
  const body = {
    polygon,
    operation: operation || undefined,
    tipoInmueble: inmueble || undefined,
  };
  // Reintentos con backoff: al restaurar un dibujo se dispara el fetch junto
  // a otras peticiones y un 429 momentáneo dejaba el área sin anuncios.
  let ultimoError = null;
  for (let intento = 0; intento < 3; intento++) {
    const res = await apiBackend("/api/inmuebles-en-poligono", "POST", body);
    if (res.success) return res.data;
    ultimoError = res.error;
    if (intento < 2) await new Promise((r) => setTimeout(r, 500 * (intento + 1)));
  }
  console.warn("[Zona] inmuebles-en-poligono falló tras 3 intentos:", ultimoError);
  return { total: 0, propiedades: [] };
}

// ─────────────────────────────────────────────
// Varias zonas a la vez (mapa "Seleccionar en mapa"). `zonas` en formato
// "municipio:11001,barrio:110010101" (ver views/seleccionar-zona/lib/zonasSeleccion).
// ─────────────────────────────────────────────
const conteoZonasCache = new Map();

export async function fetchConteoZonas(zonas, operation, tipoInmuebleSlug) {
  const tipoInmueble = expandTipoInmueble(tipoInmuebleSlug) || undefined;
  const clave = `${zonas}|${operation}|${tipoInmueble}`;
  const hit = conteoZonasCache.get(clave);
  if (hit && Date.now() - hit.at < BATCH_TTL) return hit.total;
  const res = await apiBackend("/api/zonas/conteo", "POST", {
    zonas,
    operation: operation || undefined,
    tipoInmueble,
  });
  if (!res.success) throw new Error(res.error || "Error contando inmuebles");
  const total = res.data?.total ?? 0;
  conteoZonasCache.set(clave, { at: Date.now(), total });
  return total;
}

// Polígonos de las zonas elegidas (minimapa de resultados). Los límites no
// cambian: misma caché de memoria + sessionStorage que el resto de GeoJSON.
export async function fetchGeoJSONZonas(zonas) {
  return fetchGeoCacheado(`zonas:${zonas}`, async () => {
    const res = await apiBackend("/api/zonas/geojson", "POST", { zonas });
    if (!res.success) throw new Error(res.error || "Error cargando zonas");
    return res.data;
  });
}

export async function fetchInmueblesEnZonas(zonas, operation, tipoInmuebleSlug) {
  const res = await apiBackend("/api/inmuebles-en-zonas", "POST", {
    zonas,
    operation: operation || undefined,
    tipoInmueble: expandTipoInmueble(tipoInmuebleSlug) || undefined,
  });
  if (!res.success) throw new Error(res.error || "Error cargando inmuebles");
  return res.data || { total: 0, propiedades: [] };
}

// Datos livianos del mapa de chinchetas: puntos (pocos) o grupos hechos en
// el servidor (muchos). Ver backend /propiedades/mapa.
export async function fetchMapaInmuebles({ minLat, minLng, maxLat, maxLng, zoom, operation, tipoInmueble }) {
  const r = (n) => Number(n).toFixed(5);
  const params = new URLSearchParams({
    minLat: r(minLat),
    minLng: r(minLng),
    maxLat: r(maxLat),
    maxLng: r(maxLng),
    zoom: String(Math.floor(zoom)),
  });
  if (operation) params.set("operation", operation.toLowerCase());
  if (tipoInmueble) params.set("tipoInmueble", expandTipoInmueble(tipoInmueble));

  const res = await apiBackend(`/propiedades/mapa?${params.toString()}`);
  if (!res.success) throw new Error(res.error || "Error cargando el mapa");
  return res.data || { modo: "puntos", total: 0, puntos: [] };
}

// Resumen de la card del mapa. Cacheado por id (con la promesa en vuelo
// compartida): el mapa y la galería de la card lo piden a la vez.
const resumenCache = new Map();
export function fetchPropiedadResumen(id) {
  if (resumenCache.has(id)) return resumenCache.get(id);
  const req = apiBackend(`/propiedades/${id}/resumen`)
    .then((res) => (res.success ? res.data : null))
    .catch(() => null)
    .then((data) => {
      if (!data) resumenCache.delete(id); // reintentar en el próximo clic
      return data;
    });
  resumenCache.set(id, req);
  return req;
}

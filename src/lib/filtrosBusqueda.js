// src/lib/filtrosBusqueda.js
// Construye el objeto `filtros` para guardar una búsqueda: exactamente lo mismo
// que usePropertySearch envía a /propiedades/search-slugs (slugs ya resueltos
// con los mappings + los 13 query params). Fuente única para no duplicar.
import { MAPPING_OPERACIONES, MAPPING_TIPOS } from "@/data/mappings_busqueda";

// Claves de query que usePropertySearch reenvía al backend.
export const CLAVES_FILTROS_URL = [
  "min", "max", "tamMin", "tamMax", "tipos", "rental", "fecha",
  "anunciante", "multimedia", "hab", "banos", "estado", "caract",
];

export function buildFiltrosApi({ operationSlug, typeSlug, citySlug, deptSlug, searchParams }) {
  const operationDb = MAPPING_OPERACIONES[operationSlug] || operationSlug;
  const typeDb = MAPPING_TIPOS[typeSlug] || typeSlug;
  const f = {};
  if (operationDb) f.operation = operationDb;
  if (deptSlug) f.dept = deptSlug;
  if (citySlug) f.city = citySlug;
  const tipos = searchParams?.get("tipos");
  if (tipos) f.tipos = tipos;
  else if (typeDb) f.type = typeDb;
  for (const k of CLAVES_FILTROS_URL) {
    if (k === "tipos") continue;
    const v = searchParams?.get(k);
    if (v) f[k] = v;
  }
  return f;
}

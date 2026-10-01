import { MAPPING_OPERACIONES } from "@/data/mappings_busqueda";

export const getOperationSlug = (tab) => MAPPING_OPERACIONES[tab] || tab;

export const getSecondSegment = (geo) => {
  if (!geo) return null;
  if (geo.type === "region") return geo.regionSlug;
  if (geo.type === "departamento") return geo.departmentSlug;
  return `${geo.citySlug}-${geo.departmentSlug}`;
};

export const buildGeoPath = (tab, tipoSlug, geo) => {
  const secondSegment = getSecondSegment(geo);
  if (!secondSegment) return null;
  return `/${getOperationSlug(tab)}-${tipoSlug}/${secondSegment}`;
};

export const buildZonaUrl = (tab, tipoSlug) =>
  `/busqueda-multizona/${getOperationSlug(tab)}-${tipoSlug}`;

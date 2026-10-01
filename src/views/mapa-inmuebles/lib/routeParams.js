export function parseOperationAndType(raw) {
  const parts = (raw || "venta-viviendas").split("-");
  return {
    operation: parts[0],
    tipoInmueble: parts.slice(1).join("-"),
  };
}

export function slugToName(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export const TIPO_BADGE = {
  apartamento: "Apartamento",
  casa: "Casa",
  casa_campestre: "Casa campestre",
  apartaestudio: "Apartaestudio",
  penthouse: "Penthouse",
  casa_lote: "Casa lote",
  local: "Local",
  oficina: "Oficina",
  bodega: "Bodega",
  consultorio: "Consultorio",
  edificio: "Edificio",
  lote: "Lote / Terreno",
  finca: "Finca",
  parqueadero: "Parqueadero",
  trastero: "Trastero",
  habitacion: "Habitación",
};

export const OPERACION_LABEL = {
  venta: "Venta",
  alquiler: "Alquiler",
};

export const getTitulo = (inmueble) => inmueble?.titulo || "Sin título";

export const getUbicacion = (inmueble) => {
  if (inmueble?.city_name) return `${inmueble.city_name}, ${inmueble.state_name}`;
  if (inmueble?.ciudad) {
    return `${inmueble.ciudad}${inmueble.departamento ? `, ${inmueble.departamento}` : ""}`;
  }
  return "";
};

export const getTipoLabel = (inmueble) =>
  inmueble?.tipo_inmueble || TIPO_BADGE[inmueble?.tipo] || inmueble?.tipo || "";

export const getOperacionLabel = (inmueble) =>
  inmueble?.operacion || OPERACION_LABEL[inmueble?.operacion] || "";

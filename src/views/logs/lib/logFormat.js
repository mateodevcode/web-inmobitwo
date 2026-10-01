export const COLOR_POR_TIPO = {
  sesion: "text-blue-400",
  evento: "text-gray-200",
  lead: "text-yellow-300 font-semibold",
};

export const formatearHora = (fecha) =>
  new Date(fecha).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

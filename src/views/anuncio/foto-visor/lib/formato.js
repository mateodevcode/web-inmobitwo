import {
  MODO_3D,
  MODO_FOTOS,
  MODO_MAPA,
  MODO_PLANOS,
} from "../constants";

export const parsePosicion1Based = (valor) => {
  const n = Number.parseInt(valor, 10);
  return Number.isNaN(n) || n < 1 ? 1 : n;
};

export const acotarIndice = (indiceCeroBased, total) => {
  if (total <= 0) return 0;
  return Math.min(Math.max(indiceCeroBased, 0), total - 1);
};

export const construirSpecsLinea = (inmueble) => {
  if (!inmueble) return [];
  const area = inmueble.constructed_area
    ? `${inmueble.constructed_area} m²`
    : inmueble.private_area
      ? `${inmueble.private_area} m²`
      : null;
  return [
    area,
    inmueble.bedroom_count != null ? `${inmueble.bedroom_count} alc.` : null,
    inmueble.floor
      ? `${inmueble.floor} ${inmueble.has_elevator ? "con ascensor" : ""}`.trim()
      : null,
    inmueble.estrato != null ? `Estrato ${inmueble.estrato}` : null,
  ].filter(Boolean);
};

export const obtenerEtiquetaEspacio = (
  galeriaFilas,
  fotoAgrupada,
  indiceActual,
) => {
  if (!fotoAgrupada) return indiceActual === 0 ? "Salón" : "";
  const fila = galeriaFilas?.find((f) => f.orden === fotoAgrupada.orden);
  return fila?.etiqueta || (indiceActual === 0 ? "Salón" : "");
};

export const obtenerCounterText = (
  modo,
  indexActual,
  totalImagenes,
  indexPlanos,
  totalPlanos,
) => {
  switch (modo) {
    case MODO_FOTOS:
      return `Foto ${indexActual + 1}/${totalImagenes}`;
    case MODO_PLANOS:
      return totalPlanos > 0
        ? `Plano ${indexPlanos + 1}/${totalPlanos}`
        : "Plano no disponible";
    case MODO_MAPA:
      return "Mapa de zona";
    case MODO_3D:
      return "Vista 3D";
    default:
      return "";
  }
};

export const getBtnClass = (modoActivo, modoBoton) => {
  const base =
    "flex items-center gap-2 border-2 px-3 py-1.5 text-sm font-semibold cursor-pointer justify-center";
  return modoActivo === modoBoton
    ? `${base} border-tercero text-tercero bg-tercero/20`
    : `${base} border-segundo/80 text-gray-800 hover:border-tercero hover:text-tercero hover:bg-tercero/20`;
};

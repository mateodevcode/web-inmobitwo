import { MODO_3D, MODO_FOTOS, MODO_MAPA, MODO_PLANOS } from "../constants";

// El modo vive en la URL (?planos=1 / ?3d=1 / ?mapa=1) para que sobreviva a
// router.replace y a recargas.
export const resolverModo = (searchParams) => {
  if (searchParams.get("mapa") === "1") return MODO_MAPA;
  if (searchParams.get("planos") === "1") return MODO_PLANOS;
  if (searchParams.get("3d") === "1") return MODO_3D;
  return MODO_FOTOS;
};

export const queryPorModo = (modo) => {
  switch (modo) {
    case MODO_PLANOS:
      return "?planos=1";
    case MODO_MAPA:
      return "?mapa=1";
    case MODO_3D:
      return "?3d=1";
    default:
      return "";
  }
};

// src/actions/descartados.js
import { apiBackend } from "./apiBackend";

const base = "/descartados";

export const descartarPropiedad = (propiedadId) =>
  apiBackend(`${base}/descartar`, "POST", { propiedadId });
export const restaurarPropiedad = (propiedadId) =>
  apiBackend(`${base}/restaurar`, "POST", { propiedadId });
export const idsDescartados = () => apiBackend(`${base}/ids`, "GET");
export const listarDescartados = () =>
  apiBackend(`${base}/mis-descartados`, "GET");

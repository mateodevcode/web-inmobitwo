// src/actions/busquedasGuardadas.js
import { apiBackend } from "./apiBackend";

const base = "/busquedas-guardadas";

export const crearBusqueda = (data) => apiBackend(base, "POST", data);
export const listarBusquedas = () => apiBackend(base, "GET");
export const verificarBusqueda = (filtros) => apiBackend(`${base}/verificar`, "POST", { filtros });
export const actualizarBusqueda = (id, data) => apiBackend(`${base}/${id}`, "PATCH", data);
export const eliminarBusqueda = (id) => apiBackend(`${base}/${id}`, "DELETE");
export const bajaBusqueda = (token) => apiBackend(`${base}/baja/${token}`, "POST");
export const reactivarBusqueda = (token) => apiBackend(`${base}/baja/${token}/reactivar`, "POST");

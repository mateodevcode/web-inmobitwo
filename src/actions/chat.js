// src/actions/chat.js
import { apiBackend } from "./apiBackend";

const base = "/chat";

export const obtenerTokenChat = () => apiBackend(`${base}/token`, "POST");
export const iniciarConversacion = (propiedadId) =>
  apiBackend(`${base}/conversaciones`, "POST", { propiedadId });
export const listarConversaciones = () =>
  apiBackend(`${base}/conversaciones`, "GET");
export const listarMensajes = (id, antesDe, limite = 30) => {
  const qs = antesDe ? `?antesDe=${antesDe}&limite=${limite}` : "";
  return apiBackend(`${base}/conversaciones/${id}/mensajes${qs}`, "GET");
};
export const enviarMensaje = (id, contenido, clientMsgId) =>
  apiBackend(`${base}/conversaciones/${id}/mensajes`, "POST", {
    contenido,
    clientMsgId,
  });
export const marcarLeida = (id) =>
  apiBackend(`${base}/conversaciones/${id}/leer`, "POST");
export const contarNoLeidos = () => apiBackend(`${base}/no-leidos`, "GET");

// hooks/chatStore.js
//
// Store externo del CHAT del usuario.
// Mismo patrón que favoritosStore/descartadosStore: estado fuera de React
// con `useSyncExternalStore` para no re-renderizar toda la app.
//
// Uso:
//   const conversaciones = useChatStore((s) => s.conversaciones);

import { useSyncExternalStore } from "react";

const initialState = () => ({
  conversaciones: [],
  mensajesPorConv: {},
  noLeidosTotal: 0,
  estadoConexion: "desconectado",
});

let state = initialState();
const listeners = new Set();

const emit = () => listeners.forEach((l) => l());
const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const getSnapshot = () => state;
const setState = (partial) => {
  state = { ...state, ...partial };
  emit();
};

const at = (c) => c.ultimoMensaje?.at || c.createdAt || 0;

const ordenarConvs = (convs) =>
  [...convs].sort((a, b) => new Date(at(b)) - new Date(at(a)));

export const setConversaciones = (conversaciones) =>
  setState({ conversaciones: conversaciones ?? [] });

// Inserta o sustituye por id; si trae clientMsgId, sustituye el optimista.
export const upsertMensaje = (conversacionId, mensaje) => {
  const actual = state.mensajesPorConv[conversacionId] ?? [];
  const idx = actual.findIndex(
    (m) =>
      (mensaje.id != null && m.id === mensaje.id) ||
      (mensaje.clientMsgId && m.clientMsgId === mensaje.clientMsgId),
  );
  const lista =
    idx >= 0
      ? actual.map((m, i) => (i === idx ? { ...m, ...mensaje } : m))
      : [...actual, mensaje];
  setState({
    mensajesPorConv: { ...state.mensajesPorConv, [conversacionId]: lista },
  });
};

export const setMensajesConv = (conversacionId, mensajes, alPrincipio = false) => {
  const actual = state.mensajesPorConv[conversacionId] ?? [];
  setState({
    mensajesPorConv: {
      ...state.mensajesPorConv,
      [conversacionId]: alPrincipio
        ? [...mensajes, ...actual]
        : mensajes,
    },
  });
};

export const actualizarUltimoMensaje = (conversacionId, mensaje, deMi) => {
  const conversaciones = ordenarConvs(
    state.conversaciones.map((c) =>
      c.id === conversacionId
        ? {
            ...c,
            ultimoMensaje: {
              texto: mensaje.contenido,
              at: mensaje.createdAt,
              deMi,
            },
          }
        : c,
    ),
  );
  setState({ conversaciones });
};

export const marcarLeidaLocal = (conversacionId, miId) => {
  const mensajes = (state.mensajesPorConv[conversacionId] ?? []).map((m) =>
    m.remitenteId !== miId && !m.leidoAt
      ? { ...m, leidoAt: new Date().toISOString() }
      : m,
  );
  const conversaciones = state.conversaciones.map((c) =>
    c.id === conversacionId ? { ...c, noLeidos: 0 } : c,
  );
  setState({
    mensajesPorConv: { ...state.mensajesPorConv, [conversacionId]: mensajes },
    conversaciones,
    noLeidosTotal: conversaciones.reduce((t, c) => t + (c.noLeidos || 0), 0),
  });
};

export const incrementarNoLeidos = (conversacionId) => {
  const conversaciones = state.conversaciones.map((c) =>
    c.id === conversacionId ? { ...c, noLeidos: (c.noLeidos || 0) + 1 } : c,
  );
  setState({
    conversaciones,
    noLeidosTotal: conversaciones.reduce((t, c) => t + (c.noLeidos || 0), 0),
  });
};

export const setNoLeidosTotal = (total) =>
  setState({ noLeidosTotal: total ?? 0 });

// Quita la conversación de la lista y limpia sus mensajes.
// Uso al eliminar: el otro usuario la sigue viendo (soft-delete en backend).
export const eliminarConversacionLocal = (conversacionId) => {
  const conversaciones = state.conversaciones.filter(
    (c) => c.id !== conversacionId,
  );
  const mensajesPorConv = { ...state.mensajesPorConv };
  delete mensajesPorConv[conversacionId];
  setState({
    conversaciones,
    mensajesPorConv,
    noLeidosTotal: conversaciones.reduce((t, c) => t + (c.noLeidos || 0), 0),
  });
};

export const setEstadoConexion = (estadoConexion) =>
  setState({ estadoConexion });

export const clearChatStore = () => {
  state = initialState();
  emit();
};

export const marcarPropiosLeidos = (conversacionId, miId) => {
  const mensajes = (state.mensajesPorConv[conversacionId] ?? []).map((m) =>
    m.remitenteId === miId && !m.leidoAt
      ? { ...m, leidoAt: new Date().toISOString() }
      : m,
  );
  setState({
    mensajesPorConv: { ...state.mensajesPorConv, [conversacionId]: mensajes },
  });
};

export const getChatSnapshot = () => state;

export const useChatStore = (selector = (s) => s) =>
  useSyncExternalStore(
    subscribe,
    () => selector(getSnapshot()),
    () => selector(initialState()),
  );

export default useChatStore;

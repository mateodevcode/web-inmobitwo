// lib/chatSocket.js
//
// Gestor único del WebSocket del chat (singleton de módulo).
// Transporte: socket-core. Historial y estado: REST + chatStore.
// socket-core no guarda historial ni avisa al reiniciar: tras cada
// reconexión (o al volver a la pestaña) se recupera por REST.

import {
  obtenerTokenChat,
  listarConversaciones,
  listarMensajes,
  contarNoLeidos,
} from "@/actions/chat";
import {
  getChatSnapshot,
  setConversaciones,
  setMensajesConv,
  upsertMensaje,
  actualizarUltimoMensaje,
  incrementarNoLeidos,
  marcarPropiosLeidos,
  setNoLeidosTotal,
  setEstadoConexion,
} from "@/hooks/chatStore";

let ws = null;
let reintentoTimer = null;
let renovacionTimer = null;
let backoffMs = 1000;
let paradaManual = false;
let clientId = null;

const BACKOFF_MAX = 30000;

const leerUsuarioId = () => {
  try {
    const raw = localStorage.getItem("usuario");
    const id = raw ? JSON.parse(raw)?.id : null;
    return id != null ? Number(id) : null;
  } catch {
    return null;
  }
};

const limpiarTimers = () => {
  if (reintentoTimer) clearTimeout(reintentoTimer);
  if (renovacionTimer) clearTimeout(renovacionTimer);
  reintentoTimer = null;
  renovacionTimer = null;
};

const totalNoLeidos = (convs) =>
  (convs ?? []).reduce((t, c) => t + (c.noLeidos || 0), 0);

// Tras (re)conectar o volver a la pestaña: REST manda (socket-core es
// efímero y se pueden haber perdido mensajes).
const recuperarChat = async () => {
  try {
    const [lista, conteo] = await Promise.all([
      listarConversaciones(),
      contarNoLeidos(),
    ]);
    if (lista?.success) {
      setConversaciones(lista.data);
      setNoLeidosTotal(totalNoLeidos(lista.data));
    } else if (conteo?.success) {
      setNoLeidosTotal(conteo.data?.total ?? 0);
    }
    const activa = conversacionAbiertaEnUrl();
    if (activa != null) {
      const hist = await listarMensajes(activa, null, 30);
      if (hist?.success) setMensajesConv(activa, hist.data?.mensajes ?? []);
    }
  } catch {
    // silencioso: el chat sigue funcionando por REST
  }
};

const programarRenovacion = (expiresIn) => {
  if (renovacionTimer) clearTimeout(renovacionTimer);
  const ms = Math.max((expiresIn - 30) * 1000, 10000);
  renovacionTimer = setTimeout(() => conectar(), ms);
};

const programarReintento = () => {
  if (paradaManual) return;
  const jitter = Math.random() * 1000;
  const ms = Math.min(backoffMs + jitter, BACKOFF_MAX);
  backoffMs = Math.min(backoffMs * 2, BACKOFF_MAX);
  reintentoTimer = setTimeout(() => conectar(), ms);
};

const conversacionAbiertaEnUrl = () => {
  try {
    const c = new URLSearchParams(window.location.search).get("c");
    const n = Number(c);
    return Number.isInteger(n) && n > 0 ? n : null;
  } catch {
    return null;
  }
};

const atenderMensaje = (evento) => {
  const usuarioId = leerUsuarioId();
  const tipo = evento?.payload?.type;
  if (tipo === "mensaje_nuevo") {
    const { conversacionId, mensaje } = evento.payload;
    const snap = getChatSnapshot();
    const existe = snap.conversaciones.some((c) => c.id === conversacionId);
    if (!existe) {
      recuperarChat();
      return;
    }
    const deMi = mensaje.remitenteId === usuarioId;
    upsertMensaje(conversacionId, mensaje);
    actualizarUltimoMensaje(conversacionId, mensaje, deMi);
    const visible =
      conversacionAbiertaEnUrl() === conversacionId &&
      typeof document !== "undefined" &&
      !document.hidden;
    if (!deMi && !visible) incrementarNoLeidos(conversacionId);
    return;
  }
  if (tipo === "leido") {
    const { conversacionId } = evento.payload;
    if (usuarioId != null) marcarPropiosLeidos(conversacionId, usuarioId);
  }
};

const conectar = async () => {
  if (paradaManual) return;
  if (!localStorage.getItem("access_token")) return;
  const usuarioId = leerUsuarioId();
  if (usuarioId == null) return;

  detenerSocket();
  setEstadoConexion("conectando");
  try {
    const res = await obtenerTokenChat();
    if (!res?.success || !res.data?.token) throw new Error("sin token");
    const { token, expiresIn, channel, wsUrl } = res.data;
    if (!clientId) {
      const rand =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID().slice(0, 8)
          : String(Math.floor(Math.random() * 1e9));
      clientId = `web-${usuarioId}-${rand}`;
    }
    const socket = new WebSocket(`${wsUrl}?token=${token}`);
    ws = socket;
    let recuperado = false;
    const marcarListo = () => {
      backoffMs = 1000;
      setEstadoConexion("conectado");
      if (!recuperado) {
        recuperado = true;
        recuperarChat();
      }
    };

    socket.onopen = () => {
      socket.send(JSON.stringify({ channel, client_id: clientId }));
    };
    socket.onmessage = (e) => {
      try {
        const evento = JSON.parse(e.data);
        // El primer evento del sistema confirma el handshake: momento de
        // recuperar por REST (pueden haberse perdido mensajes).
        if (evento?.source === "__system__") {
          marcarListo();
          return;
        }
        marcarListo();
        atenderMensaje(evento);
      } catch {
        // mensaje no-JSON: se ignora
      }
    };
    const alCerrar = () => {
      if (ws !== socket) return;
      ws = null;
      setEstadoConexion("desconectado");
      programarReintento();
    };
    socket.onclose = alCerrar;
    socket.onerror = () => {
      try {
        socket.close();
      } catch {
        // ya cerrado
      }
    };
    programarRenovacion(expiresIn ?? 600);
  } catch {
    setEstadoConexion("desconectado");
    programarReintento();
  }
};

const detenerSocket = () => {
  if (ws) {
    const s = ws;
    ws = null;
    try {
      s.close();
    } catch {
      // ya cerrado
    }
  }
};

export const iniciarChatSocket = () => {
  paradaManual = false;
  backoffMs = 1000;
  clientId = null;
  conectar();
  if (typeof window !== "undefined") {
    window.addEventListener("online", alVolverOnline);
    document.addEventListener("visibilitychange", alCambiarVisibilidad);
  }
};

export const detenerChatSocket = () => {
  paradaManual = true;
  limpiarTimers();
  detenerSocket();
  setEstadoConexion("desconectado");
  if (typeof window !== "undefined") {
    window.removeEventListener("online", alVolverOnline);
    document.removeEventListener("visibilitychange", alCambiarVisibilidad);
  }
};

const alVolverOnline = () => {
  backoffMs = 1000;
  conectar();
};

const alCambiarVisibilidad = () => {
  if (typeof document !== "undefined" && !document.hidden) recuperarChat();
};

// src/actions/sesion.js — token de acceso y usuario SOLO en memoria (auditoría N-12/N-13).
//
// Antes el access_token y el usuario (con su rol) vivían en localStorage, donde
// los lee cualquier XSS o extensión. Ahora:
// - el token es una variable de este módulo (se pierde al recargar);
// - el usuario lo tiene AppProvider en estado y aquí solo se guarda su id para
//   módulos sin React (chat, cachés);
// - en localStorage queda únicamente "sesion_activa" = "1", un indicador sin
//   datos para saber si vale la pena pedir POST /auth/refresh (cookie httpOnly)
//   al cargar la página; así los visitantes anónimos no hacen esa petición.
const CLAVE_HAY_SESION = "sesion_activa";

let accessToken = null;
let usuarioId = null;

export const obtenerToken = () => accessToken;

export function guardarToken(token) {
  accessToken = token || null;
}

export const obtenerUsuarioId = () => usuarioId;

export function guardarUsuarioSesion(usuario) {
  usuarioId = usuario?.id != null ? Number(usuario.id) : null;
}

const guardarLocal = (fn) => {
  if (typeof window === "undefined") return null;
  try {
    return fn(window.localStorage);
  } catch {
    return null; // almacenamiento bloqueado
  }
};

export function marcarSesionActiva() {
  guardarLocal((ls) => ls.setItem(CLAVE_HAY_SESION, "1"));
}

// ¿Hubo una sesión en este navegador? Incluye la clave "usuario" de versiones
// anteriores para no cerrar la sesión a quien ya estaba dentro.
export function haySesionPrevia() {
  return Boolean(guardarLocal((ls) => ls.getItem(CLAVE_HAY_SESION) || ls.getItem("usuario")));
}

export function borrarSesionLocal() {
  accessToken = null;
  usuarioId = null;
  guardarLocal((ls) => ls.removeItem(CLAVE_HAY_SESION));
}

// Versiones anteriores guardaban aquí el token y el usuario.
export function limpiarClavesAntiguas() {
  guardarLocal((ls) => {
    ls.removeItem("access_token");
    ls.removeItem("usuario");
  });
}

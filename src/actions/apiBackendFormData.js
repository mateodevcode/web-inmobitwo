// src/api/apiBackendFormData.js
import { URL_BACKEND } from "@/config/config.js";
import { obtenerTokenFresco } from "./refreshToken";
import { borrarSesionLocal, obtenerToken } from "./sesion";
import { buildLoginUrl, obtenerOrigenActual } from "@/utils/authRedirect.js";

// Subidas de fotos y planos: más margen que las peticiones JSON.
const TIMEOUT_MS = 120_000;

export async function apiBackendFormData(endpoint, formData, method = "POST") {
  try {
    const url = `${URL_BACKEND}${endpoint}`;
    const token = obtenerToken();

    const res = await fetch(url, {
      method,
      headers: {
        "X-Tenant-Host": window.location.host,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      credentials: "include",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      body: formData,
    });

    // Token expirado → renovar y reintentar
    if (res.status === 401 && token) {
      const renovado = await obtenerTokenFresco();
      if (renovado) {
        const nuevoToken = obtenerToken();
        const reintento = await fetch(url, {
          method,
          headers: {
            "X-Tenant-Host": window.location.host,
            Authorization: `Bearer ${nuevoToken}`,
          },
          credentials: "include",
          signal: AbortSignal.timeout(TIMEOUT_MS),
          body: formData,
        });
        const data = await reintento.json();
        return formatearRespuesta(data, reintento.status);
      } else {
        borrarSesionLocal();
        // Sesión expirada: a /login conservando la página para volver tras el login.
        window.location.href = buildLoginUrl(obtenerOrigenActual());
        return { success: false, error: "Sesión expirada.", data: null };
      }
    }

    const data = await res.json();
    return formatearRespuesta(data, res.status);
  } catch (error) {
    // Sin respuesta a tiempo: mensaje claro en vez de una espera infinita.
    if (error?.name === "TimeoutError") {
      return {
        success: false,
        message: "El servidor tardó demasiado en responder.",
        error: "El servidor tardó demasiado en responder. Revisa tu conexión e inténtalo de nuevo.",
        data: null,
        status: 408,
      };
    }
    return {
      success: false,
      message: "No se pudo conectar con el servidor",
      error: error.message,
      data: null,
      status: 500,
    };
  }
}

// ─────────────────────────────────────────────
function formatearRespuesta(data, status) {
  return {
    success: data.success ?? false,
    message: data.message ?? null,
    data: data.data ?? null,
    error: data.error ?? null,
    status,
  };
}

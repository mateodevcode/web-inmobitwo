// src/utils/reintentoRed.js
// Política de reintento para medición de vistas (paso8 punto 5):
// - 503/429 (o cualquier HTTP de error): NUNCA se reintenta.
// - Fallo de red (fetch rechaza): máximo 1 reintento tras 5 s.
// - Nunca muestra errores al usuario: el llamador silencia todo.
// Sin dependencias: testeable en Node puro.
export const RETRASO_REINTENTO_MS = 5000;

export const esFalloDeRed = (error) =>
  !!error &&
  (error instanceof TypeError ||
    ["Failed to fetch", "NetworkError", "Load failed", "ERR_"].some((s) =>
      String(error?.message || error).includes(s),
    ));

/**
 * ¿Reintentar tras un intento fallido?
 * @param {number} intentosPrevios 0 en el primer fallo, 1 en el segundo...
 * @param {{ status?: number|null, error?: unknown }} fallo
 */
export const debeReintentar = (intentosPrevios, fallo = {}) => {
  if (typeof fallo.status === "number") return false; // HTTP: 503, 429, 500... nunca
  if (!esFalloDeRed(fallo.error)) return false;
  return intentosPrevios < 1; // una sola vez, tras 5 s
};

export const esperar = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

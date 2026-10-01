// src/utils/authRedirect.js
// Soporte de "volver a la página de origen" tras el login (?next=).
//
// Flujo:
//   1. Un guard (o la expiración de sesión) envía a `/login?next=<origen>`
//      con `buildLoginUrl(origen)`.
//   2. Tras un login/registro exitoso se redirige a `getSafeNext(next) ?? "/"`.
//   3. Si no había origen (o es inválido) se va al inicio ("/").
//
// `getSafeNext` solo acepta rutas internas del propio frontend para evitar
// open-redirects (p. ej. `?next=https://evil.com` o `?next=//evil.com`).
// Tampoco acepta rutas bajo `/login` para evitar bucles de redirección.

export function getSafeNext(value) {
  if (typeof value !== "string" || !value) return null;
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    return null;
  }
  // Solo rutas internas absolutas (empiezan por un único "/").
  if (!decoded.startsWith("/") || decoded.startsWith("//")) return null;
  // Sin esquema (https:, javascript:, ...) ni backslashes.
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(decoded)) return null;
  if (decoded.includes("\\")) return null;
  // Nunca volver al propio login (evita bucles).
  if (decoded === "/login" || decoded.startsWith("/login?") || decoded.startsWith("/login/")) {
    return null;
  }
  return decoded;
}

// Añade ?next= a una ruta base (p. ej. "/registro").
// Si el origen es inválido, devuelve la ruta base sin query.
export function agregarNext(pathBase, origen) {
  const safe = getSafeNext(origen);
  return safe ? `${pathBase}?next=${encodeURIComponent(safe)}` : pathBase;
}

// Construye la URL de login conservando la página de origen.
// Si `origen` es inválido o apunta al propio login, devuelve "/login" pelado.
export function buildLoginUrl(origen) {
  return agregarNext("/login", origen);
}

// Lee y valida el `?next=` de la URL actual del navegador.
// Pensado para llamarse desde efectos/handlers en cliente.
export function leerNextActual() {
  if (typeof window === "undefined") return null;
  try {
    return getSafeNext(new URLSearchParams(window.location.search).get("next"));
  } catch {
    return null;
  }
}

// Origen actual (pathname + search) para usar como `?next=`.
// Devuelve null si ya estamos en el login (evita bucles).
export function obtenerOrigenActual() {
  if (typeof window === "undefined") return null;
  const pathname = window.location.pathname;
  if (pathname === "/login" || pathname.startsWith("/login/")) return null;
  return `${pathname}${window.location.search}`;
}

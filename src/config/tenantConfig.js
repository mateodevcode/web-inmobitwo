// src/config/tenantConfig.js
// ────────────────────────────────────────────────────────────────
// Dominios que consideramos "la plataforma principal" (red social).
// Cualquier otro hostname que llegue por window.location.host se
// trata como un posible dominio propio de una organización, y se
// intenta resolver contra el backend.
//
// Configúralo en tu .env del frontend:
//   NEXT_PUBLIC_MAIN_HOSTS=inmobitwo.seventwo.tech,localhost:3000
//
// (incluye el puerto en local, ej: localhost:3000, porque
// window.location.host lo incluye si no es 80/443)
// ────────────────────────────────────────────────────────────────
export const MAIN_HOSTS = (
  process.env.NEXT_PUBLIC_MAIN_HOSTS || "localhost:3000"
)
  .split(",")
  .map((h) => h.trim())
  .filter(Boolean);

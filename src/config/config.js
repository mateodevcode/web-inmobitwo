export const URL_BACKEND = process.env.NEXT_PUBLIC_API_URL;
export const URL_CRM =
  process.env.NEXT_PUBLIC_CRM_URL ?? "http://localhost:5173";

// Mercado Pago (Colombia): public key para el Payment Brick. Es un dato
// público; sin ella el pago se muestra deshabilitado con aviso.
export const MP_PUBLIC_KEY = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY ?? "";

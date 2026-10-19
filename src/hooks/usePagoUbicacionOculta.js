// src/hooks/usePagoUbicacionOculta.js
// Compatibilidad: el hook genérico es usePago. Este wrapper fija el producto
// "ocultar ubicación" para no tocar los imports existentes.

import usePago, { ESTADO_PAGO } from "./usePago";
import { PAGO_UBICACION_OCULTA } from "@/lib/pagos/productos";

export { ESTADO_PAGO };

export default function usePagoUbicacionOculta(propiedadId) {
  return usePago(PAGO_UBICACION_OCULTA, propiedadId);
}

// src/components/pagos/PagoUbicacionOculta.jsx
// Wrapper de compatibilidad del modal genérico PagoModal para el producto
// "ocultar ubicación". Mantiene la prop histórica `propiedadId`.

import PagoModal from "./PagoModal";
import { PAGO_UBICACION_OCULTA } from "@/lib/pagos/productos";

export default function PagoUbicacionOculta({ propiedadId, ...props }) {
  return (
    <PagoModal
      producto={PAGO_UBICACION_OCULTA}
      contextoId={propiedadId}
      {...props}
    />
  );
}

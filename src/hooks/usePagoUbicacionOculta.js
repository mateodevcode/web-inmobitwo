// src/hooks/usePagoUbicacionOculta.js
// Lógica compartida del pago "ocultar ubicación" ($22.000 COP, Mercado Pago).
// El componente visual está en src/components/pagos/PagoUbicacionOculta.jsx.

import { useCallback, useState } from "react";
import { apiBackend } from "@/actions/apiBackend";

export const ESTADO_PAGO = {
  ABIERTO: "abierto",
  ENVIANDO: "enviando",
  APROBADO: "approved",
  PENDIENTE: "pending",
  RECHAZADO: "rejected",
  ERROR: "error",
};

export default function usePagoUbicacionOculta(propiedadId) {
  const [estado, setEstado] = useState(null); // ESTADO_PAGO
  const [mensaje, setMensaje] = useState("");
  const [detallePago, setDetallePago] = useState(null); // {pago_id, estado}
  const [enProcesoBrick, setEnProcesoBrick] = useState(false);

  // GET /pagos/config — precio/moneda/enable
  // useCallback: identidad estable; PagoUbicacionOculta la usa en useState
  // deps y sin esto se crea un bucle fetch→render→fetch.
  const cargarConfig = useCallback(async () => {
    try {
      const { data } = await apiBackend("/pagos/config");
      return {
        habilitado: data?.habilitado ?? false,
        precio: data?.precio ?? 22000,
        moneda: data?.moneda ?? "COP",
        maxCuotas: data?.max_cuotas ?? 1,
      };
    } catch {
      return { habilitado: false, precio: 22000, moneda: "COP", maxCuotas: 1 };
    }
  }, []);

  // Envía el pago a POST /pagos/ubicacion-oculta
  const enviarPago = useCallback(async (datosBrick) => {
    if (!propiedadId) {
      setEstado(ESTADO_PAGO.ERROR);
      setMensaje("Falta el id del anuncio para iniciar el pago.");
      return null;
    }
    setEstado(ESTADO_PAGO.ENVIANDO);
    setMensaje("");

    try {
      const res = await apiBackend("/pagos/ubicacion-oculta", "POST", {
        propiedad_id: propiedadId,
        token: datosBrick?.token,
        payment_method_id: datosBrick?.payment_method_id,
        installments: datosBrick?.installments,
        issuer_id: datosBrick?.issuer_id,
        payer: datosBrick?.payer,
      });

      const data = res?.data ?? res;

      // 409 pago en curso: retomar ese estado en vez de cobrar de nuevo
      if (res?.status === 409 || String(res?.status) === "409") {
        setDetallePago(data ?? null);
        setEstado(
          data?.estado === "approved" ? ESTADO_PAGO.APROBADO : ESTADO_PAGO.PENDIENTE,
        );
        setMensaje(
          "Ya existe un pago en curso para este anuncio. Puedes consultarlo abajo.",
        );
        return data;
      }

      const estadoPago = data?.estado ?? ESTADO_PAGO.ERROR;
      setDetallePago(data ?? null);

      if (estadoPago === "approved" && data?.ubicacion_oculta) {
        setEstado(ESTADO_PAGO.APROBADO);
        setMensaje("Listo, la ubicación de tu anuncio quedó oculta.");
      } else if (estadoPago === "approved") {
        setEstado(ESTADO_PAGO.PENDIENTE);
        setMensaje(
          "Tu pago fue aprobado y estamos activando la ocultación. En unos instantes quedará aplicada.",
        );
      } else if (estadoPago === "pending" || estadoPago === "in_process") {
        setEstado(ESTADO_PAGO.PENDIENTE);
        setMensaje(
          "Tu pago está en proceso. Tu ubicación exacta seguirá visible hasta que se confirme.",
        );
      } else if (estadoPago === "rejected" || estadoPago === "cancelled") {
        setEstado(ESTADO_PAGO.RECHAZADO);
        setMensaje(
          "Algo salió mal con el pago. Tu anuncio fue creado, pero la ubicación exacta seguirá visible hasta que el pago se realice. Puedes reintentar ahora o más tarde desde tu panel o al editar el anuncio.",
        );
      } else {
        setEstado(ESTADO_PAGO.ERROR);
        setMensaje(
          data?.error ||
            res?.error ||
            "No se pudo iniciar el pago. Tu anuncio ya existe y puedes reintentarlo desde tu panel.",
        );
      }
      return data;
    } catch (e) {
      setEstado(ESTADO_PAGO.ERROR);
      setMensaje(
        e?.message ||
          "No se pudo conectar con el pago. Tu anuncio ya existe: puedes reintentar ahora o más tarde.",
      );
    } finally {
      setEnProcesoBrick(false);
    }
  }, [propiedadId]);

  // GET /pagos/ubicacion-oculta/:propiedadId/estado (polling)
  const consultarEstado = useCallback(async () => {
    if (!propiedadId) return null;
    try {
      const res = await apiBackend(
        `/pagos/ubicacion-oculta/${propiedadId}/estado`,
      );
      const data = res?.data ?? res;
      setDetallePago(data?.ultimo_pago ?? null);
      if (data?.ubicacion_oculta) {
        setEstado(ESTADO_PAGO.APROBADO);
        setMensaje("Listo, la ubicación de tu anuncio quedó oculta.");
      } else if (data?.ultimo_pago?.estado === "rejected") {
        setEstado(ESTADO_PAGO.RECHAZADO);
        setMensaje(
          "El pago fue rechazado. Tu ubicación exacta sigue visible: puedes intentarlo de nuevo.",
        );
      }
      return data;
    } catch {
      return null;
    }
  }, [propiedadId]);

  return {
    estado,
    mensaje,
    detallePago,
    enProcesoBrick,
    setEnProcesoBrick,
    cargarConfig,
    enviarPago,
    consultarEstado,
  };
}

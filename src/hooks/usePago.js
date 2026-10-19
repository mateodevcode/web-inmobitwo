// src/hooks/usePago.js
// Lógica compartida de un pago con Mercado Pago (Orders API + Brick).
// Genérico por producto: la config vive en src/lib/pagos/productos.js.
//
// El Brick entrega un token de un solo uso; el monto real lo fija el backend.

import { useCallback, useMemo, useState } from "react";
import { apiBackend } from "@/actions/apiBackend";

export const ESTADO_PAGO = {
  ABIERTO: "abierto",
  ENVIANDO: "enviando",
  APROBADO: "approved",
  PENDIENTE: "pending",
  SIN_CONFIRMAR: "sin_confirmar",
  RECHAZADO: "rejected",
  ERROR: "error",
};

export default function usePago(producto, contextoId) {
  const [estado, setEstado] = useState(null); // ESTADO_PAGO
  const [mensaje, setMensaje] = useState("");
  const [detallePago, setDetallePago] = useState(null); // {pago_id, estado}
  const [enProcesoBrick, setEnProcesoBrick] = useState(false);

  const msg = useMemo(() => producto?.mensajes ?? {}, [producto]);

  // GET /pagos/config — precio/moneda/enable del producto.
  // useCallback: identidad estable; el modal la usa en deps y sin esto se
  // crea un bucle fetch→render→fetch.
  const cargarConfig = useCallback(async () => {
    const fallback = {
      habilitado: false,
      precio: producto?.precioDefault ?? 0,
      moneda: producto?.monedaDefault ?? "COP",
      maxCuotas: producto?.maxCuotasDefault ?? 1,
    };
    if (!producto) return fallback;
    try {
      const { data } = await apiBackend("/pagos/config");
      const prod = data?.productos?.[producto.tipo] ?? {};
      return {
        habilitado: data?.habilitado ?? false,
        precio:
          prod.precio ??
          (producto.tipo === "ubicacion_oculta" ? data?.precio : null) ??
          fallback.precio,
        moneda: prod.moneda ?? data?.moneda ?? fallback.moneda,
        maxCuotas:
          prod.max_cuotas ??
          (producto.tipo === "ubicacion_oculta" ? data?.max_cuotas : null) ??
          fallback.maxCuotas,
      };
    } catch {
      return fallback;
    }
  }, [producto]);

  // Envía el pago a POST /pagos/:producto.
  // Rechaza (throw) solo en errores de validación/rechazo para que el Brick
  // vuelva a habilitar el botón. En 409 y 5xx resuelve: no se debe reintentar
  // a ciegas (el servidor ya tiene un intento y evita el doble cobro).
  const enviarPago = useCallback(
    async (datosBrick) => {
      if (!producto || !contextoId) {
        setEstado(ESTADO_PAGO.ERROR);
        setMensaje("Falta el id del anuncio para iniciar el pago.");
        throw new Error("Falta el id del anuncio.");
      }
      setEstado(ESTADO_PAGO.ENVIANDO);
      setMensaje("");

      try {
        const res = await apiBackend(`/pagos/${producto.slug}`, "POST", {
          [producto.campoContexto]: contextoId,
          token: datosBrick?.token,
          payment_method_id: datosBrick?.payment_method_id,
          payment_type: datosBrick?.payment_type,
          installments: datosBrick?.installments,
          payer: datosBrick?.payer,
        });

        const data = res?.data ?? null;
        const status = Number(res?.status);

        // 409: el contexto ya tiene el derecho o hay un intento en curso
        // (doble pestaña / doble clic). No se cobra de nuevo.
        if (status === 409) {
          setDetallePago(data);
          if (producto.estaAplicado(data)) {
            setEstado(ESTADO_PAGO.APROBADO);
            setMensaje(msg.aprobado);
            return data;
          }
          setEstado(ESTADO_PAGO.PENDIENTE);
          setMensaje(msg.enCurso);
          return data;
        }

        // 5xx (incluye fallo de red): no sabemos si MP registró el cobro.
        // Se deja el Brick montado y NO se invita a reintentar de inmediato:
        // la fila local ya bloquea un segundo intento y la reconciliación decide.
        if (!res?.success && (status >= 500 || status === 0)) {
          setEstado(ESTADO_PAGO.SIN_CONFIRMAR);
          setMensaje(msg.sinConfirmar);
          return data;
        }

        // Validación / rechazo de MP: el Brick sigue montado para corregir los
        // datos y muestra el error (se propaga el throw). No se cambia a
        // 'rechazado' para no desmontarlo.
        if (!res?.success) {
          const err = new Error(
            res?.error || "No se pudo iniciar el pago. Intenta de nuevo.",
          );
          err.status = status;
          setEstado(ESTADO_PAGO.SIN_CONFIRMAR);
          setMensaje(res?.error || msg.reintento);
          throw err;
        }

        const estadoPago = data?.estado ?? ESTADO_PAGO.ERROR;
        setDetallePago(data);

        if (estadoPago === "approved" && producto.estaAplicado(data)) {
          setEstado(ESTADO_PAGO.APROBADO);
          setMensaje(msg.aprobado);
        } else if (estadoPago === "approved") {
          setEstado(ESTADO_PAGO.PENDIENTE);
          setMensaje(msg.aprobadoSinAplicar);
        } else if (estadoPago === "pending" || estadoPago === "in_process") {
          setEstado(ESTADO_PAGO.PENDIENTE);
          setMensaje(msg.pendiente);
        } else if (
          estadoPago === "rejected" ||
          estadoPago === "cancelled" ||
          estadoPago === "expirado"
        ) {
          // 'expirado': el intento nunca llegó a MP (se reconcilió antes de
          // expirar), así que reintentar es seguro.
          setEstado(ESTADO_PAGO.RECHAZADO);
          setMensaje(msg.reintento);
        } else {
          setEstado(ESTADO_PAGO.PENDIENTE);
          setMensaje(msg.sinConfirmar);
        }
        return data;
      } catch (e) {
        // Errores ya clasificados arriba: se propagan para que el Brick los
        // muestre. Cualquier otro es de red: tampoco se invita a reintentar.
        if (e?.status !== undefined) throw e;
        setEstado(ESTADO_PAGO.SIN_CONFIRMAR);
        setMensaje(msg.sinConfirmar);
        return null;
      } finally {
        setEnProcesoBrick(false);
      }
    },
    [producto, contextoId, msg],
  );

  // GET /pagos/:producto/:contextoId/estado (polling)
  const consultarEstado = useCallback(async () => {
    if (!producto || !contextoId) return null;
    try {
      const res = await apiBackend(
        `/pagos/${producto.slug}/${contextoId}/estado`,
      );
      const data = res?.data ?? res;
      setDetallePago(data?.ultimo_pago ?? null);
      if (producto.estaAplicado(data)) {
        setEstado(ESTADO_PAGO.APROBADO);
        setMensaje(msg.aprobado);
      } else if (data?.ultimo_pago?.estado === "rejected") {
        setEstado(ESTADO_PAGO.RECHAZADO);
        setMensaje(msg.rechazadoConsultado);
      } else if (data?.ultimo_pago?.estado === "expirado") {
        setEstado(ESTADO_PAGO.RECHAZADO);
        setMensaje(msg.expiradoConsultado);
      } else if (
        ["pending", "in_process", "iniciado"].includes(
          data?.ultimo_pago?.estado,
        )
      ) {
        setEstado(ESTADO_PAGO.PENDIENTE);
        setMensaje(msg.pendiente);
      }
      return data;
    } catch {
      return null;
    }
  }, [producto, contextoId, msg]);

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

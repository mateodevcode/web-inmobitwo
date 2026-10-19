// src/components/pagos/PagoModal.jsx
// Modal genérico de pago con Payment Brick de Mercado Pago.
// El producto aporta textos, endpoint y helpers (src/lib/pagos/productos.js).
// El monto mostrado es solo visual: el cobro real lo fija el backend.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X, MapPin, ShieldCheck } from "lucide-react";
import { CardPayment, initMercadoPago } from "@mercadopago/sdk-react";
import { MP_PUBLIC_KEY } from "@/config/config.js";
import usePago from "@/hooks/usePago";

let mpInicializado = false;
const iniciarMP = () => {
  if (MP_PUBLIC_KEY && !mpInicializado) {
    initMercadoPago(MP_PUBLIC_KEY, { locale: "es-CO" });
    mpInicializado = true;
  }
  return Boolean(MP_PUBLIC_KEY);
};

export default function PagoModal({
  producto,
  abierto,
  contextoId,
  onClose,
  onAprobado,
  prefillEmail = "",
}) {
  const [config, setConfig] = useState(null);
  // Cada reintento remonta el Brick (key nueva) para generar un token nuevo:
  // los tokens de tarjeta son de un solo uso.
  const [reintento, setReintento] = useState(0);
  const [reintentando, setReintentando] = useState(false);
  const mpOk = Boolean(MP_PUBLIC_KEY);
  const avisado = useRef(false);
  const {
    estado,
    mensaje,
    enProcesoBrick,
    setEnProcesoBrick,
    cargarConfig,
    enviarPago,
    consultarEstado,
  } = usePago(producto, contextoId);

  const msg = producto?.mensajes ?? {};

  useEffect(() => {
    if (!abierto || !contextoId) return;
    iniciarMP();
    let activo = true;
    cargarConfig().then((res) => {
      if (activo) setConfig(res);
    });
    // Reconciliación perezosa: si hay un pago pendiente, el modal lo muestra
    // al abrirse (el panel reutiliza este modal para "ver estado").
    consultarEstado();
    return () => {
      activo = false;
    };
  }, [abierto, contextoId, cargarConfig, consultarEstado]);

  // Al reabrir o cambiar de contexto se permite avisar otra vez.
  useEffect(() => {
    avisado.current = false;
  }, [abierto, contextoId]);

  useEffect(() => {
    if (estado === "approved" && !avisado.current) {
      avisado.current = true;
      onAprobado?.();
    }
  }, [estado, onAprobado]);

  const approved = estado === "approved";
  const pendiente = estado === "pending";
  const sinConfirmar = estado === "sin_confirmar";
  const rechazado = estado === "rejected" || estado === "error";
  // Tras un rechazo/pendiente, "Reintentar pago" vuelve a montar el Brick con
  // un token nuevo. En 'sin_confirmar' (5xx/red) el Brick sigue montado y NO
  // se invita a pagar otra vez: el servidor ya tiene un intento en curso.
  const mostrarBrick = (!pendiente && !rechazado) || reintentando;

  const onBrickSubmit = useCallback(
    async (formData, additionalData) => {
      setReintentando(false);
      setEnProcesoBrick(true);
      // Card Payment Brick entrega el formData PLANO (token, issuer_id,
      // payment_method_id, installments, payer) y, como segundo argumento,
      // additionalData con paymentTypeId. Orders API exige payment_type.
      return await enviarPago({
        token: formData?.token,
        payment_method_id: formData?.payment_method_id,
        payment_type: additionalData?.paymentTypeId,
        installments: formData?.installments,
        payer: formData?.payer,
      });
    },
    [enviarPago, setEnProcesoBrick],
  );

  const precio = producto?.precioVisible
    ? producto.precioVisible(config)
    : (config?.precio ?? 0);
  const moneda = producto?.monedaVisible
    ? producto.monedaVisible(config)
    : (config?.moneda ?? "COP");

  // El CardPayment del SDK re-mounta SIEMPRE que cambia la identidad de sus
  // props (useEffect con [initialization, onError, ...]). Objetos/flechas
  // creadas en el render provocaban un mount → unmount → mount que rompe los
  // Secure Fields ("fields_setup_failed_after_3_tries"). Por eso, identidad
  // estable en TODO lo que entra al brick.
  const inicializacionBrick = useMemo(
    () => ({
      amount: precio, // solo visual; el backend cobra lo suyo
      maxInstallments: config?.maxCuotas ?? producto?.maxCuotasDefault ?? 1,
      payer: prefillEmail ? { email: prefillEmail } : {},
    }),
    [precio, prefillEmail, config?.maxCuotas, producto?.maxCuotasDefault],
  );
  const onBrickError = useCallback(
    (e) => {
      console.error("CardPayment Brick error:", e);
      setEnProcesoBrick(false);
    },
    [setEnProcesoBrick],
  );
  const onBrickReady = useCallback(() => {
    setEnProcesoBrick(false);
  }, [setEnProcesoBrick]);

  if (!producto || !abierto || !contextoId) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 font-montserrat">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <h2 className="mt-2 text-lg font-bold text-gray-900">
          {producto.titulo}
        </h2>
        <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
          {producto.icono === "ubicacion" && (
            <MapPin size={15} className="text-rose-600" />
          )}
          Pago único de ${precio.toLocaleString("es-CO")} {moneda} para este
          anuncio
        </p>

        {/* ── Estados del flujo ── */}
        {approved && (
          <div className="mt-4 rounded-md border border-green-300 bg-green-50 p-3 text-sm text-green-800">
            {mensaje || msg.aprobado}
          </div>
        )}

        {pendiente && (
          <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
            {mensaje}
            <button
              onClick={() => consultarEstado()}
              className="ml-2 underline font-semibold hover:no-underline"
            >
              Consultar estado
            </button>
          </div>
        )}

        {sinConfirmar && (
          <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
            {mensaje}
            <button
              onClick={() => consultarEstado()}
              className="ml-2 underline font-semibold hover:no-underline"
            >
              Consultar estado
            </button>
          </div>
        )}

        {rechazado && (
          <div className="mt-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800">
            {mensaje}
          </div>
        )}

        {/* ── Aviso mientras el pago no esté confirmado ── */}
        {!approved && producto.avisoVisible && (
          <p className="mt-3 rounded-md bg-gray-50 p-2 text-xs text-gray-600">
            {producto.avisoVisible}
          </p>
        )}

        {/* ── Brick: solo si aún no está aprobado y hay config ── */}
        {mpOk && config?.habilitado && !approved && (
          <div className="mt-4">
            {mostrarBrick ? (
              <CardPayment
                key={reintento}
                initialization={inicializacionBrick}
                locale="es-CO"
                onSubmit={onBrickSubmit}
                onError={onBrickError}
                onReady={onBrickReady}
              />
            ) : (
              <button
                onClick={() => {
                  setReintentando(true);
                  setReintento((n) => n + 1);
                }}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
              >
                Reintentar pago
              </button>
            )}
          </div>
        )}

        {/* Config faltante: la casilla nunca rompe el asistente */}
        {config && (!mpOk || !config.habilitado) && (
          <div className="mt-4 rounded-md border border-gray-300 bg-gray-50 p-3 text-sm text-gray-700">
            {msg.noDisponible}
          </div>
        )}

        {/* ── Pie: avanzar sin bloquear ── */}
        {onClose && (
          <div className="mt-5 flex flex-col gap-2">
            <button
              onClick={onClose}
              disabled={enProcesoBrick}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {approved
                ? (producto.textoContinuar ?? "Continuar")
                : (producto.textoContinuarSinPagar ?? "Continuar")}
            </button>
            <p className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <ShieldCheck size={13} /> Pago con tarjeta, procesado por Mercado
              Pago. No guardamos datos de tarjeta.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

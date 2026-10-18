// src/components/pagos/PagoUbicacionOculta.jsx
// Componente ÚNICO de pago para wizard, edición y panel del usuario.
// Payment Brick de Mercado Pago (Colombia, es-CO) + estados del flujo.
// El monto mostrado es solo visual: el cobro real lo fija el backend.

import { useCallback, useEffect, useState } from "react";
import { X, MapPin, ShieldCheck } from "lucide-react";
import { Payment, initMercadoPago } from "@mercadopago/sdk-react";
import { MP_PUBLIC_KEY } from "@/config/config.js";
import usePagoUbicacionOculta from "@/hooks/usePagoUbicacionOculta";

let mpInicializado = false;
const iniciarMP = () => {
  if (MP_PUBLIC_KEY && !mpInicializado) {
    initMercadoPago(MP_PUBLIC_KEY, { locale: "es-CO" });
    mpInicializado = true;
  }
  return Boolean(MP_PUBLIC_KEY);
};

export default function PagoUbicacionOculta({
  abierto,
  propiedadId,
  onClose,
  prefillEmail = "",
}) {
  const [config, setConfig] = useState(null);
  const mpOk = Boolean(MP_PUBLIC_KEY);
  const {
    estado,
    mensaje,
    detallePago,
    enProcesoBrick,
    setEnProcesoBrick,
    cargarConfig,
    enviarPago,
    consultarEstado,
  } = usePagoUbicacionOculta(propiedadId);

  useEffect(() => {
    if (!abierto || !propiedadId) return;
    iniciarMP();
    let activo = true;
    cargarConfig().then((res) => {
      if (activo) setConfig(res);
    });
    return () => {
      activo = false;
    };
  }, [abierto, propiedadId, cargarConfig]);

  const approved = estado === "approved";
  const pendiente = estado === "pending";
  const rechazado = estado === "rejected" || estado === "error";

  const onBrickSubmit = useCallback(
    async (datosBrick) => {
      setEnProcesoBrick(true);
      return await enviarPago(datosBrick);
    },
    [enviarPago, setEnProcesoBrick],
  );

  if (!abierto || !propiedadId) return null;

  const precio = config?.precio ?? 22000;
  const moneda = config?.moneda ?? "COP";

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
          Ocultar la ubicación exacta
        </h2>
        <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={15} className="text-rose-600" />
          Pago único de ${precio.toLocaleString("es-CO")} {moneda} para este
          anuncio
        </p>

        {/* ── Estados del flujo ── */}
        {approved && (
          <div className="mt-4 rounded-md border border-green-300 bg-green-50 p-3 text-sm text-green-800">
            {mensaje || "Listo, la ubicación de tu anuncio quedó oculta."}
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

        {rechazado && (
          <div className="mt-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800">
            {mensaje}
          </div>
        )}

        {/* ── Aviso mientras el pago no esté confirmado ── */}
        {!approved && (
          <p className="mt-3 rounded-md bg-gray-50 p-2 text-xs text-gray-600">
            Mientras el pago no esté confirmado, la ubicación exacta seguirá
            visible para todos.
          </p>
        )}

        {/* ── Brick: solo si aún no está aprobado y hay config ── */}
        {mpOk && config?.habilitado && !approved && (
          <div className="mt-4">
            {pendiente || rechazado ? (
              <button
                onClick={() => consultarEstado()}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
              >
                Reintentar pago
              </button>
            ) : (
              <Payment
                initialization={{
                  amount: precio, // solo visual; el backend cobra lo suyo
                  payer: prefillEmail ? { email: prefillEmail } : {},
                }}
                customization={{
                  paymentMethods: {
                    maxInstallments: config?.maxCuotas ?? 1,
                  },
                }}
                locale="es-CO"
                onSubmit={onBrickSubmit}
                onError={(e) => {
                  console.error("Payment Brick error:", e);
                  setEnProcesoBrick(false);
                }}
                onReady={() => setEnProcesoBrick(false)}
              />
            )}
          </div>
        )}

        {/* Config faltante: la casilla nunca rompe el asistente */}
        {config && (!mpOk || !config.habilitado) && (
          <div className="mt-4 rounded-md border border-gray-300 bg-gray-50 p-3 text-sm text-gray-700">
            El pago en línea no está disponible en este momento. Puedes
            continuar con tu anuncio e intentarlo más tarde desde tu panel o al
            editar el anuncio.
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
                ? "Continuar"
                : "Continuar sin ocultar por ahora (avanzar al paso 3)"}
            </button>
            <p className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <ShieldCheck size={13} /> Pago procesado por Mercado Pago. No
              guardamos datos de tarjeta.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

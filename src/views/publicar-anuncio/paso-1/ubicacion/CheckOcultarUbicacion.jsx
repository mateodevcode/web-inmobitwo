// src/views/publicar-anuncio/paso-1/ubicacion/CheckOcultarUbicacion.jsx
// Casilla del paso 1: "Ocultar la ubicación exacta en el mapa (pago único)".
// - El precio viene de GET /pagos/config (nunca a mano).
// - Si hay pago habilitado pero sin NEXT_PUBLIC_MP_PUBLIC_KEY, la casilla se
//   deshabilita con aviso; si la API no responde, también.
// - Al desmarcarla vuelve al comportamiento normal.

import { useEffect, useState } from "react";
import { MapPin, ShieldCheck, EyeOff, CircleAlert } from "lucide-react";
import { apiBackend } from "@/actions/apiBackend";
import { MP_PUBLIC_KEY } from "@/config/config.js";
import { useAppContext } from "@/context/AppContext";

const CheckOcultarUbicacion = () => {
  const { formDataPropiedad, setFormDataPropiedad } = useAppContext();
  const [config, setConfig] = useState(null);

  useEffect(() => {
    let activo = true;
    apiBackend("/pagos/config")
      .then((res) => {
        if (activo) setConfig(res?.data ?? res ?? null);
      })
      .catch(() => {
        if (activo) setConfig({ habilitado: false });
      });
    return () => {
      activo = false;
    };
  }, []);

  const habilitado = Boolean(config?.habilitado && MP_PUBLIC_KEY);
  const marcado = Boolean(formDataPropiedad.ubicacion_oculta_solicitada);
  const precio = config?.precio ?? 22000;
  const moneda = config?.moneda ?? "COP";

  const toggle = () => {
    setFormDataPropiedad((prev) => ({
      ...prev,
      ubicacion_oculta_solicitada: !prev.ubicacion_oculta_solicitada,
    }));
  };

  return (
    <div className="mt-6 w-full rounded-md border border-gray-200 p-4 font-montserrat">
      <label
        className={`flex items-start gap-3 ${habilitado ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}
      >
        <input
          type="checkbox"
          checked={marcado}
          disabled={!habilitado}
          onChange={toggle}
          className="mt-1 h-4 w-4 accent-blue-600"
        />
        <span>
          <span className="flex items-center gap-1.5 font-semibold text-gray-900">
            <EyeOff size={15} />
            Ocultar la ubicación exacta en el mapa{" "}
            <span className="text-rose-600">
              (pago único de ${precio.toLocaleString("es-CO")} {moneda} por
              anuncio)
            </span>
          </span>
          <span className="mt-1 block text-xs text-gray-500">
            Tu anuncio se publicará y verán una zona aproximada (círculo en el
            mapa) en lugar de la dirección exacta.
          </span>
        </span>
      </label>

      {habilitado && marcado && (
        <div className="mt-3 space-y-3">
          <p className="rounded-md bg-amber-50 p-2 text-xs text-amber-800">
            <CircleAlert size={13} className="mr-1 inline" />
            Al completar el paso 2 se creará tu anuncio y te pediremos un pago
            único de ${precio.toLocaleString("es-CO")} {moneda}. Mientras el
            pago no esté confirmado, la ubicación exacta seguirá visible para
            todos.
          </p>

          {/* Vista previa de cómo lo verá el cliente final (modo aproximado) */}
          <PrevistaZonaAproximada precio={precio} moneda={moneda} />
        </div>
      )}

      {!habilitado && (
        <p className="mt-2 text-xs text-gray-500">
          El pago en línea no está disponible ahora mismo. Puedes activar esta
          opción más tarde desde tu panel o al editar el anuncio.
        </p>
      )}
    </div>
  );
};

// Vista previa: mapa con ZONA APROXIMADA (círculo), sin chincheta, centrado
// en un punto desplazado de PRUEBA (no en la casa real) tal como lo verá
// el comprador en la ficha.
function PrevistaZonaAproximada() {
  return (
    <div className="relative overflow-hidden rounded-md border border-gray-200">
      <div className="flex h-40 items-center justify-center bg-[#e8ecef]">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/25 border-2 border-blue-500">
            <MapPin size={22} className="text-blue-600" />
          </div>
          <p className="mt-2 text-xs font-semibold text-gray-700">
            Vista previa: zona aproximada (± 500 m)
          </p>
          <p className="text-[11px] text-gray-500">
            El comprador no verá la dirección exacta ni la chincheta
          </p>
        </div>
      </div>
      <p className="bg-white px-3 py-2 text-xs text-gray-600">
        «El vendedor no marcó la dirección exacta. Para más información,
        contacta al vendedor.»{" "}
        <ShieldCheck size={12} className="inline text-green-600" />
      </p>
    </div>
  );
}

export default CheckOcultarUbicacion;

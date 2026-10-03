import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { X } from "lucide-react";
import { apiBackend } from "@/actions/apiBackend.js";
import { useCatalogos } from "./useCatalogos";
import { armarPrecioInput, usePrecioSugerido } from "./usePrecioSugerido";
import { SugerenciaPrecio } from "./SugerenciaPrecio";

const SOPORTADAS = [
  { code: "venta", label: "Venta" },
  { code: "arriendo", label: "Arriendo" },
];

const inputCls =
  "border border-segundo/50 p-2.5 w-full text-segundo bg-white";

// Flujo "Cambiar de operación": reemplazar la principal o añadir segunda.
// El precio NUNCA se hereda: siempre se pide el de la operación destino.
export function CambiarOperacionModal({
  open,
  onClose,
  propiedad,
  onCambio,
}) {
  const { datos: catalogos } = useCatalogos(["alquiler"]);
  const [modo, setModo] = useState("reemplazar"); // reemplazar | añadir
  const [destino, setDestino] = useState("");
  const [precio, setPrecio] = useState("");
  const [rentalId, setRentalId] = useState("");
  const [parking, setParking] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const existentes =
    (propiedad?.ofertas || [])
      .map((o) => String(o.operation || "").toLowerCase())
      .filter(Boolean);
  const actuales =
    existentes.length > 0
      ? existentes
      : [String(propiedad?.operacion_slug || "").toLowerCase()].filter(Boolean);
  const desde = String(propiedad?.operacion_slug || actuales[0] || "");
  const opcionesDestino = SOPORTADAS.filter((o) => !actuales.includes(o.code));
  const esArriendo = destino === "arriendo";
  const alquileres = Array.isArray(catalogos.alquiler)
    ? catalogos.alquiler
    : [];

  const cerrar = () => {
    setModo("reemplazar");
    setDestino("");
    setPrecio("");
    setRentalId("");
    setParking("");
    setError(null);
    onClose();
  };

  const precioLimpio = String(precio ?? "").replace(/[^\d]/g, "");
  const puedeGuardar =
    !!destino && !!precioLimpio && Number(precioLimpio) > 0 && (!esArriendo || !!rentalId);
  // Sugerencia del algoritmo si el destino es venta (el algoritmo es de venta).
  const { sugerido, validacion, cargando } = usePrecioSugerido(
    armarPrecioInput(propiedad),
    { precioUsuario: precioLimpio, activo: open && destino === "venta" },
  );

  const guardar = async () => {
    if (!puedeGuardar) return;
    setLoading(true);
    setError(null);
    try {
      const datos = { precio: parseInt(precioLimpio, 10) };
      if (esArriendo) datos.rental_type_id = Number(rentalId);
      if (String(parking ?? "").trim() !== "") {
        datos.parking_space_price = parseInt(
          String(parking).replace(/[^\d]/g, "") || "0",
          10,
        );
      }
      let res;
      if (modo === "reemplazar") {
        res = await apiBackend(`/propiedades/${propiedad.id}/cambiar-operacion`, "POST", {
          desde,
          hacia: destino,
          datos,
        });
      } else {
        res = await apiBackend(
          `/propiedades/${propiedad.id}/ofertas/${destino}`,
          "PUT",
          datos,
        );
      }
      if (res?.success) {
        toast.success("Operación actualizada correctamente.", {
          position: "bottom-right",
        });
        cerrar();
        // Recarga completa: el cambio toca precio, título y ofertas y el
        // caché local del detalle quedaría rancio.
        setTimeout(() => window.location.reload(), 900);
      } else {
        const msg =
          (Array.isArray(res?.error) ? res.error[0] : res?.error) ||
          res?.message ||
          "No se pudo cambiar la operación.";
        setError(msg);
      }
    } catch (e) {
      setError("No se pudo cambiar la operación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={cerrar} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/80 transition-opacity data-closed:opacity-0 data-enter:duration-200 data-leave:duration-150" />
      <div className="fixed inset-0 flex h-dvh items-center justify-center font-poppins p-4">
        <DialogPanel
          transition
          className="w-full max-w-xl h-min max-h-[90dvh] overflow-y-auto rounded-lg bg-white p-6 shadow-xl transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-200 data-leave:duration-150"
        >
          <div className="mb-2 flex items-start justify-between gap-4">
            <DialogTitle className="text-xl font-semibold text-slate-900">
              Cambiar de operación
            </DialogTitle>
            <button
              type="button"
              onClick={cerrar}
              aria-label="Cerrar"
              className="shrink-0 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <p className="text-sm text-slate-600 mb-4">
            Operación actual:{" "}
            <span className="font-semibold">
              {actuales.join(" + ") || "—"}
            </span>
          </p>

          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm text-segundo/70">¿Qué quieres hacer?</span>
              <select
                value={modo}
                onChange={(e) => setModo(e.target.value)}
                className={inputCls}
              >
                <option value="reemplazar">
                  Reemplazar {desde || "la actual"} por otra (se archiva la anterior)
                </option>
                <option value="añadir" disabled={opcionesDestino.length === 0}>
                  Añadir segunda operación (quedar en ambas)
                </option>
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm text-segundo/70">
                {modo === "reemplazar" ? "Nueva operación" : "Operación a añadir"}
              </span>
              <select
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                className={inputCls}
              >
                <option value="">Selecciona…</option>
                {(modo === "reemplazar" ? SOPORTADAS : opcionesDestino).map(
                  (o) => (
                    <option key={o.code} value={o.code}>
                      {o.label}
                    </option>
                  ),
                )}
              </select>
            </label>

            {destino && (
              <>
                <label className="flex flex-col gap-1">
                  <span className="text-sm text-segundo/70">
                    Precio {esArriendo ? "mensual (COP)" : "de venta (COP)"} *
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    placeholder={esArriendo ? "Ej. 2.000.000" : "Ej. 500.000.000"}
                    className={inputCls}
                  />
                </label>

                {esArriendo && (
                  <label className="flex flex-col gap-1">
                    <span className="text-sm text-segundo/70">
                      Tipo de alquiler *
                    </span>
                    <select
                      value={rentalId}
                      onChange={(e) => setRentalId(e.target.value)}
                      className={inputCls}
                    >
                      <option value="">Selecciona…</option>
                      {alquileres.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label_es}
                        </option>
                      ))}
                    </select>
                  </label>
                )}

                <label className="flex flex-col gap-1">
                  <span className="text-sm text-segundo/70">
                    Precio parqueadero (opcional)
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={parking}
                    onChange={(e) => setParking(e.target.value)}
                    placeholder="Ej. 50.000.000"
                    className={inputCls}
                  />
                </label>

                <div className="bg-tercero/10 border border-tercero/30 rounded-md p-3 text-sm text-segundo">
                  {modo === "reemplazar" ? (
                    <>
                      La oferta de <strong>{desde}</strong> se archiva en el
                      historial y entra la de <strong>{destino}</strong> con el
                      precio que indiques (nunca se hereda). El título se
                      regenera solo y la descripción queda marcada para revisar.
                    </>
                  ) : (
                    <>
                      Se añade la oferta de <strong>{destino}</strong> sin tocar
                      la actual. El título pasará a “Venta y arriendo de…”.
                    </>
                  )}
                </div>

                {destino === "venta" && (
                  <SugerenciaPrecio
                    sugerido={sugerido}
                    validacion={validacion}
                    cargando={cargando}
                  />
                )}
              </>
            )}

            {error && <p className="text-sm text-red-700">{error}</p>}

            <div className="flex items-center justify-end gap-4 border-t border-slate-200 pt-3">
              <button
                type="button"
                onClick={cerrar}
                className="text-sm font-semibold text-slate-600 hover:underline cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={guardar}
                disabled={!puedeGuardar || loading}
                className="rounded-md bg-tercero px-6 py-3 text-sm font-semibold text-primero hover:bg-tercero/80 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Guardando…" : "Confirmar cambio"}
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

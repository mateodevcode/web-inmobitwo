// Modal de confirmación de ubicación. Reutiliza el patrón de Dialog de
// Headless UI v2 que ya usamos en "Nadie contacta a un anuncio sin fotos".

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { X } from "lucide-react";
import { useAddressMap } from "./useAddressMap";
import { MapWarnings } from "./MapWarnings";

export default function AddressMapModal({
  open,
  onClose,
  onConfirm,
  geocodeResult,
  fallbackPosition,
  initialPosition,
}) {
  const { mapContainerRef, position } = useAddressMap({
    open,
    initialPosition,
    geocodeResult,
    fallbackPosition,
  });

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/80 transition-opacity data-closed:opacity-0 data-enter:duration-200 data-leave:duration-150" />

      <div className="fixed inset-0 flex h-dvh items-center justify-center font-poppins">
        <DialogPanel
          transition
          className="w-full max-w-xl h-min rounded-lg bg-white p-6 shadow-xl transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-200 data-leave:duration-150"
        >
          <div className="mb-2 flex items-start justify-between gap-4">
            <DialogTitle className="text-xl font-semibold text-slate-900">
              Confirma la ubicacion
            </DialogTitle>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="shrink-0 text-slate-400 hover:text-slate-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <MapWarnings geocodeResult={geocodeResult} />

          <p className="mb-2 text-xs text-slate-700">
            Arrastra el pin si necesitas ajustar la ubicacion exacta.
          </p>

          <div className="mb-5 h-60 w-full overflow-hidden rounded-md border border-slate-200">
            <div ref={mapContainerRef} className="w-full h-full" />
          </div>

          <p className="mb-5 text-xs text-slate-500">
            Coordenadas actuales: {position.lat.toFixed(6)},{" "}
            {position.lng.toFixed(6)}
          </p>

          <div className="flex items-center justify-between md:justify-end gap-4 border-t border-slate-200 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-semibold text-slate-600 hover:underline"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() =>
                onConfirm({ lat: position.lat, lng: position.lng })
              }
              className="rounded-md bg-tercero px-6 py-3 text-sm font-semibold text-primero hover:bg-tercero/80"
            >
              Confirmar ubicacion
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

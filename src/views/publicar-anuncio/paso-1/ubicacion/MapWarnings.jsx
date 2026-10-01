import { AlertTriangle } from "lucide-react";

const LOW_CONFIDENCE_THRESHOLD = 0.4;

export function MapWarnings({ geocodeResult }) {
  const notFoundExact = !geocodeResult;
  const lowConfidence =
    geocodeResult?.importance != null &&
    geocodeResult.importance < LOW_CONFIDENCE_THRESHOLD;

  return (
    <>
      {notFoundExact && (
        <div className="mb-4 flex items-start gap-3 rounded-md bg-amber-50 px-4 py-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-xs text-slate-900">
            No pudimos localizar esa direccion exacta. Te mostramos el mapa
            centrado en la ciudad que elegiste — arrastra el pin hasta la
            ubicacion correcta.
          </p>
        </div>
      )}

      {!notFoundExact && lowConfidence && (
        <div className="mb-2 flex items-center gap-3 rounded-md bg-amber-50 p-4">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
          <p className="text-xs text-slate-900">
            Verifica que el pin este en el lugar correcto antes de confirmar.
          </p>
        </div>
      )}
    </>
  );
}

import { useState } from "react";
import { FormatoCard } from "./FormatoCard";
import { FormatoDetail } from "./FormatoDetail";

/**
 * Selector de formatos de descripción generados con IA
 * Muestra 3 opciones: moderno, narrativo, técnico
 * Con preview, edición y opciones de refinamiento
 */
export function FormatoSelector({
  formatos,
  onSeleccionar,
  onRegenerar,
  onRefinar,
  cargando = false,
  error = null,
}) {
  const [formatoSeleccionado, setFormatoSeleccionado] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState(false);
  const [tonePersonalizado, setTonePersonalizado] = useState("");

  if (!formatos || formatos.length === 0) {
    return null;
  }

  const formatoActual = formatos.find((f) => f.id === formatoSeleccionado);

  const handleUsarFormato = (formato) => {
    onSeleccionar(formato);
    setFormatoSeleccionado(null);
  };

  const handleRefinar = (formatoId, tone) => {
    if (onRefinar) {
      onRefinar(formatoId, tone);
      setTonePersonalizado("");
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!formatoSeleccionado && (
        <>
          <div className="grid gap-4">
            {formatos.map((formato) => (
              <FormatoCard
                key={formato.id}
                formato={formato}
                onSelect={(f) => {
                  setFormatoSeleccionado(f.id);
                  setVistaPrevia(true);
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={onRegenerar}
            disabled={cargando}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 disabled:opacity-50 transition"
          >
            {cargando ? "Regenerando..." : "🔄 Regenerar todas las opciones"}
          </button>
        </>
      )}

      {formatoSeleccionado && formatoActual && (
        <FormatoDetail
          formato={formatoActual}
          vistaPrevia={vistaPrevia}
          onToggleVistaPrevia={() => setVistaPrevia(!vistaPrevia)}
          tonePersonalizado={tonePersonalizado}
          onToneChange={setTonePersonalizado}
          onUsar={handleUsarFormato}
          onRefinar={handleRefinar}
          onAtras={() => setFormatoSeleccionado(null)}
          cargando={cargando}
        />
      )}
    </div>
  );
}

export default FormatoSelector;

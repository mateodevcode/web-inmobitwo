import DOMPurify from "dompurify";
import { FORMATO_ICONS, TONOS_REFINAR, stripHtml } from "./formatosMeta";

export function FormatoDetail({
  formato,
  vistaPrevia,
  onToggleVistaPrevia,
  tonePersonalizado,
  onToneChange,
  onUsar,
  onRefinar,
  onAtras,
  cargando,
}) {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{FORMATO_ICONS[formato.id]}</span>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">
              {formato.nombre}
            </h3>
            <p className="text-xs text-slate-600">{formato.caracteristicas}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 mb-6">
        {vistaPrevia ? (
          <div
            className="prose prose-sm max-w-none text-sm text-slate-700"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(formato.descripcion),
            }}
          />
        ) : (
          <p className="text-sm text-slate-700 whitespace-pre-line">
            {stripHtml(formato.descripcion)}
          </p>
        )}
      </div>

      <div className="space-y-3 mb-6">
        <label className="block text-sm font-medium text-slate-900">
          Refinar tono (opcional):
        </label>
        <div className="flex gap-2 flex-wrap">
          {TONOS_REFINAR.map((tone) => (
            <button
              key={tone}
              type="button"
              onClick={() =>
                onToneChange(tonePersonalizado === tone ? "" : tone)
              }
              className={`px-3 py-1 rounded text-xs font-medium transition ${
                tonePersonalizado === tone
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 border border-slate-300 hover:border-blue-400"
              }`}
            >
              {tone}
            </button>
          ))}
        </div>
        {tonePersonalizado && (
          <input
            type="text"
            value={tonePersonalizado}
            onChange={(e) => onToneChange(e.target.value)}
            placeholder="O escribe tu propio refinamiento..."
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onUsar(formato)}
          className="flex-1 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          ✅ Usar este formato
        </button>

        {tonePersonalizado && onRefinar && (
          <button
            type="button"
            onClick={() => onRefinar(formato.id, tonePersonalizado)}
            disabled={cargando}
            className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {cargando ? "Refinando..." : "✨ Refinar"}
          </button>
        )}

        <button
          type="button"
          onClick={onAtras}
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
        >
          ← Atrás
        </button>
      </div>

      <button
        type="button"
        onClick={onToggleVistaPrevia}
        className="mt-4 w-full text-xs text-slate-600 hover:text-slate-900"
      >
        {vistaPrevia ? "Ver texto plano" : "Ver vista previa formateada"}
      </button>
    </div>
  );
}

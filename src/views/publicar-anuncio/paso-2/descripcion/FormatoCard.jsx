import { FORMATO_ICONS, stripHtml } from "./formatosMeta";

export function FormatoCard({ formato, onSelect }) {
  return (
    <div
      className="rounded-lg border border-slate-200 p-4 hover:border-blue-400 hover:bg-blue-50/30 transition cursor-pointer"
      onClick={() => onSelect(formato)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900">{formato.nombre}</h3>
          <p className="text-xs text-slate-500 mt-1">
            {formato.caracteristicas}
          </p>
        </div>
        <div className="text-lg">{FORMATO_ICONS[formato.id]}</div>
      </div>

      <p className="text-sm text-slate-700 line-clamp-3 mt-3">
        {stripHtml(formato.descripcion)}
      </p>

      <button
        type="button"
        className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
      >
        Ver más →
      </button>
    </div>
  );
}

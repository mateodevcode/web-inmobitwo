import { LuRefreshCw, LuPause, LuPlay } from "react-icons/lu";

export function LogsHeader({ autoRefresh, onToggleRefresh, onRefresh }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-2xl font-bold">Logs de trazabilidad</h1>
        <p className="text-black/60 text-sm">
          Actividad en vivo del sistema de tracking y leads.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleRefresh}
          className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border border-black/20 hover:bg-black/5 transition"
        >
          {autoRefresh ? <LuPause size={14} /> : <LuPlay size={14} />}
          {autoRefresh ? "Pausar" : "Reanudar"}
        </button>
        <button
          onClick={onRefresh}
          className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-black text-white hover:bg-black/80 transition"
        >
          <LuRefreshCw size={14} /> Actualizar
        </button>
      </div>
    </div>
  );
}

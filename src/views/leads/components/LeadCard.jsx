import { LuPhone, LuMail, LuClock } from "react-icons/lu";
import { ESTADOS, getEstadoInfo } from "../lib/estados";

const formatFecha = (fecha) =>
  new Date(fecha).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

export function LeadCard({ lead, onEstadoChange }) {
  const estadoInfo = getEstadoInfo(lead.estado);

  return (
    <div className="border border-black/10 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-black">
            {lead.nombre || "Visitante anónimo"}
          </p>
          <p className="text-sm text-black/60">
            Interesado en:{" "}
            <span className="font-medium">{lead.propiedad_titulo}</span>
          </p>
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${estadoInfo.color}`}
        >
          {estadoInfo.label}
        </span>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-black/70">
        {lead.email && (
          <a
            href={`mailto:${lead.email}`}
            className="flex items-center gap-1.5 hover:underline"
          >
            <LuMail className="text-black/40" /> {lead.email}
          </a>
        )}
        {lead.telefono && (
          <a
            href={`tel:${lead.telefono}`}
            className="flex items-center gap-1.5 hover:underline"
          >
            <LuPhone className="text-black/40" /> {lead.telefono}
          </a>
        )}
        <span className="flex items-center gap-1.5">
          <LuClock className="text-black/40" />
          {formatFecha(lead.created_at)}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 mt-1">
        <span className="text-xs text-black/40">
          Puntuación de interés: {lead.score} ·{" "}
          {lead.origen === "formulario_directo"
            ? "Formulario directo"
            : "Comportamiento en el sitio"}
        </span>

        <select
          value={lead.estado}
          onChange={(e) => onEstadoChange(lead.id, e.target.value)}
          className="text-sm border border-black/20 rounded-lg px-2 py-1 cursor-pointer"
        >
          {ESTADOS.map((e) => (
            <option key={e.valor} value={e.valor}>
              {e.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

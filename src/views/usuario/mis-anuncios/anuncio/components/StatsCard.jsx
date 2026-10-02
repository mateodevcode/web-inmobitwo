import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { DetalleCard } from "./DetalleCard";

const formatoFecha = (iso) => {
  if (!iso) return null;
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) return null;
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(fecha);
};

export function StatsCard({ propiedad, leads = [] }) {
  const mensajes = leads.filter((l) => l?.propiedad_id === propiedad?.id);
  const ultimaPublicacion = formatoFecha(
    propiedad?.updated_at ?? propiedad?.created_at,
  );
  // Vistas y favoritos aún no tienen endpoint agregado (Fase 4):
  // no se muestran números inventados.

  return (
    <DetalleCard title="Estadísticas">
      <p className="text-lg text-segundo mt-4">
        {ultimaPublicacion
          ? `Publicado por última vez el ${ultimaPublicacion}.`
          : "Aún sin fecha de publicación."}
      </p>
      <div className="flex items-center gap-4 md:gap-8 mt-4 flex-wrap">
        <div className="text-segundo flex items-center gap-4 text-base">
          <MdOutlineMarkUnreadChatAlt />
          <p className="text-base">Mensajes</p>
          <p className="font-semibold text-base">{mensajes.length}</p>
        </div>
      </div>
    </DetalleCard>
  );
}

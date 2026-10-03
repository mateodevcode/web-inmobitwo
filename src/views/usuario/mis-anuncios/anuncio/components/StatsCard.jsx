import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { DetalleCard } from "./DetalleCard";
import { apiBackend } from "@/actions/apiBackend.js";

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

export function StatsCard({ propiedad }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!propiedad?.id) return;
    let vivo = true;
    (async () => {
      const res = await apiBackend(`/propiedades/${propiedad.id}/stats`);
      if (vivo && res?.success) setStats(res.data);
    })();
    return () => {
      vivo = false;
    };
  }, [propiedad?.id]);

  const ultimaPublicacion = formatoFecha(
    propiedad?.updated_at ?? propiedad?.created_at,
  );
  const items = [
    { Icon: IoEyeOutline, label: "Vistas", value: stats?.vistas },
    { Icon: FaRegHeart, label: "Favoritos", value: stats?.favoritos },
    {
      Icon: MdOutlineMarkUnreadChatAlt,
      label: "Mensajes",
      value: stats?.mensajes,
    },
  ];

  return (
    <DetalleCard title="Estadísticas">
      <p className="text-lg text-segundo mt-4">
        {ultimaPublicacion
          ? `Publicado por última vez el ${ultimaPublicacion}.`
          : "Aún sin fecha de publicación."}
      </p>
      <div className="flex items-center gap-4 md:gap-8 mt-4 flex-wrap">
        {items.map(({ Icon, label, value }) => (
          <div
            key={label}
            className="text-segundo flex items-center gap-4 text-base"
          >
            <Icon />
            <p className="text-base">{label}</p>
            <p className="font-semibold text-base">{value ?? "—"}</p>
          </div>
        ))}
      </div>
    </DetalleCard>
  );
}

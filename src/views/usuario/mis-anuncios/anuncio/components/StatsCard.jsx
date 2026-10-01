import { IoEyeOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { DetalleCard } from "./DetalleCard";

const STATS = [
  { id: "vistas", Icon: IoEyeOutline, label: "Vistas", value: 2 },
  { id: "favoritos", Icon: FaRegHeart, label: "Vistas", value: 0 },
  { id: "mensajes", Icon: MdOutlineMarkUnreadChatAlt, label: "Vistas", value: 0 },
];

export function StatsCard() {
  return (
    <DetalleCard title="Estadísticas">
      <p className="text-lg text-black mt-4">
        Publicado por última vez el 20/06/2026.
      </p>
      <div className="flex items-center gap-4 md:gap-8 mt-4 flex-wrap">
        {STATS.map(({ id, Icon, label, value }) => (
          <div key={id} className="text-black flex items-center gap-4 text-xl">
            <Icon />
            <p>{label}</p>
            <p className="font-bold">{value}</p>
          </div>
        ))}
      </div>
    </DetalleCard>
  );
}

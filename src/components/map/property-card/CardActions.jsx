import { PiChats } from "react-icons/pi";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi2";
import { TiHeartFullOutline, TiHeartOutline } from "react-icons/ti";
import { useRouter } from "next/navigation";

export function CardActions({ inmueble, isFavorited, onFavorito }) {
  const router = useRouter();

  const goDetalle = (e) => {
    e.stopPropagation();
    if (inmueble?.id) router.push(`/inmueble/${inmueble.id}`);
  };

  return (
    <div className="flex items-center justify-between w-full mt-3 pt-2 border-t border-gray-100">
      <div
        className="flex items-center gap-1.5 text-blue-600 cursor-pointer select-none"
        onClick={goDetalle}
      >
        <PiChats className="text-base" />
        <p className="text-xs font-semibold hover:underline">Contactar</p>
      </div>
      <div
        className="flex items-center gap-1.5 text-blue-600 cursor-pointer select-none"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <BsTelephone className="text-sm" />
        <p className="text-xs font-semibold hover:underline">
          Ver teléfono
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div
          className="cursor-pointer select-none"
          title="Eliminar"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <HiOutlineTrash className="text-base text-blue-600" />
        </div>
        <div
          className="cursor-pointer select-none"
          onClick={(e) => onFavorito(e, inmueble?.id)}
        >
          {isFavorited ? (
            <TiHeartFullOutline className="text-base text-tercero" />
          ) : (
            <TiHeartOutline className="text-base text-blue-600" />
          )}
        </div>
      </div>
    </div>
  );
}

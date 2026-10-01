import { MdOutlinePhotoCamera } from "react-icons/md";
import { DetalleCard } from "./DetalleCard";
import { CardActionLink } from "./CardActionLink";

export function FotosCard() {
  return (
    <DetalleCard
      title="Fotos y vídeos"
      action={
        <CardActionLink Icon={MdOutlinePhotoCamera} className="mt-4">
          Añadir tus fotos para recibir más contactos
        </CardActionLink>
      }
    >
      <div className="bg-rose-100 p-6 mt-4">
        <p className="text-rose-800 font-bold text-xl">
          Tu anuncio no tiene fotos
        </p>
        <p className="text-lg mt-2 text-black">
          Tu anuncio recibirá un 90% menos de contactos que los que tienen
          fotos.
        </p>
      </div>
    </DetalleCard>
  );
}

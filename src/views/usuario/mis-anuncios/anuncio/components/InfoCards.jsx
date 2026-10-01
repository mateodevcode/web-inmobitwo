import { MdOutlineModeEdit } from "react-icons/md";
import { DetalleCard } from "./DetalleCard";
import { CardActionLink } from "./CardActionLink";

export function DireccionCard() {
  return (
    <DetalleCard title="Dirección">
      <p className="text-lg text-black mt-4">
        Alquiler residencial de piso en calle vaqueiros de alzada, 34,2ª
        planta, Puerta A, Tineo
      </p>
    </DetalleCard>
  );
}

export function DescripcionCard() {
  return (
    <DetalleCard
      title="Descripción"
      action={
        <CardActionLink Icon={MdOutlineModeEdit} className="mt-4">
          Editar descripción o cambiar idioma
        </CardActionLink>
      }
    >
      <p className="text-lg text-black mt-4">
        Todavía no has escrito un comentario
      </p>
    </DetalleCard>
  );
}

export function ServiciosCard() {
  return (
    <DetalleCard title="Servicios aplicados a este anuncio">
      <p className="text-lg text-black mt-4">
        Actualmente no tienes productos contratados.
      </p>
    </DetalleCard>
  );
}

import { MdOutlineModeEdit } from "react-icons/md";
import { formatPrecioCompleto } from "@/utils/formatPrecio";
import { DetalleCard } from "./DetalleCard";
import { CardActionLink } from "./CardActionLink";

const Stat = ({ children }) => (
  <>
    <div className="w-0.5 h-6 bg-black/40" />
    <p className="text-black">{children}</p>
  </>
);

export function PrecioCard({ propiedad }) {
  return (
    <DetalleCard
      title="Precio y características"
      action={
        <CardActionLink Icon={MdOutlineModeEdit} className="mt-4">
          Modificar precio y datos
        </CardActionLink>
      }
    >
      <div className="flex items-center gap-4 mt-4 flex-wrap">
        <p className="text-black font-bold">
          {formatPrecioCompleto(propiedad.precio)}
          {propiedad.operacion_slug === "arriendo" ? "/mes" : ""}
        </p>
        {propiedad.constructed_area != null && (
          <Stat>{propiedad.constructed_area} m² </Stat>
        )}
        {propiedad.bedroom_count != null && (
          <Stat>{propiedad.bedroom_count} alc. </Stat>
        )}
        {propiedad.bathroom_count != null && (
          <Stat>{propiedad.bathroom_count} baño(s) </Stat>
        )}
        {propiedad.zona && <Stat>{propiedad.zona}</Stat>}
      </div>
    </DetalleCard>
  );
}

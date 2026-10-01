import { useRouter } from "next/navigation";
import { irArriba } from "@/utils/irArriba";

export function FavoritoInfo({ propiedad }) {
  const router = useRouter();

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <div className="flex flex-col p-4 text-sm">
        <p>
          {(propiedad.private_area ?? propiedad.constructed_area) != null &&
            `${propiedad.private_area ?? propiedad.constructed_area} m² `}
          {propiedad.bedroom_count != null &&
            `${propiedad.bedroom_count} hab. `}
          {propiedad.bathroom_count != null &&
            `${propiedad.bathroom_count} baños`}
        </p>
        <p>{propiedad.titulo}</p>
        <p>{propiedad.direccion}</p>
        <p>
          {propiedad.city_name ?? ""} (Cod. {propiedad.id})
        </p>
      </div>

      <div className="flex flex-col items-center p-2 my-2">
        <button
          className="text-base md:text-lg font-semibold text-blue-700 hover:underline cursor-pointer select-none active:scale-95 duration-75 transition"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/inmueble/${propiedad.id}`);
            irArriba();
          }}
        >
          Ver propiedad
        </button>
      </div>
    </div>
  );
}

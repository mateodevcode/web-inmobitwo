import { useRouter } from "next/navigation";
import { irArriba } from "@/utils/irArriba";

export function AnuncioInfo({ propiedad }) {
  const router = useRouter();

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <div className="flex flex-col p-4 text-sm">
        <p className="font-semibold">{propiedad.titulo}</p>
        <p>
          {(propiedad.private_area ?? propiedad.constructed_area) != null &&
            `${propiedad.private_area ?? propiedad.constructed_area} m² `}
          {propiedad.bedroom_count != null && `${propiedad.bedroom_count} hab. `}
          {propiedad.bathroom_count != null &&
            `${propiedad.bathroom_count} baños`}
        </p>
        <p>
          {propiedad.city_name ?? ""} (Cod. {propiedad.id})
        </p>
      </div>

      <div className="flex flex-col items-center p-2 my-2">
        <button
          className="text-base font-semibold text-blue-700 hover:underline cursor-pointer select-none active:scale-95 duration-75 transition"
          onClick={() => {
            router.push(`/usuario/mis-anuncios/anuncio/${propiedad.id}`);
            irArriba();
          }}
        >
          Gestionar tu anuncio
        </button>
        <p className="text-sm">Modificar</p>
      </div>
    </div>
  );
}

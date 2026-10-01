import { useRouter } from "next/navigation";
import { irArriba } from "@/utils/irArriba";

export function AnuncioPhoto({ propiedad }) {
  const router = useRouter();

  if (propiedad.imagen_principal_url !== null) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-rose-50">
        <img
          src={propiedad.imagen_principal_url}
          alt={propiedad.titulo}
          className="object-cover object-center w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className="bg-rose-50 w-full h-full p-4 flex flex-col items-center">
      <p className="text-red-800 font-semibold text-xl">
        Tu anuncio no tiene fotos
      </p>
      <p className="mt-2 font-semibold text-center">
        Tu anuncio recibirá un 90% menos de contactos que los que tienen fotos.
      </p>
      <button
        className="text-xl text-blue-500 font-semibold hover:underline text-center mt-6 cursor-pointer select-none"
        onClick={() => {
          router.push(`/info/publicar-anuncio/publicar?id=${propiedad.id}`);
          irArriba();
        }}
      >
        Añadir tus fotos para recibir más contactos
      </button>
    </div>
  );
}

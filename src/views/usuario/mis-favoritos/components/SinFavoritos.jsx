import { TiHeartOutline } from "react-icons/ti";
import { useRouter } from "next/navigation";

const SinFavoritos = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="text-7xl mb-6 text-segundo/50">
        <TiHeartOutline />
      </div>

      <h2 className="text-2xl font-bold text-segundo mb-3">
        Aún no tienes favoritos
      </h2>
      <p className="text-segundo/50 max-w-md">
        Cuando veas una propiedad que te guste, guarda en favoritos para
        revisarla más tarde.
      </p>

      <button
        onClick={() => router.push("/")}
        className="mt-8 bg-segundo text-primero px-8 py-3 rounded-md font-semibold hover:bg-segundo/80 transition active:scale-95 cursor-pointer select-none font-montserrat"
      >
        Explorar propiedades
      </button>
    </div>
  );
};

export default SinFavoritos;

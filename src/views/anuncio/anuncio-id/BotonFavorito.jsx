import { TiHeartFullOutline, TiHeartOutline } from "react-icons/ti";
import useFavoritos from "@/hooks/useFavoritos";
import { useFavoritosStore } from "@/hooks/favoritosStore";
import { useParams } from "next/navigation";

const BotonFavorito = ({ id: idProp }) => {
  const { id: idParam } = useParams();
  const id = idProp ?? idParam;
  const favoritos = useFavoritosStore();
  const { handleFavorito, estaEnFavoritos } = useFavoritos();
  const isFavorited = estaEnFavoritos(favoritos, id);

  // Mismo diseño que el botón "Contactar" del header del visor, invertido:
  // guardado = fondo tercero + texto blanco, sin guardar = fondo blanco +
  // texto tercero (colores opuestos).
  return (
    <button
      type="button"
      onClick={(e) => handleFavorito(e, id)}
      className={`flex items-center justify-center gap-2 border-2 rounded-sm px-5 py-2 font-semibold text-sm cursor-pointer select-none active:scale-95 transition w-min ${
        isFavorited
          ? "bg-tercero/10 text-tercero hover:bg-tercero/20 border-tercero"
          : "bg-white text-segundo/60 hover:bg-segundo/10 border-segundo/60"
      }`}
    >
      {isFavorited ? (
        <TiHeartFullOutline className="text-base" />
      ) : (
        <TiHeartOutline className="text-base" />
      )}
      <span>{isFavorited ? "Favorito" : "Guardar"}</span>
    </button>
  );
};

export default BotonFavorito;

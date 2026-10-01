import { useRouter } from "next/navigation";
import { useFavoritosStore } from "@/hooks/favoritosStore";
import useFavoritos from "@/hooks/useFavoritos";
import { CardGallery } from "./CardGallery";
import { CardBody } from "./CardBody";
import { CardActions } from "./CardActions";
import { useGallery } from "./useGallery";
import {
  getTitulo,
  getUbicacion,
  getTipoLabel,
  getOperacionLabel,
} from "./cardLabels";

export function PropertyCard({ inmueble, onClose }) {
  const router = useRouter();
  const favoritos = useFavoritosStore();
  const { estaEnFavoritos, handleFavorito } = useFavoritos();
  const { fotos, totalImagenes, currentIndex, goTo, hasPlanos } =
    useGallery(inmueble);

  if (!inmueble) return null;

  const titulo = getTitulo(inmueble);
  const ubicacion = getUbicacion(inmueble);
  const tipoLabel = getTipoLabel(inmueble);
  const operacionLabel = getOperacionLabel(inmueble);
  const isFavorited = estaEnFavoritos(favoritos, inmueble?.id);
  const navState = inmueble?.operacion ? { operacion: inmueble.operacion } : {};

  const handleGoToDetalle = () => {
    if (inmueble?.id) router.push(`/inmueble/${inmueble.id}`);
  };

  return (
    <div
      className="absolute top-30 right-2 md:top-16 md:right-4 z-1000 w-80 bg-white shadow-xl overflow-hidden cursor-pointer"
      onClick={handleGoToDetalle}
    >
      <CardGallery
        inmueble={inmueble}
        titulo={titulo}
        fotos={fotos}
        totalImagenes={totalImagenes}
        currentIndex={currentIndex}
        goTo={goTo}
        hasPlanos={hasPlanos}
        navState={navState}
        onClose={onClose}
      />

      <div className="p-3 h-44 flex flex-col justify-between">
        <CardBody
          inmueble={inmueble}
          titulo={titulo}
          ubicacion={ubicacion}
          tipoLabel={tipoLabel}
          operacionLabel={operacionLabel}
        />
        <CardActions
          inmueble={inmueble}
          isFavorited={isFavorited}
          onFavorito={handleFavorito}
        />
      </div>
    </div>
  );
}

import useFavoritos from "@/hooks/useFavoritos";
import { useState } from "react";
import { FavoritoPhoto } from "./FavoritoPhoto";
import { FavoritoStatus } from "./FavoritoStatus";
import { FavoritoInfo } from "./FavoritoInfo";

const ListaFavoritos = ({ propiedades }) => {
  const { toggleFavorito } = useFavoritos();
  const [removingId, setRemovingId] = useState(null);

  const handleQuitarFavorito = async (e, id) => {
    e.stopPropagation();
    setRemovingId(id);

    const res = await toggleFavorito(id);

    if (res.success) {
      // La card se actualizará automáticamente gracias al estado en el hook
    }
    setRemovingId(null);
  };

  return (
    <div className="flex flex-col font-montserrat gap-2 mx-auto p-8">
      {propiedades?.map((pro) => (
        <div
          className="w-full md:w-180 bg-white md:h-96 text-black flex md:flex-row flex-col items-center gap-0 shadow shadow-black/20"
          key={pro.id}
        >
          <div className="bg-white w-full md:w-1/2 h-full p-1">
            <FavoritoPhoto propiedad={pro} />
          </div>
          <div className="flex flex-col gap-1 w-full md:w-1/2 h-full">
            <FavoritoStatus
              estado={pro.estado}
              removing={removingId === pro.id}
              onRemove={(e) => handleQuitarFavorito(e, pro.id)}
            />
            <FavoritoInfo propiedad={pro} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaFavoritos;

import usePropiedades from "@/hooks/usePropiedades";
import { useState } from "react";
import { AnuncioPhoto } from "./AnuncioPhoto";
import { AnuncioStatus } from "./AnuncioStatus";
import { AnuncioInfo } from "./AnuncioInfo";

const ListaAnuncios = ({ propiedades }) => {
  const [togglingId, setTogglingId] = useState(null);
  const { actualizarPropiedad } = usePropiedades();

  const handleToggle = async (e, pro) => {
    if (togglingId) return; // anti doble-clic: dos toggles = vuelve al inicio
    setTogglingId(pro.id);
    try {
      await actualizarPropiedad(e, pro.id, () => {}, {
        estado: pro.estado === "publicado" ? "no_publicado" : "publicado",
      });
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="flex flex-col font-montserrat gap-2 mx-auto md:p-8 p-4">
      {propiedades?.map((pro) => (
        <div
          className="w-full md:w-180 bg-white md:h-96 text-black flex md:flex-row flex-col items-center gap-0 shadow shadow-black/20"
          key={pro.id}
        >
          <div className="bg-white w-full md:w-1/2 h-full p-1">
            <AnuncioPhoto propiedad={pro} />
          </div>
          <div className="flex flex-col gap-1 w-full md:w-1/2 h-full">
            <AnuncioStatus
              estado={pro.estado}
              onToggle={(e) => handleToggle(e, pro)}
              desactivado={togglingId === pro.id}
            />
            <AnuncioInfo propiedad={pro} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaAnuncios;

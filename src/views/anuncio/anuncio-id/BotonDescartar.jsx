"use client";

import { useParams } from "next/navigation";
import { IoMdCloseCircle, IoMdUndo } from "react-icons/io";
import useDescartados from "@/hooks/useDescartados";
import { useDescartadosStore } from "@/hooks/descartadosStore";

/**
 * Botón "Descartar", reutilizado en CardPrincipal (texto oculto en
 * md hacia abajo) y HeaderDinamico (texto oculto en sm hacia abajo).
 * Si el anuncio ya está descartado muestra "Restaurar".
 */
const BotonDescartar = ({ id: idProp, compact = false }) => {
  const { id: idParam } = useParams();
  const id = idProp ?? idParam;
  const descartados = useDescartadosStore();
  const { handleDescartar, handleRestaurar, estaDescartado } =
    useDescartados();
  const descartado = estaDescartado(descartados, id);
  const Icono = descartado ? IoMdUndo : IoMdCloseCircle;

  return (
    <button
      type="button"
      onClick={(e) =>
        descartado ? handleRestaurar(e, id) : handleDescartar(e, id)
      }
      className={`flex items-center font-semibold text-decimo hover:underline font-montserrat cursor-pointer select-none ${compact ? "gap-1.5 text-base" : "gap-2 text-lg"}`}
    >
      <Icono className={compact ? "text-lg" : "text-xl"} />
      <span className={compact ? "hidden sm:inline" : "hidden md:flex"}>
        {descartado ? "Restaurar" : "Descartar"}
      </span>
    </button>
  );
};

export default BotonDescartar;

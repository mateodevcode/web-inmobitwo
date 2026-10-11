"use client";

import { IoArrowRedoOutline, IoClose } from "react-icons/io5";
import { formatPrecioCompleto } from "@/utils/formatPrecio";
import BotonFavorito from "../../../anuncio-id/BotonFavorito";

const VisorHeader = ({ inmueble, specsLinea, onCerrar, onContactar }) => {
  return (
    <div className="w-full mx-auto border-b border-gray-200 flex items-center justify-center relative font-poppins">
      <div className="flex items-center justify-between px-4 py-3 w-full md:w-8/12">
        <div className="min-w-0">
          <h1 className="font-semibold text-segundo truncate">
            {inmueble.titulo}
          </h1>
          <p className="text-sm text-segundo/70 font-semibold flex items-center gap-2 flex-wrap">
            <span>{formatPrecioCompleto(inmueble.precio)}</span>
            {specsLinea.map((spec) => (
              <span key={spec} className="flex items-center gap-2">
                <span className="w-px h-3 bg-gray-300" />
                {spec}
              </span>
            ))}
          </p>
        </div>

        <div className="flex items-center gap-6 shrink-0 ml-4">
          <button
            type="button"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline"
          >
            <IoArrowRedoOutline className="text-lg" />
            Compartir
          </button>
          <div className="hidden sm:flex">
            <BotonFavorito id={inmueble.id} />
          </div>
          <button
            className="bg-tercero text-primero text-sm font-semibold rounded-sm px-5 py-2 hover:bg-tercero/80 transition-colors border-2 border-segundo/50 cursor-pointer select-none"
            type="button"
            onClick={onContactar}
          >
            Contactar
          </button>
          <button
            type="button"
            onClick={onCerrar}
            className="text-segundo/80 hover:text-segundo absolute right-10 hidden md:flex cursor-pointer select-none"
            title="Cerrar"
          >
            <IoClose className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisorHeader;

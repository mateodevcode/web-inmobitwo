"use client";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { BsArrowsAngleContract } from "react-icons/bs";

const FlechaCarrusel = ({ direccion, onNavegar }) => {
  const esAnterior = direccion < 0;
  const Icono = esAnterior
    ? MdOutlineKeyboardArrowLeft
    : MdOutlineKeyboardArrowRight;
  return (
    <button
      type="button"
      onClick={() => onNavegar(direccion)}
      className={`absolute top-1/2 -translate-y-1/2 w-20 h-20 cursor-pointer select-none rounded-full bg-primero/90 hover:bg-primero transition duration-300 flex items-center justify-center text-xl shadow-lg border border-segundo/20 z-10 ${
        esAnterior ? "left-4" : "right-4"
      }`}
      title={esAnterior ? "Anterior" : "Siguiente"}
    >
      <Icono className="text-4xl text-segundo" />
    </button>
  );
};

export const BotonSalirFullscreen = ({ onSalir, className }) => {
  return (
    <button
      type="button"
      onClick={onSalir}
      className={
        className ??
        "absolute bottom-4 right-4 z-2200 bg-primero/20 hover:bg-primero/40 backdrop-blur-sm text-primero rounded-lg p-3 transition-colors duration-200 cursor-pointer"
      }
      title="Salir de pantalla completa"
    >
      <BsArrowsAngleContract className="text-2xl" />
    </button>
  );
};

const FlechasSecuencia = ({ visible, onNavegar }) => {
  if (!visible) return null;
  return (
    <>
      <FlechaCarrusel direccion={-1} onNavegar={onNavegar} />
      <FlechaCarrusel direccion={1} onNavegar={onNavegar} />
    </>
  );
};

export default FlechasSecuencia;

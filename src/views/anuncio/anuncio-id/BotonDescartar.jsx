import { IoMdCloseCircle } from "react-icons/io";

/**
 * Botón "Descartar", reutilizado en CardPrincipal (texto oculto en
 * md hacia abajo) y HeaderDinamico (texto oculto en sm hacia abajo).
 */
const BotonDescartar = ({ compact = false, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center font-semibold text-decimo hover:underline font-montserrat cursor-pointer select-none ${
      compact ? "gap-1.5 text-base" : "gap-2 text-lg"
    }`}
  >
    <IoMdCloseCircle className={compact ? "text-lg" : "text-xl"} />
    <span className={compact ? "hidden sm:inline" : "hidden md:flex"}>
      Descartar
    </span>
  </button>
);

export default BotonDescartar;

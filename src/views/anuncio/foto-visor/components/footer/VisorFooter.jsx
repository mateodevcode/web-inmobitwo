"use client";

import { BsArrowsAngleExpand } from "react-icons/bs";
import { ImImage } from "react-icons/im";
import { FaArchway, FaMapMarkerAlt } from "react-icons/fa";
import { Md3dRotation } from "react-icons/md";
import {
  MODO_3D,
  MODO_FOTOS,
  MODO_MAPA,
  MODO_PLANOS,
} from "../../constants";
import { getBtnClass } from "../../lib/formato";

const VisorFooter = ({
  counterText,
  modo,
  totalImagenes,
  totalPlanos,
  tiene3d,
  tieneMapa,
  onIrAModo,
  onAmpliar,
}) => {
  return (
    <div className="flex items-center justify-center border-t border-gray-200 mx-auto w-full">
      <div className="flex items-center md:flex-row flex-col justify-between md:px-6 px-0 py-3 w-full md:w-8/12 gap-4">
        <div className="md:w-30">
          <p className="text-xs text-gray-500">{counterText}</p>
        </div>

        <div className="gap-0.5 md:gap-0 items-center flex-wrap grid grid-cols-3 md:grid-cols-4">
          {totalImagenes > 0 && (
            <button
              type="button"
              onClick={() => onIrAModo(MODO_FOTOS)}
              className={getBtnClass(modo, MODO_FOTOS)}
            >
              <ImImage className="text-base" />
              {totalImagenes} fotos
            </button>
          )}
          {totalPlanos > 0 && (
            <button
              type="button"
              onClick={() => onIrAModo(MODO_PLANOS)}
              className={getBtnClass(modo, MODO_PLANOS)}
            >
              <FaArchway className="text-sm" />
              {totalPlanos} planos
            </button>
          )}
          {tiene3d && (
            <button
              type="button"
              onClick={() => onIrAModo(MODO_3D)}
              className={getBtnClass(modo, MODO_3D)}
            >
              <Md3dRotation className="text-base" />
              Visita 3D
            </button>
          )}
          {tieneMapa && (
            <button
              type="button"
              onClick={() =>
                onIrAModo(modo === MODO_MAPA ? MODO_FOTOS : MODO_MAPA)
              }
              className={getBtnClass(modo, MODO_MAPA)}
            >
              <FaMapMarkerAlt className="text-sm" />
              Mapa
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onAmpliar}
          className="flex items-center gap-1.5 text-lg font-semibold text-decimo hover:underline cursor-pointer md:w-36 font-sans"
        >
          <BsArrowsAngleExpand className="text-base" />
          {modo === MODO_PLANOS ? "Ampliar plano" : "Ampliar foto"}
        </button>
      </div>
    </div>
  );
};

export default VisorFooter;

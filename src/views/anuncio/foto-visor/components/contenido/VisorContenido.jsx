"use client";

import { MdKeyboardArrowLeft, MdMyLocation } from "react-icons/md";
import PropertyImage from "@/components/common/PropertyImage";
import { ZoomControl } from "@/components/map/MapControls";
import { MODO_3D, MODO_MAPA, MODO_PLANOS } from "../../constants";
import { useMapaVisor } from "../../hooks/useMapaVisor";
import FlechasSecuencia, { BotonSalirFullscreen } from "../controles/FlechasSecuencia";

const VisorContenido = ({
  modo,
  inmueble,
  fotoActual,
  nombreEspacio,
  planosAgrupados,
  indexPlanos,
  tieneMapa,
  latitud,
  longitud,
  fullscreen,
  mostrarFlechas,
  onCerrar,
  onNavegar,
  onSalirFullscreen,
}) => {
  const { mapaContainerRef, mapa, handleCentrarMapa } = useMapaVisor(
    modo,
    latitud,
    longitud,
  );

  const esMapa = modo === MODO_MAPA && tieneMapa;
  const esPlanos = modo === MODO_PLANOS && planosAgrupados.length > 0;
  const es3d = modo === MODO_3D;

  return (
    <>
      <button
        type="button"
        onClick={onCerrar}
        className="absolute top-3 left-4 bg-primero border-2 border-segundo rounded-sm px-4 py-2.5 text-sm font-semibold shadow hover:bg-gray-100 z-10 md:hidden flex items-center gap-1 text-segundo"
      >
        <MdKeyboardArrowLeft className="text-lg" />
        Volver
      </button>

      {esMapa ? (
        <div className="w-full h-full relative">
          <div ref={mapaContainerRef} className="w-full h-full" />
          {mapa && (
            <div className="absolute bottom-4 right-4 z-10">
              <ZoomControl map={mapa} />
            </div>
          )}
          <button
            type="button"
            onClick={handleCentrarMapa}
            className="absolute top-3 md:right-12 right-4 bg-primero border-2 border-segundo rounded-sm px-5 py-2.5 text-sm font-semibold shadow hover:bg-gray-100 z-10 flex items-center gap-1 text-segundo"
          >
            <MdMyLocation className="text-sm" />
            Centrar
          </button>
          {fullscreen && (
            <BotonSalirFullscreen
              onSalir={onSalirFullscreen}
              className="absolute top-4 left-4 z-2200 bg-primero/20 hover:bg-primero/40 backdrop-blur-sm text-primero rounded-lg p-3 transition-colors duration-200 cursor-pointer"
            />
          )}
          <FlechasSecuencia visible={mostrarFlechas} onNavegar={onNavegar} />
        </div>
      ) : esPlanos ? (
        <>
          <PropertyImage
            foto={planosAgrupados[indexPlanos]}
            tamañoBase="xlarge"
            sizes="200vw"
            alt={`Plano ${indexPlanos + 1}`}
            className={`${fullscreen ? "w-full h-full" : "max-w-full max-h-full"} object-contain select-none`}
          />
          {fullscreen && <BotonSalirFullscreen onSalir={onSalirFullscreen} />}
          <FlechasSecuencia visible={mostrarFlechas} onNavegar={onNavegar} />
        </>
      ) : es3d ? (
        <>
          <div className="flex items-center justify-center text-gray-400 text-lg">
            Vista 3D no disponible
          </div>
          <FlechasSecuencia visible={mostrarFlechas} onNavegar={onNavegar} />
        </>
      ) : (
        <>
          <PropertyImage
            foto={fotoActual}
            tamañoBase="xlarge"
            sizes="200vw"
            alt={nombreEspacio || inmueble.titulo}
            className={`${fullscreen ? "w-full h-full" : "max-w-full max-h-full"} object-contain select-none`}
          />
          {fullscreen && <BotonSalirFullscreen onSalir={onSalirFullscreen} />}
          <FlechasSecuencia visible={mostrarFlechas} onNavegar={onNavegar} />
        </>
      )}
    </>
  );
};

export default VisorContenido;

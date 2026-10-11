"use client";

import VisorHeader from "./components/header/VisorHeader";
import VisorContenido from "./components/contenido/VisorContenido";
import VisorFooter from "./components/footer/VisorFooter";
import { useFotoVisor } from "./hooks/useFotoVisor";

export default function FotoVisor() {
  const {
    inmueble,
    modo,
    fotoActual,
    nombreEspacio,
    planosAgrupados,
    indexPlanos,
    totalImagenes,
    totalPlanos,
    tieneMapa,
    tiene3d,
    latitud,
    longitud,
    specsLinea,
    counterText,
    mostrarFlechas,
    fullscreen,
    setFullscreen,
    irAModo,
    handleNavegar,
    cerrar,
    salirFullscreen,
    handleContactar,
  } = useFotoVisor();

  if (!inmueble) return null;

  return (
    <div className="fixed inset-0 z-2000 bg-primero flex flex-col font-poppins">
      {!fullscreen && (
        <VisorHeader
          inmueble={inmueble}
          specsLinea={specsLinea}
          onCerrar={cerrar}
          onContactar={handleContactar}
        />
      )}

      <div
        className={`relative flex-1 flex items-center justify-center min-h-0 ${fullscreen ? "fixed inset-0 z-2100 bg-segundo" : ""}`}
      >
        <VisorContenido
          modo={modo}
          inmueble={inmueble}
          fotoActual={fotoActual}
          nombreEspacio={nombreEspacio}
          planosAgrupados={planosAgrupados}
          indexPlanos={indexPlanos}
          tieneMapa={tieneMapa}
          latitud={latitud}
          longitud={longitud}
          fullscreen={fullscreen}
          mostrarFlechas={mostrarFlechas}
          onCerrar={cerrar}
          onNavegar={handleNavegar}
          onSalirFullscreen={salirFullscreen}
        />
      </div>

      {!fullscreen && (
        <VisorFooter
          counterText={counterText}
          modo={modo}
          totalImagenes={totalImagenes}
          totalPlanos={totalPlanos}
          tiene3d={tiene3d}
          tieneMapa={tieneMapa}
          onIrAModo={irAModo}
          onAmpliar={() => setFullscreen(true)}
        />
      )}
    </div>
  );
}

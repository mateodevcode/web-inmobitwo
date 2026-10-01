import { FaDrawPolygon } from "react-icons/fa";

export function DrawGuide({
  drawMode,
  mapReady,
  drawArmed,
  hasPolygon,
  onStartDrawing,
}) {
  return (
    <>
      {drawMode && mapReady && drawArmed && (
        <div className="absolute top-16 md:top-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-5 py-2 rounded-md text-sm z-40 pointer-events-none font-poppins w-80 md:w-130 text-center">
          Haz clic para marcar vértices. Doble clic para cerrar el polígono.
        </div>
      )}

      {drawMode && mapReady && !drawArmed && !hasPolygon && (
        <div className="absolute bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-50">
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-md shadow-lg border-2 border-black/80 bg-[#e6007a] text-white cursor-pointer text-sm font-poppins font-semibold hover:bg-[#c40068] transition-colors"
            onClick={onStartDrawing}
          >
            <FaDrawPolygon size={18} />
            <span>Dibujar tu zona</span>
          </button>
        </div>
      )}
    </>
  );
}

import { FaDrawPolygon } from "react-icons/fa";
import { TfiMapAlt } from "react-icons/tfi";

export function DrawToolbar({ drawMode, hasPolygon, onToggle, onDelete }) {
  return (
    <div className="absolute top-3 md:top-4 right-3 md:right-4 z-50 flex flex-col gap-2">
      <div className="rounded-md overflow-hidden shadow-lg border-2 border-black/80 bg-white">
        <button
          className={`flex items-center gap-2 px-5 py-2.5 cursor-pointer text-sm font-poppins font-semibold transition-colors ${
            drawMode
              ? "bg-[#e6007a] text-white"
              : "bg-gray-50 text-black/80 hover:bg-white"
          }`}
          title={drawMode ? "Modo seleccion" : "Dibujar tu zona"}
          onClick={onToggle}
        >
          {drawMode ? (
            <>
              <TfiMapAlt size={18} />
              <span>Seleccionar zona</span>
            </>
          ) : (
            <>
              <FaDrawPolygon size={18} />
              <span>Dibujar tu zona</span>
            </>
          )}
        </button>
      </div>
      {drawMode && hasPolygon && (
        <div className="rounded-md overflow-hidden shadow-lg border-2 border-black/80 bg-white">
          <button
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 cursor-pointer text-sm text-black/80 font-poppins font-semibold hover:bg-white w-full"
            title="Borrar polígono"
            onClick={onDelete}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" />
            </svg>
            <span>Borrar polígono</span>
          </button>
        </div>
      )}
    </div>
  );
}

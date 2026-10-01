import { TfiMapAlt } from "react-icons/tfi";
import { PiTrashSimple } from "react-icons/pi";

export function SelectedZoneCard({
  drawMode,
  selectedZone,
  propertyCount,
  loading,
  onClear,
  onVerInmuebles,
}) {
  if (drawMode || !selectedZone) return null;

  return (
    <div className="absolute top-22 md:top-24 left-5 bg-white rounded shadow-lg p-4 min-w-90 z-1000 font-poppins min-h-44 flex flex-col justify-between">
      <div>
        <div className="text-xl font-semibold text-segundo m-0 mb-3 flex items-center gap-3 font-montserrat">
          <TfiMapAlt className="text-2xl" />
          <h3>Zona seleccionada</h3>
        </div>
        <div className="flex items-center gap-2 px-2 py-2.5 mb-3">
          <span className="flex-1 text-base text-gray-800">
            {selectedZone.name}
          </span>
          <span className="text-sm text-gray-500 font-medium">
            {propertyCount.toLocaleString()}
          </span>
          <button
            className="bg-none border-none cursor-pointer text-lg p-0 leading-none hover:opacity-100 font-poppins font-semibold text-decimo hover:text-decimo/80"
            onClick={onClear}
            title="Volver a seleccionar"
          >
            <PiTrashSimple />
          </button>
        </div>
      </div>
      <button
        className="w-full py-3 px-5 bg-tercero text-white border-none rounded-md text-sm font-semibold cursor-pointer transition-colors hover:bg-tercero/80 disabled:opacity-50"
        onClick={onVerInmuebles}
        disabled={loading}
      >
        Ver {propertyCount.toLocaleString()} inmuebles
      </button>
    </div>
  );
}

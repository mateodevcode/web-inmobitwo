import { FiSearch, FiX } from "react-icons/fi";
import InputSearchZona from "@/components/map/InputSearchZona";

export function ZonaPageHeader({
  drawMode,
  mobileSearchOpen,
  onOpenMobileSearch,
  onCloseMobileSearch,
  onSelectZone,
  operation,
  tipoInmueble,
  onBack,
}) {
  return (
    <header className="flex items-center gap-5 px-4 md:px-6 py-4 border-b border-segundo/5 bg-primero z-1000 shrink-0 w-full justify-between">
      <div
        className={`items-center gap-6 ${mobileSearchOpen ? "hidden md:flex" : "flex"}`}
      >
        <h1 className="text-base md:text-xl text-segundo/80 m-0">
          {drawMode ? "Dibujar tu zona" : "Seleccionar zonas"}
        </h1>
        {!drawMode && (
          <button
            className="flex items-center gap-2 md:hidden"
            onClick={onOpenMobileSearch}
          >
            <FiSearch className="text-segundo/60 shrink-0" />
            <span>Buscar</span>
          </button>
        )}
      </div>

      {!drawMode && (
        <div
          className={`items-center gap-2 ${mobileSearchOpen ? "flex w-full" : "hidden md:flex"}`}
        >
          <InputSearchZona
            onSelectZone={(zone) => onSelectZone(zone, operation, tipoInmueble)}
            operation={operation}
            tipoInmueble={tipoInmueble}
            className={`${mobileSearchOpen ? "w-full" : "w-100"}`}
            showX={true}
          />
          <button
            className="md:hidden shrink-0 text-segundo/50"
            onClick={onCloseMobileSearch}
          >
            <FiX size={20} />
          </button>
        </div>
      )}

      <button
        className={`py-2 md:px-4 border-none bg-transparent text-segundo/50 cursor-pointer text-sm hover:text-tercero ${
          mobileSearchOpen ? "hidden md:block" : ""
        }`}
        onClick={onBack}
      >
        Cancelar
      </button>
    </header>
  );
}

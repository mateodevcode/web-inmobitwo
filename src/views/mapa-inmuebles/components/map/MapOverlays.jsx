import { ZoomControl, LocationControl } from "@/components/map/MapControls";
import InputSearchZona from "@/components/map/InputSearchZona";
import { PropertyCard } from "@/components/map/property-card/PropertyCard";
import BarraNavegacionTauri from "@/components/barra-navegacion/BarraNavegacionTauri";

export function MapOverlays({
  map,
  mapReady,
  loading,
  selectedInmueble,
  onCloseCard,
  operation,
  tipoInmueble,
  onSelectZone,
}) {
  return (
    <>
      {loading && (
        <div className="absolute top-4 left-4 bg-black/85 text-white px-4 py-2 rounded-full text-xs z-10">
          Cargando inmuebles...
        </div>
      )}
      {mapReady && map && (
        <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2 items-end">
          <ZoomControl map={map} />
          <LocationControl map={map} />
        </div>
      )}
      {selectedInmueble && (
        <PropertyCard inmueble={selectedInmueble} onClose={onCloseCard} />
      )}
      <div className="absolute top-16 md:top-3 right-2 md:right-4 z-10">
        <InputSearchZona
          onSelectZone={(zone) => onSelectZone(zone, operation, tipoInmueble)}
          operation={operation}
          tipoInmueble={tipoInmueble}
          className="w-80 border-2"
          showX={true}
        />
      </div>

      <div className="absolute bottom-2 left-2 z-50 bg-amber-400">
        <BarraNavegacionTauri />
      </div>
    </>
  );
}

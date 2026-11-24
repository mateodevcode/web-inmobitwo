import { useRouter } from "next/navigation";
import { TfiMapAlt } from "react-icons/tfi";
import { ZoomControl, LocationControl, BackControl } from "@/components/map/MapControls";
import InputSearchZona from "@/components/map/InputSearchZona";
import { PropertyCard } from "@/components/map/property-card/PropertyCard";
import BarraNavegacionTauri from "@/components/barra-navegacion/BarraNavegacionTauri";

export function MapOverlays({
  map,
  mapReady,
  loading,
  totalVisible,
  selectedInmueble,
  onCloseCard,
  operation,
  tipoInmueble,
  onSelectZone,
}) {
  const router = useRouter();

  return (
    <>
      <div className="absolute top-16 md:top-3 left-2 md:left-4 z-10">
        <BackControl onBack={() => router.back()} />
      </div>
      {/* Contador de lo que hay en pantalla (se actualiza al mover el mapa) */}
      {(loading || totalVisible != null) && (
        <div
          className="absolute top-28 md:top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-white/95 text-segundo px-4 py-1.5 rounded-full text-xs font-semibold shadow-md pointer-events-none"
          aria-live="polite"
        >
          {loading && (
            <span className="w-3 h-3 rounded-full border-2 border-noveno border-t-transparent animate-spin" />
          )}
          {totalVisible != null
            ? totalVisible === 0
              ? "Sin inmuebles en esta zona. Aleja el mapa"
              : `${totalVisible.toLocaleString("es-CO")} ${totalVisible === 1 ? "inmueble" : "inmuebles"} en esta zona`
            : "Cargando inmuebles…"}
        </div>
      )}
      {mapReady && map && (
        <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2 items-end">
          <ZoomControl map={map} />
          <LocationControl map={map} />
        </div>
      )}
      {/* Ir al MAPA PRINCIPAL (seleccionar zona), mismo estilo que sus botones */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="rounded-md overflow-hidden shadow-lg border-2 border-segundo/80 bg-primero">
          <button
            className="flex items-center gap-2 px-5 py-2.5 bg-primero text-segundo/80 hover:bg-primero/80 cursor-pointer text-sm font-montserrat font-semibold transition-colors"
            title="Seleccionar en mapa"
            onClick={() =>
              router.push(`/busqueda-multizona/${operation}-${tipoInmueble}`)
            }
          >
            <TfiMapAlt size={18} />
            <span>Seleccionar en Mapa</span>
          </button>
        </div>
      </div>
      {selectedInmueble && (
        <PropertyCard inmueble={selectedInmueble} onClose={onCloseCard} />
      )}
      <div className="absolute top-16 md:top-3 right-2 md:right-4 z-10">
        <InputSearchZona
          onSelectZone={(zone) => onSelectZone(zone, operation, tipoInmueble)}
          operation={operation}
          tipoInmueble={tipoInmueble}
          className="w-80"
          showX={true}
        />
      </div>

      <div className="absolute bottom-2 left-2 z-50 bg-amber-400">
        <BarraNavegacionTauri />
      </div>
    </>
  );
}

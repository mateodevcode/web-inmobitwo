// views/mapa-inmuebles/MapaInmuebles.jsx
import { useMapaInmuebles } from "./components/map/useMapaInmuebles";
import { MapOverlays } from "./components/map/MapOverlays";

export default function MapaInmuebles({
  lat,
  lng,
  zoom,
  operation,
  tipoInmueble,
  boundary,
  autoMarcarUbicacion = false,
}) {
  const {
    mapContainerRef,
    map,
    loading,
    mapReady,
    totalVisible,
    selectedInmueble,
    setSelectedInmueble,
    flyToZone,
  } = useMapaInmuebles({
    lat,
    lng,
    zoom,
    operation,
    tipoInmueble,
    boundary,
    autoMarcarUbicacion,
  });

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full" />
      <MapOverlays
        map={map}
        mapReady={mapReady}
        loading={loading}
        totalVisible={totalVisible}
        selectedInmueble={selectedInmueble}
        onCloseCard={() => setSelectedInmueble(null)}
        operation={operation}
        tipoInmueble={tipoInmueble}
        onSelectZone={flyToZone}
      />
    </div>
  );
}

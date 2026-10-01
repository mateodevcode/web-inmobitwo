// views/seleccionar-zona/components/map/SelectZonaMap.jsx
// Orquestador delgado: el estado imperativo vive en useZonaMap,
// el render en overlays. La lógica de capas/dibujo está en
// layers.js, polygon.js, geoman.js e interactivity.js.
import { PropertyCard } from "@/components/map/property-card/PropertyCard";
import MapHintBanner from "./overlays/MapHintBanner";
import { LoadingBadge } from "./overlays/LoadingBadge";
import { DrawToolbar } from "./overlays/DrawToolbar";
import { DrawGuide } from "./overlays/DrawGuide";
import { VerInmueblesBar } from "./overlays/VerInmueblesBar";
import { MapWidgets } from "./overlays/MapWidgets";
import { useZonaMap } from "./useZonaMap";

export default function SelectZonaMap({
  selectedZone,
  onSelectZone,
  operation,
  tipoInmueble,
  drawMode,
  onToggleDrawMode,
  onPolygonChange,
  polygonProperties,
  polygonPropCount,
  polygonLoading,
  onVerInmuebles,
}) {
  const {
    containerRef,
    map,
    hasDrawLayer,
    loading,
    mapReady,
    drawArmed,
    selectedInmueble,
    setSelectedInmueble,
    doDeletePolygon,
    doStartDrawing,
  } = useZonaMap({
    selectedZone,
    onSelectZone,
    operation,
    tipoInmueble,
    drawMode,
    onPolygonChange,
    polygonProperties,
  });

  return (
    <div className="relative w-full h-full">
      {loading && <LoadingBadge />}

      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ background: "#e0f2f1" }}
      />

      <DrawToolbar
        drawMode={drawMode}
        hasPolygon={hasDrawLayer}
        onToggle={() => onToggleDrawMode?.(!drawMode)}
        onDelete={doDeletePolygon}
      />
      <DrawGuide
        drawMode={drawMode}
        mapReady={mapReady}
        drawArmed={drawArmed}
        hasPolygon={hasDrawLayer}
        onStartDrawing={doStartDrawing}
      />
      <VerInmueblesBar
        drawMode={drawMode}
        mapReady={mapReady}
        hasPolygon={hasDrawLayer}
        loading={polygonLoading}
        count={polygonPropCount}
        onVerInmuebles={onVerInmuebles}
      />

      <MapWidgets map={map} mapReady={mapReady} drawMode={drawMode} />

      {!drawMode && <MapHintBanner />}

      {selectedInmueble && (
        <PropertyCard
          inmueble={selectedInmueble}
          onClose={() => setSelectedInmueble(null)}
        />
      )}
    </div>
  );
}

import { ZoomControl, LocationControl } from "@/components/map/MapControls";

// hayZonas: en móvil la barra de zonas ocupa el borde inferior; los
// controles suben para no quedar tapados.
export function MapWidgets({ map, mapReady, drawMode, hayZonas = false }) {
  if (!(mapReady && map)) return null;

  return (
    <div className={`absolute ${hayZonas && !drawMode ? "bottom-40" : "bottom-16"} md:bottom-4 right-3 md:right-4 z-10 flex flex-col gap-2 items-end`}>
      <ZoomControl map={map} />
      {!drawMode && <LocationControl map={map} />}
    </div>
  );
}

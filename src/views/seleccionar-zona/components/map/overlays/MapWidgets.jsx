import { ZoomControl, LocationControl } from "@/components/map/MapControls";

export function MapWidgets({ map, mapReady, drawMode }) {
  if (!(mapReady && map)) return null;

  return (
    <div className="absolute bottom-16 md:bottom-4 right-3 md:right-4 z-10 flex flex-col gap-2 items-end">
      <ZoomControl map={map} />
      {!drawMode && <LocationControl map={map} />}
    </div>
  );
}

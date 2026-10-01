import * as maplibregl from "maplibre-gl";

export function getRingClosePoint(geojson) {
  const geom = geojson?.geometry;
  if (!geom) return null;
  const ring =
    geom.type === "Polygon"
      ? geom.coordinates?.[0]
      : geom.type === "MultiPolygon"
        ? geom.coordinates?.[0]?.[0]
        : null;
  return ring?.length ? ring[0] : null;
}

export function removeCloseMarker(closeMarkerRef) {
  if (closeMarkerRef.current) {
    closeMarkerRef.current.remove();
    closeMarkerRef.current = null;
  }
}

export function placeCloseMarker(map, closeMarkerRef, coord, onDelete) {
  removeCloseMarker(closeMarkerRef);
  if (!map || !coord) return;
  const el = document.createElement("div");
  el.className =
    "flex items-center justify-center w-7 h-7 rounded-full bg-white border-2 border-[#e6007a] text-[#e6007a] shadow-md cursor-pointer hover:bg-[#e6007a] hover:text-white transition-colors";
  el.title = "Borrar polígono";
  el.innerHTML =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>';
  el.addEventListener("click", (ev) => {
    ev.stopPropagation();
    onDelete();
  });
  const marker = new maplibregl.Marker({ element: el, anchor: "center" })
    .setLngLat(coord)
    .addTo(map);
  closeMarkerRef.current = marker;
}

export function clearPropMarkers(propMarkersRef) {
  propMarkersRef.current.forEach((m) => m.remove());
  propMarkersRef.current = [];
}

// ctx: { gmRef, drawLayerRef, closeMarkerRef, setDrawArmed, setHasDrawLayer, onPolygonChange }
export function handleDeletePolygon(ctx) {
  try {
    ctx.gmRef.current?.disableDraw();
  } catch {}
  if (ctx.drawLayerRef.current) {
    try {
      ctx.drawLayerRef.current.delete();
    } catch {}
    ctx.drawLayerRef.current = null;
  }
  removeCloseMarker(ctx.closeMarkerRef);
  ctx.setDrawArmed(false);
  ctx.setHasDrawLayer(false);
  if (ctx.onPolygonChange) ctx.onPolygonChange(null);
}

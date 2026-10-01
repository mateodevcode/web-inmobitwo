import * as maplibregl from "maplibre-gl";

export function zoomToBounds(map, bounds, padding = 40) {
  if (!bounds || !map) return;
  map.fitBounds(bounds, { padding, duration: 1200, maxZoom: 17 });
}

const OSM_STYLE = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
    },
  },
  layers: [{ id: "osm-tiles", type: "raster", source: "osm" }],
};

export function createOsmMap(container, { center, zoom, minZoom, interactive = true } = {}) {
  return new maplibregl.Map({
    container,
    style: OSM_STYLE,
    center: center ?? [-74.1, 4.6],
    zoom: zoom ?? 6,
    ...(minZoom !== undefined ? { minZoom } : {}),
    interactive,
    attributionControl: false,
  });
}

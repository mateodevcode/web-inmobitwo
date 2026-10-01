import * as maplibregl from "maplibre-gl";
import { createClusterIcon, createPricePin } from "@/components/map/mapPins";

export function clearMarkers(markersRef) {
  markersRef.current.forEach((m) => m.remove());
  markersRef.current = [];
}

export function renderMarkers({ map, markersRef, clusterIndexRef, selectedInmueble, onSelect }) {
  if (!map || !map.isStyleLoaded()) return;
  clearMarkers(markersRef);

  const bounds = map.getBounds();
  const bbox = [
    bounds.getWest(),
    bounds.getSouth(),
    bounds.getEast(),
    bounds.getNorth(),
  ];
  const z = Math.floor(map.getZoom());

  let features = [];
  try {
    features = clusterIndexRef.current.getClusters(bbox, z);
  } catch {
    return;
  }

  features.forEach((f) => {
    const [flng, flat] = f.geometry.coordinates;
    const props = f.properties;
    if (props.cluster) {
      const el = createClusterIcon(props.point_count);
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const expZoom = clusterIndexRef.current.getClusterExpansionZoom(
          props.cluster_id,
        );
        map.flyTo({ center: [flng, flat], zoom: expZoom });
      });
      const m = new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([flng, flat])
        .addTo(map);
      markersRef.current.push(m);
    } else {
      const isSelected = selectedInmueble?.id === props.id;
      const el = createPricePin(props, isSelected);
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        onSelect(props);
      });
      const m = new maplibregl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([flng, flat])
        .addTo(map);
      markersRef.current.push(m);
    }
  });
}


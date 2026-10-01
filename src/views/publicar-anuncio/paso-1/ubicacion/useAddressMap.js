import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";

const pinSvg = `
  <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 11 16 26 16 26s16-15 16-26C32 7.163 24.837 0 16 0z" fill="#FF1B1C"/>
    <circle cx="16" cy="16" r="6" fill="white"/>
  </svg>
`;

// Posición inicial: pin del usuario > geocodificado > ciudad > Madrid.
const resolveInitial = (initialPosition, geocodeResult, fallbackPosition) => ({
  lat:
    initialPosition?.lat ??
    geocodeResult?.latitude ??
    fallbackPosition?.latitude ??
    40.4168,
  lng:
    initialPosition?.lng ??
    geocodeResult?.longitude ??
    fallbackPosition?.longitude ??
    -3.7038,
});

const createMarker = (map, positionRef, setPosition) => {
  const el = document.createElement("div");
  el.innerHTML = pinSvg;
  el.style.cursor = "grab";

  const marker = new maplibregl.Marker({
    element: el,
    anchor: "bottom",
    draggable: true,
  })
    .setLngLat([positionRef.current.lng, positionRef.current.lat])
    .addTo(map);

  marker.on("dragstart", () => {
    el.style.cursor = "grabbing";
  });

  marker.on("dragend", () => {
    el.style.cursor = "grab";
    const lngLat = marker.getLngLat();
    const newPos = { lat: lngLat.lat, lng: lngLat.lng };
    positionRef.current = newPos;
    setPosition(newPos);
  });

  return marker;
};

const createMap = (container, initial, onLoad) =>
  new maplibregl.Map({
    container,
    style: {
      version: 8,
      sources: {
        osm: {
          type: "raster",
          tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
          tileSize: 256,
        },
      },
      layers: [{ id: "osm-tiles", type: "raster", source: "osm" }],
    },
    center: [initial.lng, initial.lat],
    zoom: 17,
    attributionControl: false,
  });

export const useAddressMap = ({
  open,
  initialPosition,
  geocodeResult,
  fallbackPosition,
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const positionRef = useRef(null);

  const initial = resolveInitial(
    initialPosition,
    geocodeResult,
    fallbackPosition,
  );
  const [position, setPosition] = useState(initial);

  useEffect(() => {
    if (open) {
      const t = setTimeout(
        () => setPosition({ lat: initial.lat, lng: initial.lng }),
        0,
      );
      return () => clearTimeout(t);
    }
  }, [open, initial.lat, initial.lng]);

  useEffect(() => {
    if (!open) return;

    // Pequeño delay para que el Dialog termine su animación y el contenedor tenga tamaño
    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return;

      const map = createMap(mapContainerRef.current, {
        lat: initial.lat,
        lng: initial.lng,
      });
      positionRef.current = { lat: initial.lat, lng: initial.lng };
      mapInstanceRef.current = map;

      map.on("load", () => {
        markerRef.current = createMarker(map, positionRef, setPosition);
      });
    }, 150);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!markerRef.current) return;
    markerRef.current.setLngLat([position.lng, position.lat]);
  }, [position]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !map.isStyleLoaded()) return;
    map.flyTo({ center: [initial.lng, initial.lat] });
    positionRef.current = { lat: initial.lat, lng: initial.lng };
  }, [initial.lat, initial.lng]);

  return { mapContainerRef, position };
};

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import { MARKER_SVG, MODO_MAPA } from "../constants";

export const useMapaVisor = (modo, latitud, longitud) => {
  const mapaContainerRef = useRef(null);
  const mapaInstanceRef = useRef(null);
  const [mapa, setMapa] = useState(null);

  useEffect(() => {
    if (modo !== MODO_MAPA || !latitud || !longitud) return;
    if (mapaInstanceRef.current) return;

    const map = new maplibregl.Map({
      container: mapaContainerRef.current,
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
      center: [longitud, latitud],
      zoom: 16,
      attributionControl: false,
    });

    const el = document.createElement("div");
    el.innerHTML = MARKER_SVG;
    new maplibregl.Marker({ element: el, anchor: "bottom" })
      .setLngLat([longitud, latitud])
      .addTo(map);

    mapaInstanceRef.current = map;
    setMapa(map);

    return () => {
      map.remove();
      mapaInstanceRef.current = null;
      setMapa(null);
    };
  }, [modo, latitud, longitud]);

  const handleCentrarMapa = useCallback(() => {
    const map = mapaInstanceRef.current;
    if (map && latitud && longitud) {
      map.flyTo({ center: [longitud, latitud], zoom: 16, duration: 800 });
    }
  }, [latitud, longitud]);

  return { mapaContainerRef, mapa, handleCentrarMapa };
};

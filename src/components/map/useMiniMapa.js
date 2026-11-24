import { useEffect, useRef } from "react";
import { apiBackend } from "@/actions/apiBackend.js";
import { fetchGeoJSONZonas } from "@/lib/geoApi";
import { drawGeometry } from "@/lib/geoUtils";
import { createOsmMap } from "./mapUtils";

function endpointFor(locationInfo) {
  const { tipo } = locationInfo;

  if (tipo === "ciudad") {
    const { city_slug, state_slug } = locationInfo;
    if (city_slug && state_slug) {
      return `/api/location-geojson?tipo=ciudad&city=${city_slug}&dept=${state_slug}`;
    }
  } else if (tipo === "departamento") {
    const { state_slug } = locationInfo;
    if (state_slug) {
      return `/api/location-geojson?tipo=departamento&dept=${state_slug}`;
    }
  } else if (tipo === "region") {
    const { region_slug } = locationInfo;
    if (region_slug) {
      return `/api/location-geojson?tipo=region&region=${region_slug}`;
    }
  }
  return "";
}

// zonas: "tipo:codigo,…" de los resultados de varias zonas (?z=), o null.
export function useMiniMapa(mapRef, locationInfo, polyKey, zonas = null) {
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!locationInfo) return;

    async function init() {
      if (instanceRef.current) return;

      const instance = createOsmMap(mapRef.current, { interactive: false });
      instanceRef.current = instance;

      instance.on("load", async () => {
        const { tipo } = locationInfo;

        // Varias zonas del mapa: se pintan todas juntas y se encuadran.
        if (tipo === "custom_polygon" && zonas) {
          try {
            const fc = await fetchGeoJSONZonas(zonas);
            const geometries = (fc?.features || []).map((f) => f.geometry).filter(Boolean);
            if (geometries.length && instanceRef.current === instance) {
              drawGeometry(instance, { type: "GeometryCollection", geometries });
            }
          } catch {
            // sin geometrías: se muestra el mapa vacío
          }
          return;
        }

        if (tipo === "custom_polygon") {
          const geojsonStr = polyKey
            ? sessionStorage.getItem(polyKey)
            : null;
          if (geojsonStr) {
            try {
              const geojson = JSON.parse(geojsonStr);
              drawGeometry(instance, geojson.geometry || geojson);
            } catch {
              // polígono corrupto en sessionStorage: se muestra el mapa vacío
            }
          }
          return;
        }

        const endpoint = endpointFor(locationInfo);
        if (!endpoint) return;

        try {
          const res = await apiBackend(endpoint);
          if (!res.success || !res.data) return;

          if (res.data.geometry) {
            drawGeometry(instance, res.data.geometry);
          } else if (res.data.bounds) {
            instance.fitBounds(res.data.bounds, { padding: 10 });
          }
        } catch {
          // sin geometría: se muestra el mapa vacío
        }
      });
    }

    init();

    return () => {
      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }
    };
  }, [mapRef, locationInfo, polyKey, zonas]);
}

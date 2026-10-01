import { useState, useRef, useEffect, useCallback } from "react";
import * as maplibregl from "maplibre-gl";
import Supercluster from "supercluster";
import { fetchInmueblesEnBbox } from "@/lib/geoApi";
import { apiBackend } from "@/actions/apiBackend.js";
import { useSelectZona } from "@/hooks/useSelectZona";
import { createOsmMap } from "@/components/map/mapUtils";
import { clearMarkers, renderMarkers } from "./markers";
import { renderBoundary } from "./boundary";

function slugify(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function useMapaInmuebles({ lat, lng, zoom, operation, tipoInmueble, boundary }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const clusterIndexRef = useRef(new Supercluster({ radius: 60, maxZoom: 16 }));
  const debounceRef = useRef(null);
  const markersRef = useRef([]);
  const opRef = useRef(operation);
  const tipoRef = useRef(tipoInmueble);
  const loadedRef = useRef(false);

  const [inmuebles, setInmuebles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInmueble, setSelectedInmueble] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    opRef.current = operation;
  }, [operation]);
  useEffect(() => {
    tipoRef.current = tipoInmueble;
  }, [tipoInmueble]);

  const loadInmuebles = useCallback(async () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    setLoading(true);
    try {
      const b = map.getBounds();
      const data = await fetchInmueblesEnBbox({
        minLat: b.getSouth(),
        minLng: b.getWest(),
        maxLat: b.getNorth(),
        maxLng: b.getEast(),
        operation: opRef.current,
        tipoInmueble: tipoRef.current,
      });
      setInmuebles(data);
    } catch (e) {
      console.error("[MapaInmuebles] Error cargando inmuebles:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // 1. Crear mapa (debe ir PRIMERO)
  useEffect(() => {
    if (mapInstanceRef.current) return;

    const map = createOsmMap(mapContainerRef.current, {
      center: [lng || -74.1, lat || 4.6],
      zoom: zoom || 11,
    });
    mapInstanceRef.current = map;

    const tryInit = () => {
      if (map !== mapInstanceRef.current) return; // mapa destruido por StrictMode
      if (loadedRef.current) return;
      if (!map.isStyleLoaded()) return;
      if (!map.loaded()) return;
      loadedRef.current = true;
      setMapReady(true);
      setMapInstance(map);

      map.on("moveend", () => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(loadInmuebles, 400);
      });

      loadInmuebles();
    };

    map.on("load", tryInit); // camino normal
    map.on("idle", tryInit); // fallback si load tarda

    return () => {
      loadedRef.current = false;
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const doRenderMarkers = () => {
    renderMarkers({
      map: mapInstanceRef.current,
      markersRef,
      clusterIndexRef,
      selectedInmueble,
      onSelect: setSelectedInmueble,
    });
  };

  // 2. Reconstruir indice + render cuando cambian inmuebles
  useEffect(() => {
    const index = new Supercluster({ radius: 60, maxZoom: 16 });
    const points = inmuebles
      .filter((p) => p.lat && p.lng)
      .map((p) => ({
        type: "Feature",
        properties: p,
        geometry: { type: "Point", coordinates: [p.lng, p.lat] },
      }));
    if (points.length > 0) index.load(points);
    clusterIndexRef.current = index;
    doRenderMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inmuebles]);

  // 3. Re-render cuando cambia el seleccionado
  useEffect(() => {
    doRenderMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedInmueble]);

  // 4. Renderizar borde de zona (region/depto/ciudad)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !boundary || !map.isStyleLoaded()) return;
    renderBoundary(map, boundary);
  }, [boundary, mapReady]);

  const { setSelectedZone: selectZone } = useSelectZona();

  const flyToZone = async (zone, op, tipo) => {
    selectZone(zone, op, tipo);

    if (!zone) return;
    const map = mapInstanceRef.current;
    if (!map) return;

    const address = `${zone.name}, Colombia`;
    try {
      const res = await apiBackend(
        `/api/geocode?address=${encodeURIComponent(address)}`,
        "GET",
      );
      if (res.success && res.data) {
        const { latitude, longitude } = res.data;
        map.flyTo({
          center: [longitude, latitude],
          zoom:
            zone.type === "region" ? 7 : zone.type === "departamento" ? 9 : 13,
          duration: 1500,
        });
      }
    } catch (e) {
      console.error("[MapaInmuebles] error geocodificando zona:", e);
    }

    // buscar y mostrar poligono de la zona (region y depto desde search)
    try {
      let endpoint;
      if (zone.type === "region") {
        endpoint = `/api/location-geojson?tipo=region&region=${zone.slug || slugify(zone.name)}`;
      } else if (zone.type === "departamento") {
        endpoint = `/api/location-geojson?tipo=departamento&dept=${slugify(zone.name)}`;
      }
      if (endpoint) {
        const bres = await apiBackend(endpoint);
        if (bres.success && bres.data?.geometry) {
          renderBoundary(map, bres.data.geometry);
        }
      }
    } catch {}
  };

  return {
    mapContainerRef,
    map: mapInstance,
    loading,
    mapReady,
    selectedInmueble,
    setSelectedInmueble,
    flyToZone,
  };
}

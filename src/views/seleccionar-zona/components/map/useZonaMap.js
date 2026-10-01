import { useState, useRef, useEffect } from "react";
import * as maplibregl from "maplibre-gl";
import { apiBackend } from "@/actions/apiBackend.js";
import { createPricePin } from "@/components/map/mapPins";
import { fetchRegionsGeoJSON, fetchStatesGeoJSON } from "@/lib/geoApi";
import { findFeature, featBounds, collectionBounds } from "@/lib/geoUtils";
import { getSelInfo } from "./selInfo";
import { createOsmMap, zoomToBounds } from "@/components/map/mapUtils";
import {
  refreshLayers,
  loadDrawBoundaries,
  maybeLoadDrawBarrios,
  loadMunicipios,
  loadBarrios,
  clearDrawLayers,
  removeSelectLayers,
  sourceOff,
} from "./layers";
import { setLineOpacity } from "./mapStyles";
import {
  removeCloseMarker,
  clearPropMarkers,
  handleDeletePolygon,
} from "./polygon";
import { setupGeoman, handleStartDrawing } from "./geoman";
import { setupInteractivity } from "./interactivity";

export function useZonaMap({
  selectedZone,
  onSelectZone,
  operation,
  tipoInmueble,
  drawMode,
  onPolygonChange,
  polygonProperties,
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const popupRef = useRef(null);

  const regionRawRef = useRef(null);
  const dptoRawRef = useRef(null);
  const mpioRawRef = useRef(null);
  const barrioRawRef = useRef(null);
  const rawRefs = {
    region: regionRawRef,
    dpto: dptoRawRef,
    mpio: mpioRawRef,
    barrio: barrioRawRef,
  };

  const selRef = useRef(null);
  const drawModeRef = useRef(false);
  const drawLayerRef = useRef(null);
  const geomanSetupRef = useRef(false);
  const gmRef = useRef(null);
  const propMarkersRef = useRef([]);
  const closeMarkerRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [hovCode, setHovCode] = useState(null);
  const [selectedInmueble, setSelectedInmueble] = useState(null);
  const [drawArmed, setDrawArmed] = useState(false);
  // Espejo en estado del drawLayerRef imperativo (para render condicional).
  // Se sincroniza en cada punto que muta el ref (ver abajo).
  const [hasDrawLayer, setHasDrawLayer] = useState(false);

  // Mirrors para los handlers imperativos del mapa (eventos maplibre/geoman
  // fuera del ciclo React). Se sincronizan tras cada render.
  useEffect(() => {
    selRef.current = selectedZone;
    drawModeRef.current = drawMode;
  });

  const doRefresh = (hov) => {
    refreshLayers(
      mapRef.current,
      rawRefs,
      getSelInfo(selRef.current),
      hov !== undefined ? hov : hovCode,
    );
  };

  const doLoadMunicipios = (code) =>
    loadMunicipios(mapRef.current, rawRefs, code, setLoading, () => doRefresh());

  const doLoadBarrios = (code, dptoCode) =>
    loadBarrios(mapRef.current, rawRefs, code, dptoCode, setLoading, () => doRefresh());

  const doDeletePolygon = () =>
    handleDeletePolygon({
      gmRef,
      drawLayerRef,
      closeMarkerRef,
      setDrawArmed,
      setHasDrawLayer,
      onPolygonChange,
    });

  const doStartDrawing = () => handleStartDrawing(gmRef, setDrawArmed);

  // ──── crear mapa ────
  useEffect(() => {
    if (mapRef.current) return;
    const map = createOsmMap(containerRef.current, {
      center: [-74.1, 4.6],
      zoom: 6,
      minZoom: 5,
    });
    mapRef.current = map;

    map.on("load", () => {
      setMapReady(true);
      setMapInstance(map);
      setupInteractivity(map, {
        selRef,
        drawModeRef,
        rawRefs,
        operation,
        tipoInmueble,
        onSelectZone,
        setHovCode,
        popupRef,
        doRefresh,
        doLoadMunicipios,
        doLoadBarrios,
      });

      if (!drawModeRef.current) {
        setLoading(true);
        fetchRegionsGeoJSON()
          .then((regData) => {
            regionRawRef.current = regData;
            refreshLayers(map, rawRefs, getSelInfo(selRef.current), null);
            return fetchStatesGeoJSON();
          })
          .then((data) => {
            dptoRawRef.current = data;
            refreshLayers(map, rawRefs, getSelInfo(selRef.current), null);
            const b = collectionBounds(data);
            if (b) map.fitBounds(b, { padding: 10 });
          })
          .catch((e) => console.error("[Zona] error cargando datos:", e))
          .finally(() => setLoading(false));
      }
    });

    map.on("error", (e) => console.error("[Zona] error mapa:", e.error || e));

    return () => {
      map.remove();
      mapRef.current = null;
      setMapInstance(null);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ──── refrescar al cambiar la seleccion ────
  useEffect(() => {
    if (!mapReady) return;
    doRefresh();

    const map = mapRef.current;
    if (!map || !selectedZone) return;

    async function doZoom() {
      // hacer zoom a la zona seleccionada via GeoJSON
      let feat = null;
      if (selectedZone.type === "region") {
        feat = findFeature(regionRawRef.current, "slug", selectedZone.slug);
      } else if (selectedZone.type === "departamento") {
        feat = findFeature(
          dptoRawRef.current,
          "DPTO_CCDGO",
          selectedZone.daneCode,
        );
      } else if (selectedZone.type === "municipio") {
        feat = findFeature(
          mpioRawRef.current,
          "MPIO_CCNCT",
          selectedZone.daneCode,
        );
      } else if (selectedZone.type === "barrio") {
        feat = findFeature(
          barrioRawRef.current,
          "BAR_COD",
          selectedZone.daneCode,
        );
      }
      if (feat) {
        zoomToBounds(
          map,
          featBounds(feat),
          selectedZone.type === "barrio" ? 60 : 40,
        );
        return;
      }
      // fallback: geocodificar el nombre y hacer flyTo (busqueda desde input)
      try {
        const address = `${selectedZone.name}, Colombia`;
        const res = await apiBackend(
          `/api/geocode?address=${encodeURIComponent(address)}`,
          "GET",
        );
        if (res.success && res.data) {
          const zoomLevel =
            selectedZone.type === "region"
              ? 7
              : selectedZone.type === "departamento"
                ? 9
                : selectedZone.type === "barrio"
                  ? 15
                  : 13;
          map.flyTo({
            center: [res.data.longitude, res.data.latitude],
            zoom: zoomLevel,
            duration: 1500,
          });
        }
      } catch (e) {
        console.error("[Zona] error geocodificando zona:", e);
      }
    }
    doZoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedZone, mapReady]);

  // ──── efecto: reaccionar a cambios de drawMode ────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded() || !mapReady) return;

    if (drawMode) {
      removeSelectLayers(map);
      clearDrawLayers(map);
      loadDrawBoundaries(map, setLoading);

      // Reset imperativo del modo dibujo (Geoman es imperativo; no hay evento
      // previo donde hacerlo porque drawMode llega por props).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDrawArmed(false);

      if (!gmRef.current) {
        setupGeoman(map, {
          geomanSetupRef,
          gmRef,
          drawLayerRef,
          closeMarkerRef,
          setDrawArmed,
          setHasDrawLayer,
          onPolygonChange,
          onDeletePolygon: doDeletePolygon,
        });
      }

      // zoom listener para cargar barrios dinámicamente
      const onZoom = () => {
        const z = map.getZoom();
        if (z >= 10.5) {
          const center = map.getCenter();
          const features = map.queryRenderedFeatures(undefined, {
            layers: ["mpio-draw-line"],
          });
          if (features.length) {
            const f = features[0];
            const mpioCode = f.properties.MPIO_CCNCT;
            const dptoCode = f.properties.DPTO_CCDGO;
            maybeLoadDrawBarrios(map, dptoCode, mpioCode);
          } else {
            maybeLoadDrawBarrios(map, "11", "11001");
          }
        } else {
          sourceOff(map, "barrio");
        }
      };
      map.on("zoom", onZoom);
      onZoom();

      return () => map.off("zoom", onZoom);
    } else {
      try {
        gmRef.current?.disableDraw();
      } catch {}
      removeCloseMarker(closeMarkerRef);
      if (drawLayerRef.current) {
        try {
          drawLayerRef.current.delete?.();
        } catch {}
        drawLayerRef.current = null;
        setHasDrawLayer(false);
      }
      clearDrawLayers(map);

      if (!regionRawRef.current || !dptoRawRef.current) {
        setLoading(true);
        fetchRegionsGeoJSON()
          .then((regData) => {
            regionRawRef.current = regData;
            return fetchStatesGeoJSON();
          })
          .then((data) => {
            dptoRawRef.current = data;
            doRefresh();
            const b = collectionBounds(data);
            if (b) map.fitBounds(b, { padding: 10 });
          })
          .catch((e) => console.error("[Zona] error cargando datos:", e))
          .finally(() => setLoading(false));
      } else {
        doRefresh();
      }
    }
  }, [drawMode, mapReady]); // eslint-disable-line react-hooks/exhaustive-deps

  // ──── actualizar marcadores de propiedades en modo dibujo ────
  useEffect(() => {
    const map = mapRef.current;
    clearPropMarkers(propMarkersRef);
    if (
      !map ||
      !map.isStyleLoaded() ||
      !drawMode ||
      !polygonProperties?.length
    ) {
      return;
    }

    polygonProperties.forEach((p) => {
      if (p.longitude == null || p.latitude == null) return;
      const isSelected = selectedInmueble?.id === p.id;
      const el = createPricePin(p, isSelected);
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        setSelectedInmueble(p);
      });
      const marker = new maplibregl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([p.longitude, p.latitude])
        .addTo(map);
      propMarkersRef.current.push(marker);
    });

    return () => clearPropMarkers(propMarkersRef);
  }, [polygonProperties, drawMode, selectedInmueble]);

  return {
    containerRef,
    map: mapInstance,
    hasDrawLayer,
    loading,
    mapReady,
    drawArmed,
    selectedInmueble,
    setSelectedInmueble,
    doRefresh,
    doDeletePolygon,
    doStartDrawing,
  };
}

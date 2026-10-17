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
import { setupGeoman, handleStartDrawing, restaurarPoligono } from "./geoman";
import { setupInteractivity } from "./interactivity";

export function useZonaMap({
  selectedZone,
  onSelectZone,
  operation,
  tipoInmueble,
  drawMode,
  onPolygonChange,
  polygonProperties,
  initialPolygon = null,
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
  // Espejos de los filtros de conteo (operation/tipoInmueble llegan por props
  // y el setup imperativo captura el primer render: los handlers leen el
  // valor actual vía getCountFilters).
  const opRef = useRef(operation);
  const tipoRef = useRef(tipoInmueble);
  const drawLayerRef = useRef(null);
  const geomanSetupRef = useRef(false);
  const gmRef = useRef(null);
  const propMarkersRef = useRef([]);
  const closeMarkerRef = useRef(null);
  // Polígono inicial restaurado una sola vez (persistencia localStorage).
  const restauradoRef = useRef(false);
  const initialPolygonRef = useRef(initialPolygon);
  useEffect(() => {
    initialPolygonRef.current = initialPolygon;
  }, [initialPolygon]);

  const [loading, setLoading] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [hovCode, setHovCode] = useState(null);
  const [selectedInmueble, setSelectedInmueble] = useState(null);
  const [drawArmed, setDrawArmed] = useState(false);
  // Espejo en estado del drawLayerRef imperativo (para render condicional).
  // Se sincroniza en cada punto que muta el ref (ver abajo).
  const [hasDrawLayer, setHasDrawLayer] = useState(false);
  // Tick para re-pintar marcadores cuando el estilo termina de cargar
  // después de que los datos ya llegaron (carrera restore vs style).
  const [styleTick, setStyleTick] = useState(0);

  // Mirrors para los handlers imperativos del mapa (eventos maplibre/geoman
  // fuera del ciclo React). Se sincronizan tras cada render.
  useEffect(() => {
    selRef.current = selectedZone;
    drawModeRef.current = drawMode;
    opRef.current = operation;
    tipoRef.current = tipoInmueble;
  });

  // onPolygonChange cambia de identidad en cada render de la página (no es
  // useCallback). Los setups imperativos (geoman, restauración) capturan la
  // primera versión y el restore llamaría a un closure obsoleto: por eso los
  // anuncios del polígono restaurado no se cargaban. Espejo estable:
  const onPolygonChangeRef = useRef(onPolygonChange);
  useEffect(() => {
    onPolygonChangeRef.current = onPolygonChange;
  });
  const emitPolygonChange = (geojson) => {
    onPolygonChangeRef.current?.(geojson);
  };

  const doRefresh = (hov) => {
    // No repintar capas de selección en modo dibujo: cierra la carrera de
    // fetches de municipios/barrios que queden en vuelo al cambiar de modo.
    if (drawModeRef.current) return;
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
      onPolygonChange: emitPolygonChange,
    });

  const doStartDrawing = () => handleStartDrawing(gmRef, setDrawArmed);

  // Cancela el trazo en curso (línea a medio dibujar): desarma Geoman sin
  // borrar nada (no hay polígono todavía) y vuelve al estado "Dibujar tu zona".
  const doCancelDrawing = () => {
    try {
      gmRef.current?.disableDraw();
    } catch {}
    setDrawArmed(false);
  };

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
      // Si los datos llegaron antes que el estilo, este tick hace que el
      // efecto de marcadores se repita y los pinte.
      setStyleTick((t) => t + 1);
      setupInteractivity(map, {
        selRef,
        drawModeRef,
        rawRefs,
        operation,
        tipoInmueble,
        onSelectZone,
        getCountFilters: () => ({
          operation: opRef.current,
          inmueble: tipoRef.current,
        }),
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
      // Reset total al entrar a dibujo (simetría con salir de dibujo):
      // capas, subdivisiones cargadas, marcadores, popup y hover.
      // El zoom se conserva donde estaba el cliente.
      removeSelectLayers(map);
      clearDrawLayers(map);
      mpioRawRef.current = null;
      barrioRawRef.current = null;
      clearPropMarkers(propMarkersRef);
      if (popupRef.current) {
        popupRef.current.remove();
        popupRef.current = null;
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHovCode(null);

      loadDrawBoundaries(map, setLoading);

      // Reset imperativo del modo dibujo (Geoman es imperativo; no hay evento
      // previo donde hacerlo porque drawMode llega por props).
      setDrawArmed(false);

      if (!gmRef.current) {
        setupGeoman(map, {
          geomanSetupRef,
          gmRef,
          drawLayerRef,
          closeMarkerRef,
          setDrawArmed,
          setHasDrawLayer,
          onPolygonChange: emitPolygonChange,
          onDeletePolygon: doDeletePolygon,
        });
      }

      // Restaurar el dibujo guardado (una sola vez por montaje).
      // Geoman tarda en estar listo (gm:loaded): se reintenta hasta 8s.
      if (!restauradoRef.current && initialPolygonRef.current) {
        restauradoRef.current = true;
        const pendiente = initialPolygonRef.current;
        initialPolygonRef.current = null;
        let intentos = 0;
        const intentar = () => {
          if (!mapRef.current) return;
          if (gmRef.current) {
            restaurarPoligono(mapRef.current, {
              gmRef,
              drawLayerRef,
              closeMarkerRef,
              setDrawArmed,
              setHasDrawLayer,
              onPolygonChange: emitPolygonChange,
              onDeletePolygon: doDeletePolygon,
            }, pendiente);
            return;
          }
          if (++intentos < 16) setTimeout(intentar, 500);
        };
        setTimeout(intentar, 500);
      }

      // zoom listener para cargar barrios dinámicamente
      const onZoom = () => {
        const z = map.getZoom();
        if (z >= 10.5) {
          // La capa puede no existir aún (estilo sin cargar del todo):
          // sin guardia, queryRenderedFeatures lanza y rompe el handler.
          const features = map.getLayer("mpio-draw-line")
            ? map.queryRenderedFeatures(undefined, {
                layers: ["mpio-draw-line"],
              })
            : [];
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

  // ──── reintentar marcadores cuando el estilo termine de cargar ────
  // Si los datos llegaron antes que el estilo (restore), el efecto de
  // marcadores sale temprano y nada lo repetía. Este efecto espera al
  // primer `idle` (estilo + tiles asentados) y dispara la repetición.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    if (map.isStyleLoaded()) return;
    let vivo = true;
    const avisar = () => {
      if (vivo) setStyleTick((t) => t + 1);
    };
    map.once("idle", avisar);
    return () => {
      vivo = false;
      try {
        map.off("idle", avisar);
      } catch {}
    };
  }, [mapReady, styleTick, polygonProperties]);
  // OJO: depende también de mapReady. Al restaurar un dibujo guardado, el
  // fetch puede resolverse ANTES de que el estilo cargue: sin mapReady en
  // deps, el efecto salía temprano por !isStyleLoaded() y no se repetía
  // (las chinchetas nunca aparecían aunque el conteo sí llegaba).
  useEffect(() => {
    const map = mapRef.current;
    clearPropMarkers(propMarkersRef);
    const listo =
      map &&
      mapReady &&
      map.isStyleLoaded() &&
      drawMode &&
      (polygonProperties?.length ?? 0) > 0;
    console.log(
      `[Zona] pines: props=${polygonProperties?.length ?? 0} draw=${drawMode} ready=${mapReady} style=${map?.isStyleLoaded?.()} pinta=${!!listo}`,
    );
    if (!listo) {
      return;
    }

    polygonProperties.forEach((p) => {
      try {
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
      } catch (e) {
        console.warn("[Zona] pin ignorado (dato inválido):", p?.id, e?.message);
      }
    });

    return () => clearPropMarkers(propMarkersRef);
  }, [polygonProperties, drawMode, selectedInmueble, mapReady, styleTick]);

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
    doCancelDrawing,
  };
}

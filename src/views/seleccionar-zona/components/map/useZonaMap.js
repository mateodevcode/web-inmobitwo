import { useState, useRef, useEffect } from "react";
import { apiBackend } from "@/actions/apiBackend.js";
import { fetchRegionsGeoJSON, fetchStatesGeoJSON } from "@/lib/geoApi";
import { findFeature, featBounds, collectionBounds } from "@/lib/geoUtils";
import { createOsmMap, zoomToBounds } from "@/components/map/mapUtils";
import { marcarVisto } from "@/components/map/vistos";
import { CapaChinchetas } from "@/views/mapa-inmuebles/components/map/markers";
import {
  prepararDatos,
  itemsParaVista,
  zoomAlAbrirGrupo,
} from "@/views/mapa-inmuebles/components/map/datosMapa";
import { estadoMapa } from "../../lib/zonasSeleccion";
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
import { removeCloseMarker, handleDeletePolygon } from "./polygon";
import { setupGeoman, handleStartDrawing, restaurarPoligono } from "./geoman";
import { setupInteractivity } from "./interactivity";

const bboxDeMapa = (map) => {
  const b = map.getBounds();
  return { minLng: b.getWest(), minLat: b.getSouth(), maxLng: b.getEast(), maxLat: b.getNorth() };
};

export function useZonaMap({
  zonas,
  onToggleZona,
  zonaFoco,
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

  const zonasRef = useRef(zonas);
  const drawModeRef = useRef(false);
  // Espejos de los filtros de conteo (el setup imperativo captura el primer
  // render: los handlers leen el valor actual vía getCountFilters).
  const opRef = useRef(operation);
  const tipoRef = useRef(tipoInmueble);
  const onToggleRef = useRef(onToggleZona);
  const drawLayerRef = useRef(null);
  const geomanSetupRef = useRef(false);
  const gmRef = useRef(null);
  const capaPinesRef = useRef(null);
  const datosPinesRef = useRef(null);
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
  const [selectedInmueble, setSelectedInmueble] = useState(null);
  const [drawArmed, setDrawArmed] = useState(false);
  // Espejo en estado del drawLayerRef imperativo (para render condicional).
  const [hasDrawLayer, setHasDrawLayer] = useState(false);

  // Mirrors para los handlers imperativos del mapa (eventos maplibre/geoman
  // fuera del ciclo React). Se sincronizan tras cada render.
  useEffect(() => {
    zonasRef.current = zonas;
    drawModeRef.current = drawMode;
    opRef.current = operation;
    tipoRef.current = tipoInmueble;
    onToggleRef.current = onToggleZona;
  });

  // onPolygonChange cambia de identidad en cada render de la página: los
  // setups imperativos (geoman, restauración) usan este espejo estable.
  const onPolygonChangeRef = useRef(onPolygonChange);
  useEffect(() => {
    onPolygonChangeRef.current = onPolygonChange;
  });
  const emitPolygonChange = (geojson) => {
    onPolygonChangeRef.current?.(geojson);
  };

  const doRefresh = () => {
    // No repintar capas de selección en modo dibujo: cierra la carrera de
    // fetches de municipios/barrios que queden en vuelo al cambiar de modo.
    if (drawModeRef.current) return;
    refreshLayers(mapRef.current, rawRefs, estadoMapa(zonasRef.current || []));
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

  const cargarLimitesBase = (map) => {
    setLoading(true);
    return fetchRegionsGeoJSON()
      .then((regData) => {
        regionRawRef.current = regData;
        doRefresh();
        return fetchStatesGeoJSON();
      })
      .then((data) => {
        dptoRawRef.current = data;
        doRefresh();
        // Encuadre inicial solo si no hay zonas: con zonas restauradas el
        // efecto de foco ya llevó el mapa a ellas.
        if (!zonasRef.current?.length) {
          const b = collectionBounds(data);
          if (b) map.fitBounds(b, { padding: 10, duration: 0 });
        }
      })
      .catch((e) => console.error("[Zona] error cargando datos:", e))
      .finally(() => setLoading(false));
  };

  // Chinchetas de los anuncios dentro del polígono dibujado (agrupadas).
  const pintarPines = () => {
    const map = mapRef.current;
    if (!map || !capaPinesRef.current) return;
    const { items } = itemsParaVista(datosPinesRef.current, bboxDeMapa(map), map.getZoom());
    capaPinesRef.current.render(items);
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

    capaPinesRef.current = new CapaChinchetas(map, {
      onClickPunto: (p) => {
        marcarVisto(p.id);
        capaPinesRef.current?.seleccionar(p.id);
        setSelectedInmueble(p);
      },
      onClickGrupo: (item) =>
        map.flyTo({
          center: [item.lng, item.lat],
          zoom: zoomAlAbrirGrupo(datosPinesRef.current, item, map.getZoom()),
          duration: 600,
        }),
    });
    map.on("moveend", pintarPines);

    map.on("load", () => {
      setMapReady(true);
      setMapInstance(map);
      setupInteractivity(map, {
        zonasRef,
        drawModeRef,
        rawRefs,
        onToggleZona: (z) => onToggleRef.current?.(z),
        getCountFilters: () => ({
          operation: opRef.current,
          inmueble: tipoRef.current,
        }),
        popupRef,
        doLoadMunicipios,
        doLoadBarrios,
      });

      if (!drawModeRef.current) cargarLimitesBase(map);
    });

    map.on("error", (e) => console.error("[Zona] error mapa:", e.error || e));

    return () => {
      capaPinesRef.current?.destruir();
      capaPinesRef.current = null;
      map.remove();
      mapRef.current = null;
      setMapInstance(null);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ──── repintar al cambiar la selección (solo feature-state, sin setData) ────
  useEffect(() => {
    if (!mapReady) return;
    doRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zonas, mapReady]);

  // ──── llevar el mapa a una zona pedida desde fuera (buscador, restaurar) ────
  useEffect(() => {
    const map = mapRef.current;
    const zona = zonaFoco?.zona;
    if (!mapReady || !map || !zona) return;

    let vivo = true;
    // La card del hover de la zona anterior no debe quedarse pegada.
    if (popupRef.current) {
      popupRef.current.remove();
      popupRef.current = null;
    }

    const buscarPoligono = () => {
      if (zona.type === "region") return findFeature(regionRawRef.current, "slug", zona.slug);
      if (zona.type === "departamento")
        return findFeature(dptoRawRef.current, "DPTO_CCDGO", zona.daneCode);
      if (zona.type === "municipio")
        return findFeature(mpioRawRef.current, "MPIO_CCNCT", zona.daneCode);
      if (zona.type === "barrio") return findFeature(barrioRawRef.current, "BAR_COD", zona.daneCode);
      return null;
    };

    // Último recurso (polígono no disponible): geocodificar el nombre.
    const volarPorNombre = () =>
      apiBackend(`/api/geocode?address=${encodeURIComponent(`${zona.name}, Colombia`)}`, "GET")
        .then((res) => {
          if (!vivo || !res.success || !res.data) return;
          const zoomLevel =
            zona.type === "region" ? 7 : zona.type === "departamento" ? 9 : zona.type === "barrio" ? 15 : 12;
          map.flyTo({ center: [res.data.longitude, res.data.latitude], zoom: zoomLevel, duration: 1200 });
        })
        .catch((e) => console.error("[Zona] error geocodificando zona:", e));

    const encuadrar = () => {
      if (!vivo) return;
      const feat = buscarPoligono();
      if (feat) zoomToBounds(map, featBounds(feat), zona.type === "barrio" ? 60 : 40);
      else volarPorNombre();
    };

    // Mostrar el siguiente nivel para seguir eligiendo alrededor. Para un
    // municipio, primero sus vecinos del departamento (caché): así se
    // encuadra su polígono exacto sin depender del geocodificador.
    if (zona.type === "departamento" && zona.daneCode) doLoadMunicipios(zona.daneCode);
    if (zona.type === "municipio" && zona.daneCode && zona.dptoDaneCode && !buscarPoligono()) {
      doLoadMunicipios(zona.dptoDaneCode).then(() => {
        encuadrar();
        if (vivo) doLoadBarrios(zona.daneCode, zona.dptoDaneCode);
      });
    } else {
      if (zona.type === "municipio" && zona.daneCode) doLoadBarrios(zona.daneCode, zona.dptoDaneCode);
      encuadrar();
    }
    return () => {
      vivo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zonaFoco, mapReady]);

  // ──── efecto: reaccionar a cambios de drawMode ────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded() || !mapReady) return;

    if (drawMode) {
      // Reset total al entrar a dibujo: capas, subdivisiones cargadas,
      // popup y hover. El zoom se conserva donde estaba el cliente.
      removeSelectLayers(map);
      clearDrawLayers(map);
      mpioRawRef.current = null;
      barrioRawRef.current = null;
      if (popupRef.current) {
        popupRef.current.remove();
        popupRef.current = null;
      }

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
            maybeLoadDrawBarrios(map, f.properties.DPTO_CCDGO, f.properties.MPIO_CCNCT);
          } else {
            maybeLoadDrawBarrios(map, "11", "11001");
          }
        } else {
          sourceOff(map, "barrio");
        }
      };
      map.on("zoomend", onZoom);
      onZoom();

      return () => map.off("zoomend", onZoom);
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
        cargarLimitesBase(map);
      } else {
        doRefresh();
      }
    }
  }, [drawMode, mapReady]); // eslint-disable-line react-hooks/exhaustive-deps

  // ──── chinchetas del polígono dibujado ────
  // Índice agrupado una vez por resultado; al mover el mapa solo se
  // reconcilian las chinchetas visibles (moveend → pintarPines).
  useEffect(() => {
    const puntos =
      drawMode && polygonProperties?.length
        ? polygonProperties
            .filter((p) => p.longitude != null && p.latitude != null)
            .map((p) => ({ ...p, lat: Number(p.latitude), lng: Number(p.longitude) }))
        : [];
    datosPinesRef.current = puntos.length
      ? prepararDatos({ modo: "puntos", puntos }, { bbox: null, zoom: 0, filtrosKey: "" })
      : null;
    if (mapReady) pintarPines();
  }, [polygonProperties, drawMode, mapReady]);

  const cerrarInmueble = () => {
    capaPinesRef.current?.seleccionar(null);
    setSelectedInmueble(null);
  };

  return {
    containerRef,
    map: mapInstance,
    hasDrawLayer,
    loading,
    mapReady,
    drawArmed,
    selectedInmueble,
    setSelectedInmueble: (v) => (v ? setSelectedInmueble(v) : cerrarInmueble()),
    doRefresh,
    doDeletePolygon,
    doStartDrawing,
    doCancelDrawing,
  };
}

import { useState, useRef, useEffect, useCallback } from "react";
import { fetchMapaInmuebles, fetchPropiedadResumen } from "@/lib/geoApi";
import { apiBackend } from "@/actions/apiBackend.js";
import { useSelectZona } from "@/hooks/useSelectZona";
import { createOsmMap } from "@/components/map/mapUtils";
import { pintarMiUbicacion } from "@/components/map/MapControls";
import { marcarVisto } from "@/components/map/vistos";
import { CapaChinchetas } from "./markers";
import { renderBoundary } from "./boundary";
import {
  expandirBbox,
  necesitaPedir,
  prepararDatos,
  itemsParaVista,
  zoomAlAbrirGrupo,
} from "./datosMapa";

// Espera tras dejar de mover el mapa antes de pedir datos nuevos (solo si la
// vista sale del área ya cargada; si no, se repinta sin red).
const DEBOUNCE_MS = 250;

function slugify(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const bboxDeMapa = (map) => {
  const b = map.getBounds();
  return {
    minLng: b.getWest(),
    minLat: b.getSouth(),
    maxLng: b.getEast(),
    maxLat: b.getNorth(),
  };
};

export function useMapaInmuebles({ lat, lng, zoom, operation, tipoInmueble, boundary, autoMarcarUbicacion = false }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const capaRef = useRef(null);
  const datosRef = useRef(null);
  const debounceRef = useRef(null);
  const peticionRef = useRef(0);
  const enVueloRef = useRef(null); // área/filtros de la petición en curso
  const opRef = useRef(operation);
  const tipoRef = useRef(tipoInmueble);
  const loadedRef = useRef(false);

  const [loading, setLoading] = useState(false);
  const [totalVisible, setTotalVisible] = useState(null);
  const [selectedInmueble, setSelectedInmueble] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    opRef.current = operation;
    tipoRef.current = tipoInmueble;
  }, [operation, tipoInmueble]);

  const filtrosKey = () => `${opRef.current || ""}|${tipoRef.current || ""}`;

  // Pinta lo que hay en caché para la vista actual (sin red).
  const pintar = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map || !capaRef.current) return;
    const { items, totalVisible: total } = itemsParaVista(
      datosRef.current,
      bboxDeMapa(map),
      map.getZoom(),
    );
    capaRef.current.render(items);
    if (datosRef.current) setTotalVisible(total);
  }, []);

  // Pide al backend solo si la vista no está cubierta por lo ya cargado.
  const cargarSiHaceFalta = useCallback(async () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const vista = bboxDeMapa(map);
    const zoomActual = map.getZoom();
    const key = filtrosKey();
    if (!necesitaPedir(datosRef.current, vista, zoomActual, key)) return;
    // Ya hay una petición en vuelo que servirá para esta vista (p. ej. la
    // carga inicial y el efecto de filtros a la vez): no duplicarla.
    if (!necesitaPedir(enVueloRef.current, vista, zoomActual, key)) return;

    const idPeticion = ++peticionRef.current;
    const bbox = expandirBbox(vista);
    enVueloRef.current = {
      bbox,
      zoom: Math.floor(zoomActual),
      filtrosKey: key,
      modo: zoomActual >= 15 ? "puntos" : "grupos", // conservador hasta saberlo
    };
    setLoading(true);
    try {
      const respuesta = await fetchMapaInmuebles({
        ...bbox,
        zoom: zoomActual,
        operation: opRef.current,
        tipoInmueble: tipoRef.current,
      });
      if (idPeticion !== peticionRef.current) return; // llegó una más nueva
      datosRef.current = prepararDatos(respuesta, { bbox, zoom: zoomActual, filtrosKey: key });
      pintar();
    } catch (e) {
      if (idPeticion === peticionRef.current) {
        console.error("[MapaInmuebles] Error cargando inmuebles:", e);
      }
    } finally {
      if (idPeticion === peticionRef.current) {
        enVueloRef.current = null;
        setLoading(false);
      }
    }
  }, [pintar]);

  const abrirInmueble = useCallback((punto) => {
    marcarVisto(punto.id);
    capaRef.current?.seleccionar(punto.id);
    // La card aparece con los datos completos (resumen cacheado por id).
    fetchPropiedadResumen(punto.id).then((resumen) => {
      if (capaRef.current?.seleccionadoId !== punto.id) return; // eligió otro
      setSelectedInmueble({
        ...(resumen || {}),
        ...punto,
        precio: punto.precio ?? resumen?.precio,
        operacion_slug: punto.op || resumen?.operacion_slug,
      });
    });
  }, []);

  const cerrarInmueble = useCallback(() => {
    capaRef.current?.seleccionar(null);
    setSelectedInmueble(null);
  }, []);

  // 1. Crear mapa (debe ir PRIMERO)
  useEffect(() => {
    if (mapInstanceRef.current) return;

    const map = createOsmMap(mapContainerRef.current, {
      center: [lng || -74.1, lat || 4.6],
      zoom: zoom || 11,
    });
    mapInstanceRef.current = map;

    const capa = new CapaChinchetas(map, {
      onClickPunto: abrirInmueble,
      onClickGrupo: (item) => {
        map.flyTo({
          center: [item.lng, item.lat],
          zoom: zoomAlAbrirGrupo(datosRef.current, item, map.getZoom()),
          duration: 600,
        });
      },
    });
    capaRef.current = capa;

    const onMoveEnd = () => {
      pintar();
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(cargarSiHaceFalta, DEBOUNCE_MS);
    };
    // Clic en el mapa vacío: cierra la card.
    const onClickMapa = () => cerrarInmueble();

    const tryInit = () => {
      if (map !== mapInstanceRef.current) return; // mapa destruido por StrictMode
      if (loadedRef.current) return;
      if (!map.isStyleLoaded()) return;
      loadedRef.current = true;
      setMapReady(true);
      setMapInstance(map);

      // Entrada desde el hero con coords propias: pintar el punto azul de
      // una vez (el centro ya es la ubicación del usuario).
      if (autoMarcarUbicacion && lat && lng) {
        pintarMiUbicacion(map, [Number(lng), Number(lat)]);
      }

      map.on("moveend", onMoveEnd);
      map.on("click", onClickMapa);
      cargarSiHaceFalta();
    };

    map.on("load", tryInit); // camino normal
    map.on("idle", tryInit); // fallback si load tarda

    return () => {
      clearTimeout(debounceRef.current);
      // Contador, no un nodo: incrementarlo descarta las respuestas en vuelo.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      peticionRef.current++;
      enVueloRef.current = null;
      loadedRef.current = false;
      capa.destruir();
      capaRef.current = null;
      datosRef.current = null;
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 2. Cambio de filtros (operación/tipo): recargar sin recrear el mapa.
  useEffect(() => {
    if (!mapReady) return;
    cargarSiHaceFalta();
  }, [operation, tipoInmueble, mapReady, cargarSiHaceFalta]);

  // 3. Renderizar borde de zona (region/depto/ciudad)
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
    totalVisible,
    selectedInmueble,
    setSelectedInmueble: (v) => (v ? setSelectedInmueble(v) : cerrarInmueble()),
    flyToZone,
  };
}

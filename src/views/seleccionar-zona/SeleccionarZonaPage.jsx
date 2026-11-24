// views/seleccionar-zona/SeleccionarZonaPage.jsx
// MAPA PRINCIPAL: un solo mapa con dos modos de uso —
//   1) "seleccionar" (default): elegir zona/depto/ciudad sobre el mapa.
//   2) "dibujar" (?draw=true): polígono a mano con geoman → zona personalizada.
// Cuando el usuario diga "mapa principal", se refiere a este componente.
//
// Selección múltiple: se pueden marcar varias zonas (clic = añadir/quitar,
// lo más concreto gana: ver lib/zonasSeleccion.js). Con una sola zona se va
// a su URL de siempre; con varias, a /[op-tipo]/zonas?z=... .
//
// Persistencia: la "zona activa" (último dibujo o última selección) se
// guarda en localStorage (lib/zonaPersistente.js) y se precarga al volver
// (atrás desde la ficha, "Seleccionar en Mapa", recarga). Se borra al
// borrar el polígono, al limpiar la zona o al armar una nueva.
import { useEffect, useState, useRef } from "react";
import { useSeleccionZonas } from "./hooks/useSeleccionZonas";
import { useEnCliente } from "@/hooks/useEnCliente";
import { zonasAParam, resumenZonas } from "./lib/zonasSeleccion";
import { buildSearchUrl } from "./utils/urlBuilder";
import SelectZonaMap from "./components/map/SelectZonaMap";
import BarraNavegacionTauri from "@/components/barra-navegacion/BarraNavegacionTauri";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { ZonaPageHeader } from "./components/header/ZonaPageHeader";
import { SelectedZoneCard } from "./components/header/SelectedZoneCard";
import { useDeptNames } from "./hooks/useDeptNames";
import { usePolygonSearch } from "./hooks/usePolygonSearch";
import {
  leerZonaGuardada,
  guardarZona,
  limpiarZonaGuardada,
  esZonaCompatible,
} from "./lib/zonaPersistente";

function parseOperationAndType(raw) {
  if (!raw) return { operation: "venta", tipoInmueble: "viviendas" };
  // Primer segmento es la operación, el resto es el tipo (soporta compuestos como "obra-nueva")
  const parts = raw.split("-");
  const operation = parts[0] || "venta";
  const tipoInmueble = parts.slice(1).join("-") || "viviendas";
  return { operation, tipoInmueble };
}

export default function SeleccionarZonaPage() {
  const { operationAndType } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { operation, tipoInmueble } = parseOperationAndType(operationAndType);

  const drawFromUrl = searchParams.get("draw") === "true";

  const deptNames = useDeptNames();
  // Lo restaurado de localStorage solo se pinta tras hidratar (el servidor
  // no lo conoce): si no, React avisa de HTML distinto.
  const enCliente = useEnCliente();
  // Restauración perezosa (sin efecto): si hay zona guardada compatible con
  // la operación+tipo de la URL, el mapa arranca con ella precargada.
  const [zonaRestaurada] = useState(() => {
    if (typeof window === "undefined") return null;
    const guardada = leerZonaGuardada();
    return guardada && esZonaCompatible(guardada, operation, tipoInmueble)
      ? guardada
      : null;
  });
  // Lo guardado antes de la multiselección traía una sola `zone`.
  const [zonasIniciales] = useState(() =>
    zonaRestaurada?.kind === "seleccion" && !drawFromUrl
      ? (zonaRestaurada.zonas ?? (zonaRestaurada.zone ? [zonaRestaurada.zone] : []))
      : [],
  );
  const {
    zonas,
    total: propertyCount,
    cargando: loading,
    alternar,
    agregar,
    quitar,
    limpiar,
  } = useSeleccionZonas({ operation, tipoInmueble, iniciales: zonasIniciales });
  // Zona a la que llevar el mapa (buscador o restauración). Objeto nuevo en
  // cada petición para que el mapa vuelva a enfocar aunque sea la misma.
  const [zonaFoco, setZonaFoco] = useState(() =>
    zonasIniciales.length ? { zona: zonasIniciales[zonasIniciales.length - 1] } : null,
  );

  // Persistencia: cada cambio de la selección se guarda; vacía se borra.
  const zonasParam = zonasAParam(zonas);
  useEffect(() => {
    if (drawMode) return;
    if (zonas.length) {
      guardarZona({ kind: "seleccion", operation, tipoInmueble, zonas });
    } else if (leerZonaGuardada()?.kind === "seleccion") {
      limpiarZonaGuardada();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zonasParam]);

  const clearZone = () => {
    limpiarZonaGuardada();
    limpiar();
  };
  const [drawMode, setDrawMode] = useState(
    () =>
      drawFromUrl ||
      (zonaRestaurada?.kind === "dibujo" && !!zonaRestaurada?.polygon),
  );
  const [initialPolygon] = useState(() =>
    zonaRestaurada?.kind === "dibujo" ? (zonaRestaurada.polygon ?? null) : null,
  );
  // Aviso de "sin resultados" centrado arriba (reemplaza al toast).
  const [avisoSinResultados, setAvisoSinResultados] = useState(null);
  const avisoTimerRef = useRef(null);
  useEffect(() => () => clearTimeout(avisoTimerRef.current), []);
  const {
    customPolygon,
    polygonProps,
    polygonPropCount,
    polygonLoading,
    clearPolygon: clearPolygonBase,
    handlePolygonChange: handlePolygonChangeBase,
  } = usePolygonSearch(operation, tipoInmueble);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Persistencia: guardar el dibujo nuevo y borrar lo guardado al limpiar.
  const clearPolygon = () => {
    limpiarZonaGuardada();
    clearPolygonBase();
  };
  const handlePolygonChange = (geojson) => {
    if (geojson) {
      guardarZona({
        kind: "dibujo",
        operation,
        tipoInmueble,
        polygon: geojson,
      });
    } else {
      // Borrar el polígono (botón borrar, Geoman remove) también limpia
      // lo guardado: si no, al volver reaparecía el dibujo borrado.
      limpiarZonaGuardada();
    }
    handlePolygonChangeBase(geojson);
  };

  const handleToggleDrawMode = (active) => {
    setDrawMode(active);
    if (active) {
      router.replace(`${pathname}?draw=true`);
      clearZone();
    } else {
      router.replace(pathname);
      clearPolygon();
    }
  };

  // Buscador del header: añade la zona (no la quita si ya estaba) y lleva
  // el mapa a ella. Invariante: nunca "zonas" + "modo dibujo" a la vez.
  const handleSelectZone = (zone) => {
    if (!zone) return;
    if (drawMode) {
      handleToggleDrawMode(false);
    }
    agregar(zone);
    setZonaFoco({ zona: zone });
  };

  // Clic en el mapa: marca o desmarca (el mapa ya se encarga del zoom).
  const handleToggleZona = (zone) => {
    if (drawMode) return;
    alternar(zone);
  };

  // Restaurar el modo dibujo guardado al entrar (una sola vez por montaje).
  useEffect(() => {
    if (zonaRestaurada?.kind === "dibujo" && !drawFromUrl) {
      router.replace(`${pathname}?draw=true`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerInmuebles = () => {
    // Sin resultados no se redirige: se muestra el aviso centrado arriba
    // (estilo badges del mapa) y el usuario sigue en el mapa.
    const avisarSinResultados = (sugerencia) => {
      setAvisoSinResultados(
        `Ups, parece que no hemos encontrado ningún anuncio en esta zona. ${sugerencia}`,
      );
      clearTimeout(avisoTimerRef.current);
      avisoTimerRef.current = setTimeout(() => setAvisoSinResultados(null), 4500);
    };

    if (customPolygon) {
      if (polygonPropCount === 0) {
        avisarSinResultados("Prueba dibujar un área más grande.");
        return;
      }
      const polygonKey = `poly_${Date.now()}`;
      try {
        sessionStorage.setItem(polygonKey, JSON.stringify(customPolygon));
        sessionStorage.setItem(`${polygonKey}_op`, operation);
        sessionStorage.setItem(`${polygonKey}_tipo`, tipoInmueble);
      } catch {}
      router.push(
        `/${operation}-${tipoInmueble}/zona-personalizada?polyKey=${polygonKey}`,
      );
      return;
    }

    if (propertyCount === 0) {
      avisarSinResultados("Prueba con otra zona cercana.");
      return;
    }
    // Una zona: su URL de siempre (SEO, breadcrumb). Varias: búsqueda multizona.
    if (zonas.length === 1) {
      const url = buildSearchUrl(
        { ...zonas[0], operation, tipoInmueble },
        deptNames,
      );
      if (url) router.push(url);
      return;
    }
    const params = new URLSearchParams({ z: zonasParam, n: resumenZonas(zonas) });
    router.push(`/${operation}-${tipoInmueble}/zonas?${params.toString()}`);
  };

  return (
    <div className="flex flex-col w-screen h-dvh relative bg-white font-poppins">
      <ZonaPageHeader
        drawMode={drawMode}
        mobileSearchOpen={mobileSearchOpen}
        onOpenMobileSearch={() => setMobileSearchOpen(true)}
        onCloseMobileSearch={() => setMobileSearchOpen(false)}
        onSelectZone={handleSelectZone}
        operation={operation}
        tipoInmueble={tipoInmueble}
        onBack={() => router.back()}
      />

      <div className="flex-1 relative">
        <SelectZonaMap
          zonas={zonas}
          onToggleZona={handleToggleZona}
          zonaFoco={zonaFoco}
          operation={operation}
          tipoInmueble={tipoInmueble}
          drawMode={drawMode}
          onToggleDrawMode={handleToggleDrawMode}
          onPolygonChange={handlePolygonChange}
          polygonProperties={polygonProps}
          polygonPropCount={polygonPropCount}
          polygonLoading={polygonLoading}
          onVerInmuebles={handleVerInmuebles}
          initialPolygon={initialPolygon}
          avisoSinResultados={avisoSinResultados}
          enCliente={enCliente}
        />
      </div>

      <SelectedZoneCard
        drawMode={drawMode}
        zonas={enCliente ? zonas : []}
        propertyCount={propertyCount}
        loading={loading}
        onRemove={quitar}
        onClear={clearZone}
        onVerInmuebles={handleVerInmuebles}
      />

      <BarraNavegacionTauri />
    </div>
  );
}

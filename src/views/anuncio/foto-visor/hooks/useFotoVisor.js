"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import usePropiedades from "@/hooks/usePropiedades";
import { agruparPorOrden } from "@/utils/galeriaUtils";
import {
  MODO_3D,
  MODO_FOTOS,
  MODO_MAPA,
  MODO_PLANOS,
} from "../constants";
import { queryPorModo, resolverModo } from "../lib/modo";
import {
  acotarIndice,
  construirSpecsLinea,
  obtenerCounterText,
  obtenerEtiquetaEspacio,
  parsePosicion1Based,
} from "../lib/formato";

export const useFotoVisor = () => {
  const { id, fotoIndex } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { propiedad: inmueble } = useAppContext();
  const { cargarPropiedad } = usePropiedades();

  const [fullscreen, setFullscreen] = useState(false);

  // cargarPropiedad no está memorizada en el hook: se guarda en ref para no
  // re-disparar el efecto en cada render ni dejar deps incompletas.
  const cargarPropiedadRef = useRef(cargarPropiedad);
  useEffect(() => {
    cargarPropiedadRef.current = cargarPropiedad;
  }, [cargarPropiedad]);

  useEffect(() => {
    if (id) {
      cargarPropiedadRef.current(id);
    }
  }, [id]);

  const modo = useMemo(() => resolverModo(searchParams), [searchParams]);

  const galeriaFilas = inmueble?.galeria;
  const planosFilas = inmueble?.planos;
  const latitud = inmueble?.latitude;
  const longitud = inmueble?.longitude;

  const fotosAgrupadas = useMemo(
    () => agruparPorOrden(galeriaFilas),
    [galeriaFilas],
  );
  const planosAgrupados = useMemo(
    () => agruparPorOrden(planosFilas),
    [planosFilas],
  );

  const totalImagenes = fotosAgrupadas.length;
  const totalPlanos = planosAgrupados.length;
  const tieneMapa = Boolean(latitud && longitud);
  const tiene3d = Boolean(inmueble?.video_3d);

  const modosDisponibles = useMemo(() => {
    const modos = [];
    if (totalImagenes > 0) modos.push(MODO_FOTOS);
    if (totalPlanos > 0) modos.push(MODO_PLANOS);
    if (tiene3d) modos.push(MODO_3D);
    if (tieneMapa) modos.push(MODO_MAPA);
    return modos;
  }, [totalImagenes, totalPlanos, tiene3d, tieneMapa]);

  const posicionBase = parsePosicion1Based(fotoIndex);
  const indexActual = acotarIndice(posicionBase - 1, totalImagenes);
  const indexPlanos = acotarIndice(posicionBase - 1, totalPlanos);

  const specsLinea = useMemo(() => construirSpecsLinea(inmueble), [inmueble]);
  const fotoActual = fotosAgrupadas[indexActual] ?? null;
  const nombreEspacio = useMemo(
    () => obtenerEtiquetaEspacio(galeriaFilas, fotoActual, indexActual),
    [galeriaFilas, fotoActual, indexActual],
  );
  const counterText = obtenerCounterText(
    modo,
    indexActual,
    totalImagenes,
    indexPlanos,
    totalPlanos,
  );

  // Secuencia lineal única: fotos → planos → 3D → mapa (solo los que existen).
  const totalPasos =
    totalImagenes + totalPlanos + (tiene3d ? 1 : 0) + (tieneMapa ? 1 : 0);
  const mostrarFlechas = totalPasos > 1;

  const irA = useCallback(
    (nuevoModo, posicion1Based) => {
      router.replace(
        `/inmueble/${id}/foto/${posicion1Based}${queryPorModo(nuevoModo)}`,
      );
    },
    [router, id],
  );

  const irAModo = useCallback(
    (nuevoModo) => {
      // Al cambiar de pestaña se empieza en la posición 1 de ese modo,
      // salvo mapa que conserva la foto actual como referencia.
      if (nuevoModo === MODO_MAPA) {
        irA(MODO_MAPA, indexActual + 1);
      } else {
        irA(nuevoModo, 1);
      }
    },
    [irA, indexActual],
  );

  const handleNavegar = useCallback(
    (direccion) => {
      // Al acabarse un modo se entra al siguiente; al retroceder del primero
      // se va al último del anterior. Al final hay wrap.
      if (modosDisponibles.length === 0) return;
      const totalDe = (m) =>
        m === MODO_FOTOS ? totalImagenes : m === MODO_PLANOS ? totalPlanos : 1;
      const posDe = (m) =>
        m === MODO_FOTOS ? indexActual : m === MODO_PLANOS ? indexPlanos : 0;
      const actual = modosDisponibles.includes(modo)
        ? modo
        : modosDisponibles[0];
      const total = totalDe(actual);

      if (total > 1) {
        const pos = posDe(actual) + direccion;
        if (pos >= 0 && pos < total) {
          irA(actual, pos + 1);
          return;
        }
      }
      const idx = modosDisponibles.indexOf(actual);
      const len = modosDisponibles.length;
      const vecino = modosDisponibles[(((idx + direccion) % len) + len) % len];
      irA(vecino, direccion > 0 ? 1 : totalDe(vecino));
    },
    [
      modosDisponibles,
      modo,
      totalImagenes,
      totalPlanos,
      indexActual,
      indexPlanos,
      irA,
    ],
  );

  const cerrar = useCallback(() => {
    router.back();
  }, [router]);

  const salirFullscreen = useCallback(() => {
    setFullscreen(false);
  }, []);

  const handleContactar = useCallback(() => {
    alert("Contactar");
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        handleNavegar(1);
        return;
      }
      if (e.key === "ArrowLeft") {
        handleNavegar(-1);
        return;
      }
      if (e.key === "Escape") {
        if (fullscreen) setFullscreen(false);
        else cerrar();
        return;
      }
      if (e.key === "F11" && fullscreen) {
        e.preventDefault();
        setFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNavegar, cerrar, fullscreen]);

  return {
    inmueble,
    modo,
    fotoActual,
    nombreEspacio,
    planosAgrupados,
    indexPlanos,
    totalImagenes,
    totalPlanos,
    tieneMapa,
    tiene3d,
    latitud,
    longitud,
    specsLinea,
    counterText,
    mostrarFlechas,
    fullscreen,
    setFullscreen,
    irAModo,
    handleNavegar,
    cerrar,
    salirFullscreen,
    handleContactar,
  };
};

import { useCallback, useEffect, useRef, useState } from "react";
import { agruparPorOrden } from "@/utils/galeriaUtils";
import { fetchPropiedadResumen } from "@/lib/geoApi";

const AUTOPLAY_SECONDS = 10;

export function useGallery(inmueble) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [extra, setExtra] = useState(null);
  const autoTimerRef = useRef(null);

  const galeria = inmueble?.galeria || [];
  const planos = inmueble?.planos || [];

  // Una "foto" = filas con el mismo orden (5 tamaños). La portada (orden -1)
  // ya viene dentro de galeria y queda primera.
  const fotos = [
    ...agruparPorOrden(galeria),
    ...agruparPorOrden(planos),
  ].filter((f) => f.tamaños && Object.keys(f.tamaños).length > 0);
  const totalImagenes = fotos.length;

  const goTo = useCallback(
    (index) => {
      setCurrentIndex((index + totalImagenes) % totalImagenes);
    },
    [totalImagenes],
  );

  const resetAutoPlay = useCallback(() => {
    clearTimeout(autoTimerRef.current);
    if (totalImagenes <= 1) return;
    autoTimerRef.current = setTimeout(() => {
      goTo(currentIndex + 1);
    }, AUTOPLAY_SECONDS * 1000);
  }, [currentIndex, goTo, totalImagenes]);

  useEffect(() => {
    resetAutoPlay();
    return () => clearTimeout(autoTimerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    const t = setTimeout(() => {
      setCurrentIndex(0);
      setExtra(null);
    }, 0);
    if (inmueble?.id) {
      fetchPropiedadResumen(inmueble.id).then(setExtra);
    }
    return () => clearTimeout(t);
  }, [inmueble?.id]);

  return {
    fotos,
    totalImagenes,
    currentIndex,
    goTo,
    extra,
    hasPlanos: (extra?.planos_count || 0) > 0,
  };
}

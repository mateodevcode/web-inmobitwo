import { useEffect, useRef, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { useAppContext } from "@/context/AppContext.js";
import usePropiedades from "@/hooks/usePropiedades";
import useTracking from "@/hooks/useTracking";
import useLeads from "@/hooks/useLeads";

export const useAnuncioDetalle = () => {
  const { id } = useParams();
  const pathname = usePathname();
  const segmento = pathname.split("/usuario/mis-anuncios/anuncio/")[1];
  const { propiedad, cargandoGlobal, leads } = useAppContext();
  const { cargarPropiedad } = usePropiedades();
  const { cargarLeads } = useLeads();
  const { dispararEventoYRevisar } = useTracking();
  const [loading, setLoading] = useState(false);
  const tiempoEntrada = useRef(0);

  useEffect(() => {
    tiempoEntrada.current = Date.now();

    // Al desmontar (usuario sale de la página), registra cuánto tiempo estuvo
    return () => {
      const segundos = Math.round((Date.now() - tiempoEntrada.current) / 1000);
      if (segundos >= 5) {
        // ignora vistas de menos de 5 segundos (rebote, no interés real)
        dispararEventoYRevisar(id, "tiempo_en_pagina", { segundos });
      }
    };
  }, [id]);

  useEffect(() => {
    if (segmento) {
      cargarPropiedad(segmento);
      // Para el conteo de mensajes de StatsCard (GET /leads del dueño).
      cargarLeads();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segmento]);

  return { propiedad, cargandoGlobal, loading, setLoading, leads };
};

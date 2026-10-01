import DetallePropiedad from "./anuncio-id/DetallePropiedad";
import { useEffect, useRef, useCallback } from "react";
import usePropiedades from "../../hooks/usePropiedades";
import { useAppContext } from "@/context/AppContext.js";
import useTracking from "@/hooks/useTracking";
import NavbarHome from "@/components/header-home/NavbarHome";
import SmartLoader from "@/components/loader/SmartLoader";
import BarraNavegacionTauri from "../../components/barra-navegacion/BarraNavegacionTauri";
import { useParams, useRouter } from "next/navigation";
import { readNavState, saveNavState } from "@/lib/navState.js";

const PageAnuncio = () => {
  const { id } = useParams();
  const { cargarPropiedad } = usePropiedades();
  const { propiedad } = useAppContext();
  const router = useRouter();
  const { dispararEventoYRevisar } = useTracking();

  const idVistaRegistradaRef = useRef(null);

  const navState = readNavState();
  const { listaIds, posicion, total, filtroLabel, searchUrl } = navState;

  const onNavigateTo = useCallback(
    (direccion) => {
      if (!listaIds || listaIds.length === 0) return;
      const nuevoIndex = posicion + (direccion === "siguiente" ? 1 : -1);
      if (nuevoIndex < 0 || nuevoIndex >= listaIds.length) return;
      saveNavState({ listaIds, posicion: nuevoIndex, total, filtroLabel });
      router.replace(`/inmueble/${listaIds[nuevoIndex]}`);
    },
    [listaIds, posicion, total, filtroLabel, router],
  );

  useEffect(() => {
    const entrada = Date.now();

    return () => {
      const segundos = Math.round((Date.now() - entrada) / 1000);
      if (segundos >= 5) {
        dispararEventoYRevisar(id, "tiempo_en_pagina", { segundos });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (id && idVistaRegistradaRef.current !== id) {
      dispararEventoYRevisar(id, "vista_propiedad");
      idVistaRegistradaRef.current = id;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (id) {
      cargarPropiedad(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const listo = String(propiedad?.id) === String(id);

  return (
    <div className="relative">
      <NavbarHome />
      {listo ? (
        <DetallePropiedad
          inmueble={propiedad}
          onClose={() => {
            if (searchUrl) {
              router.push(searchUrl);
            } else {
              router.back();
            }
          }}
          listaIds={listaIds}
          posicion={posicion}
          total={total}
          filtroLabel={filtroLabel}
          onNavigateTo={onNavigateTo}
        />
      ) : (
        <SmartLoader delay={200} label="Cargando inmueble..." />
      )}

      <BarraNavegacionTauri />
    </div>
  );
};

export default PageAnuncio;

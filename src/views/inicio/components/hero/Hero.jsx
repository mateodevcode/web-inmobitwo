"use client";

import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/AppContext.js";
import AnimatedTitle from "./AnimatedTitle";
import HeroTabs from "./HeroTabs";
import HeroSearchButton from "./HeroSearchButton";
import SelectorTipo from "./type/SelectorTipo";
import InputSearchPrincipal from "./search/InputSearchPrincipal";
import { useResponsiveFrases } from "../../hooks/useResponsiveFrases";
import { FRASES } from "@/data/inicio/frases.hero";
import { buildGeoPath } from "../../lib/geoPath";
import { URL_BACKEND, URL_CRM } from "@/config/config";

// Sin destacado del superadmin: fondo en blanco hasta que cargue la imagen.
const Hero = ({
  image,
  propertyLabel,
  propertyUrl,
  tab,
  setTab,
  tipo,
  setTipo,
}) => {
  const router = useRouter();
  const { esSuperAdmin, authListo } = useContext(AppContext) ?? {};
  const [destacado, setDestacado] = useState(null);

  // Anuncio destacado por el superadmin (GET /portada público).
  useEffect(() => {
    let vivo = true;
    fetch(`${URL_BACKEND}/portada`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (vivo && j?.success && j.data) setDestacado(j.data);
      })
      .catch(() => {});
    return () => {
      vivo = false;
    };
  }, []);

  const imagenFinal = image ?? destacado?.imagen ?? null;
  const etiquetaFinal = propertyLabel ?? destacado?.etiqueta ?? null;
  const urlFinal = propertyUrl ?? destacado?.url ?? null;
  const [query, setQuery] = useState("");
  const [selectedGeo, setSelectedGeo] = useState(null);
  const frases = useResponsiveFrases();

  useEffect(() => {
    if (!selectedGeo) return;
    const path = buildGeoPath(tab, tipo.slug, selectedGeo);
    if (path) router.push(path);
  }, [selectedGeo]); // eslint-disable-line react-hooks/exhaustive-deps

  const canSearch = selectedGeo && query.trim() !== "";

  const handleManualSearch = () => {
    if (!canSearch) return;
    const path = buildGeoPath(tab, tipo.slug, selectedGeo);
    if (path) router.push(path);
  };

  return (
    <section className="w-full flex justify-center font-montserrat">
      <div className="relative w-12/12 md:w-9/12">
        <div className="group relative w-full h-100 md:h-100 overflow-hidden bg-primero">
          {imagenFinal ? (
            <Image
              src={imagenFinal}
              alt="Interior de una vivienda"
              width={1200}
              height={1200}
              priority
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
          {etiquetaFinal && urlFinal ? (
            <Link
              href={urlFinal}
              className="absolute top-0 right-0 z-10 bg-primero/80 text-decimo text-xs md:text-xs font-medium px-3 py-1.5 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primero hover:underline"
            >
              {etiquetaFinal}
            </Link>
          ) : null}
          {authListo && esSuperAdmin ? (
            <a
              href={`${URL_CRM}/portada`}
              className="absolute bottom-0 right-0 z-10 bg-primero/80 text-decimo text-xs md:text-xs font-medium px-3 py-1.5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primero hover:underline"
            >
              Cambiar portada
            </a>
          ) : null}
        </div>

        <div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-20 md:bottom-1/2 translate-y-1/2 w-[95%] md:w-11/12 max-w-4xl bg-primero px-6 py-6 md:px-10 md:py-8 rounded-sm shadow-xl border border-segundo/20">
          <AnimatedTitle
            key={frases === FRASES.mobile ? "mobile" : "desktop"}
            texts={frases}
            className="text-xl md:text-3xl font-semibold text-quinto text-center md:my-2 my-4 normal-case font-anton"
            wrapperClassName="mb-4 md:mb-5"
          />

          <div className="flex flex-col md:flex-row items-stretch gap-4 flex-wrap">
            <HeroTabs tab={tab} setTab={setTab} setTipo={setTipo} />

            <SelectorTipo tab={tab} value={tipo} onChange={setTipo} />

            <InputSearchPrincipal
              onGeoSelect={setSelectedGeo}
              setQuery={setQuery}
              query={query}
              operation={tab}
              tipo={tipo}
            />

            <HeroSearchButton
              disabled={!canSearch}
              onSearch={handleManualSearch}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

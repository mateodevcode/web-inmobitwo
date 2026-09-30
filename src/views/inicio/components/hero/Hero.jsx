"use client";

import { useState, useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";
import { MAPPING_OPERACIONES } from "@/data/mappings_busqueda";
import { FRASES } from "@/data/inicio/frases.hero";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SelectorTipo from "../modales/SelectorTipo";
import InputSearchPrincipal from "../modales/InputSearchPrincipal";
import Link from "next/link";

const TIPO_DEFAULT = { label: "Casa", slug: "casa" };

const Hero = ({
  image = "/propiedades/chalet.jpg",
  propertyLabel = "Oficina en Alicante / Alacant, Alicante - 399.000 eur",
  propertyUrl = "#",
  tab,
  setTab,
  tipo,
  setTipo,
}) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedGeo, setSelectedGeo] = useState(null);
  const [frases, setFrases] = useState(FRASES.desktop);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setFrases(mq.matches ? FRASES.mobile : FRASES.desktop);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!selectedGeo) return;

    const operationSlug = MAPPING_OPERACIONES[tab] || tab;
    const firstSegment = `${operationSlug}-${tipo.slug}`;

    let secondSegment;
    if (selectedGeo.type === "region") {
      secondSegment = selectedGeo.regionSlug;
    } else if (selectedGeo.type === "departamento") {
      secondSegment = selectedGeo.departmentSlug;
    } else {
      secondSegment = `${selectedGeo.citySlug}-${selectedGeo.departmentSlug}`;
    }

    router.push(`/${firstSegment}/${secondSegment}`);
  }, [selectedGeo]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="w-full flex justify-center font-montserrat">
      <div className="relative w-12/12 md:w-9/12">
        <div className="group relative w-full h-100 md:h-100 overflow-hidden">
          <Image
            src={image}
            alt="Interior de una vivienda"
            width={1200}
            height={1200}
            priority
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <Link
            href={propertyUrl}
            className="absolute top-0 right-0 z-10 bg-primero/80 text-decimo text-xs md:text-xs font-medium px-3 py-1.5 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primero hover:underline"
          >
            {propertyLabel}
          </Link>
        </div>

        <div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-20 md:bottom-1/2 translate-y-1/2 w-[95%] md:w-11/12 max-w-4xl bg-primero px-6 py-6 md:px-10 md:py-8 rounded-sm shadow-xl border border-segundo/20">
          <AnimatedTitle
            key={frases === FRASES.mobile ? "mobile" : "desktop"}
            texts={frases}
            className="text-xl md:text-3xl font-semibold text-quinto text-center md:my-2 my-4 normal-case font-anton"
            wrapperClassName="mb-4 md:mb-5"
          />

          <div className="flex flex-col md:flex-row items-stretch gap-4 flex-wrap">
            <div className="flex">
              <button
                onClick={() => {
                  setTab("comprar");
                  setTipo(TIPO_DEFAULT);
                }}
                className={`px-5 h-11 text-sm font-semibold border transition-colors cursor-pointer font-montserrat ${
                  tab === "comprar"
                    ? "bg-tercero/10 text-tercero border-tercero"
                    : "bg-primero/60 text-segundo/70 border-segundo/10"
                }`}
              >
                Comprar
              </button>
              <button
                onClick={() => {
                  setTab("alquilar");
                  setTipo(TIPO_DEFAULT);
                }}
                className={`px-5 h-11 text-sm font-semibold border transition-colors cursor-pointer font-montserrat ${
                  tab === "alquilar"
                    ? "bg-tercero/10 text-tercero border-tercero"
                    : "bg-primero/60 text-segundo/70 border-segundo/10"
                }`}
              >
                Alquilar
              </button>
            </div>

            <SelectorTipo tab={tab} value={tipo} onChange={setTipo} />

            <InputSearchPrincipal
              onGeoSelect={setSelectedGeo}
              setQuery={setQuery}
              query={query}
              operation={tab}
              tipo={tipo}
            />

            <button
              onClick={() => {
                if (!selectedGeo || query.trim() === "") return;
                router.push(
                  `/${MAPPING_OPERACIONES[tab] || tab}-${tipo.slug}/${selectedGeo.type === "region" ? selectedGeo.regionSlug : selectedGeo.type === "departamento" ? selectedGeo.departmentSlug : `${selectedGeo.citySlug}-${selectedGeo.departmentSlug}`}`,
                );
              }}
              disabled={!selectedGeo || query.trim() === ""}
              className={`relative flex items-center justify-center gap-2 px-8 h-11 select-none overflow-hidden group before:absolute before:inset-0 before:bg-tercero before:w-0 hover:before:w-full before:transition-all before:duration-500 before:ease-in-out before:z-0 w-28 ${
                !selectedGeo || query.trim() === ""
                  ? "bg-segundo text-primero/90"
                  : "bg-segundo text-primero cursor-pointer"
              }`}
            >
              <p className="text-sm relative z-10 group-hover:text-primero transition-colors duration-300 font-semibold font-montserrat">
                Buscar
              </p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

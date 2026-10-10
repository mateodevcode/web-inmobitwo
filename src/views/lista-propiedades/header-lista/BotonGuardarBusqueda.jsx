"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { IoNotificationsSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { toast } from "sonner";
import { useAppContext } from "@/context/AppContext";
import { useSlugParser } from "@/hooks/useSlugParser";
import { buildFiltrosApi } from "@/lib/filtrosBusqueda";
import { buildLoginUrl, obtenerOrigenActual } from "@/utils/authRedirect";
import { verificarBusqueda } from "@/actions/busquedasGuardadas";
import ModalGuardarBusqueda from "./ModalGuardarBusqueda";

const BotonGuardarBusqueda = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { operationSlug, typeSlug, citySlug, deptSlug, isCustomPolygon } = useSlugParser();
  const { estaAutenticado, authListo } = useAppContext();

  const [guardada, setGuardada] = useState(false);
  const [abierto, setAbierto] = useState(false);

  const filtros = buildFiltrosApi({ operationSlug, typeSlug, citySlug, deptSlug, searchParams });
  const filtrosKey = JSON.stringify(filtros);
  const urlOriginal = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

  useEffect(() => {
    if (!authListo || !estaAutenticado || isCustomPolygon) return;
    let cancel = false;
    verificarBusqueda(filtros).then((r) => {
      if (!cancel && r?.success) setGuardada(!!r.data?.guardada);
    });
    return () => { cancel = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authListo, estaAutenticado, filtrosKey, isCustomPolygon]);

  // Derivado en render (sin setState en efecto): solo se muestra como
  // guardada si hay sesión y no es zona dibujada.

  const onClick = () => {
    if (isCustomPolygon) {
      toast.info("Guardar búsquedas por zona dibujada aún no está disponible.", { position: "bottom-right" });
      return;
    }
    if (!estaAutenticado) {
      toast.info("Inicia sesión para guardar tu búsqueda.", { position: "bottom-right" });
      router.push(buildLoginUrl(obtenerOrigenActual()));
      return;
    }
    setAbierto(true);
  };

  const mostrarGuardada = guardada && estaAutenticado && !isCustomPolygon;

  return (
    <div className="bg-septimo w-full md:w-[25%] h-full rounded-sm hidden md:flex items-center justify-center flex-col gap-4">
      <h3 className="text-segundo text-sm font-semibold">
        Nuevos anuncios en tu email
      </h3>
      {mostrarGuardada ? (
        <Link
          href="/usuario/tus-datos/mis-busquedas"
          className="flex items-center justify-center gap-2 px-8 bg-tercero text-white h-11 cursor-pointer select-none w-10/12 rounded-md"
        >
          <FaCheck className="text-lg relative z-10 font-semibold" />
          <p className="text-sm relative z-10 font-semibold">Búsqueda guardada</p>
        </Link>
      ) : (
        <button
          className="relative flex items-center justify-center gap-2 px-8 bg-black text-white h-11 cursor-pointer select-none overflow-hidden group before:absolute before:inset-0 before:bg-tercero before:w-0 hover:before:w-full before:transition-all before:duration-500 before:ease-in-out before:z-0 w-10/12 rounded-md"
          type="button"
          onClick={onClick}
        >
          <IoNotificationsSharp className="text-lg relative z-10 group-hover:text-white transition-colors duration-300 font-semibold" />
          <p className="text-sm relative z-10 group-hover:text-white transition-colors duration-300 font-semibold">
            Guardar búsqueda
          </p>
        </button>
      )}
      {abierto && (
        <ModalGuardarBusqueda
          filtros={filtros}
          urlOriginal={urlOriginal}
          pathname={pathname}
          onClose={() => setAbierto(false)}
          onGuardada={() => { setGuardada(true); setAbierto(false); }}
        />
      )}
    </div>
  );
};

export default BotonGuardarBusqueda;

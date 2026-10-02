import { useEffect, useState } from "react";
import { apiBackend } from "@/actions/apiBackend.js";

// Catálogos de solo lectura para los selects de edición.
// Se cachean a nivel de módulo (no cambian en una sesión).
const cache = {};

const ENDPOINTS = {
  operaciones: "/catalogos/operaciones",
  alquiler: "/catalogos/tipos-alquiler",
  inmuebles: "/catalogos/tipos-inmueble",
  estados: "/catalogos/estados",
  calefaccion: "/catalogos/calefaccion",
  caracteristicas: "/catalogos/caracteristicas",
};

async function cargarCatalogo(clave) {
  if (cache[clave]) return cache[clave];
  try {
    const res = await apiBackend(ENDPOINTS[clave]);
    cache[clave] = res?.success ? (res.data ?? []) : [];
  } catch {
    cache[clave] = [];
  }
  return cache[clave];
}

// `claves`: subset de ENDPOINTS a cargar. Devuelve { datos, cargando }.
export const useCatalogos = (claves = []) => {
  const [datos, setDatos] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (!claves.length) return;
    let vivo = true;
    (async () => {
      setCargando(true);
      const pares = await Promise.all(
        claves.map(async (c) => [c, await cargarCatalogo(c)]),
      );
      if (vivo) {
        setDatos(Object.fromEntries(pares));
        setCargando(false);
      }
    })();
    return () => {
      vivo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claves.join(",")]);

  return { datos, cargando };
};

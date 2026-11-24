// Estado de la selección de VARIAS zonas del mapa principal + conteo total
// de inmuebles (unión, sin duplicar lo que cae en dos zonas).
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchConteoZonas } from "@/lib/geoApi";
import {
  agregarZona,
  alternarZona,
  quitarZona,
  zonasAParam,
} from "../lib/zonasSeleccion";

const DEBOUNCE_CONTEO_MS = 200;

export function useSeleccionZonas({ operation, tipoInmueble, iniciales = [] }) {
  const [zonas, setZonas] = useState(iniciales);
  // Último conteo recibido y para qué selección/filtros era.
  const [resultado, setResultado] = useState({ clave: "", total: 0 });
  const peticionRef = useRef(0);

  const param = zonasAParam(zonas);
  const clave = `${param}|${operation}|${tipoInmueble}`;

  // Conteo: al marcar varias zonas seguidas solo se pide el último estado.
  useEffect(() => {
    const id = ++peticionRef.current;
    if (!param) return;
    const t = setTimeout(() => {
      fetchConteoZonas(param, operation, tipoInmueble)
        .catch(() => 0)
        .then((n) => {
          if (id === peticionRef.current) setResultado({ clave, total: n });
        });
    }, DEBOUNCE_CONTEO_MS);
    return () => clearTimeout(t);
  }, [param, clave, operation, tipoInmueble]);

  // Derivados: "contando" mientras el último conteo no sea de esta selección.
  const cargando = !!param && resultado.clave !== clave;
  const total = param ? resultado.total : 0;

  const alternar = useCallback((zona) => setZonas((zs) => alternarZona(zs, zona)), []);
  const agregar = useCallback((zona) => setZonas((zs) => agregarZona(zs, zona)), []);
  const quitar = useCallback((clave) => setZonas((zs) => quitarZona(zs, clave)), []);
  const limpiar = useCallback(() => setZonas([]), []);

  return { zonas, setZonas, total, cargando, alternar, agregar, quitar, limpiar, param };
}

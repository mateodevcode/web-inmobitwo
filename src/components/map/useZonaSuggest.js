import { useEffect, useRef, useState } from "react";
import { apiBackend } from "@/actions/apiBackend.js";
import {
  MAPPING_TIPOS,
  MAPPING_OPERACIONES,
} from "@/data/mappings_busqueda.js";

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 300;

export function useZonaSuggest({ query, operation, tipoInmueble }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const text = query.trim();
  const isShort = text.length < MIN_QUERY_LENGTH;

  useEffect(() => {
    if (isShort) return;

    const timer = setTimeout(async () => {
      setLoading(true);
      const operacionDb = MAPPING_OPERACIONES[operation] || operation;
      const typeDb = MAPPING_TIPOS[tipoInmueble] || tipoInmueble;
      const res = await apiBackend(
        `/api/suggest-cities?q=${encodeURIComponent(text)}&operation=${operacionDb}&type=${typeDb}`,
      );
      setResults(res.success ? res.data || [] : []);
      setLoading(false);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [text, isShort, operation, tipoInmueble]);

  if (isShort) return { results: [], loading: false };
  return { results, loading };
}

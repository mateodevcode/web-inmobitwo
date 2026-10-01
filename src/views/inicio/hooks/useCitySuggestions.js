"use client";

import { useEffect, useRef, useState } from "react";
import { apiBackend } from "@/actions/apiBackend.js";
import { MAPPING_TIPOS, MAPPING_OPERACIONES } from "@/data/mappings_busqueda";

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 300;

/**
 * Sugiere ciudades/departamentos/regiones según el texto.
 * Misma conducta que el efecto original de InputSearchPrincipal.
 */
export const useCitySuggestions = ({ query, operation, tipoSlug }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const text = query.trim();
  const isShort = text.length < MIN_QUERY_LENGTH;

  useEffect(() => {
    if (isShort) return;

    setLoading(true);

    const timer = setTimeout(async () => {
      const operacionDb = MAPPING_OPERACIONES[operation] || operation;
      const typeDb = MAPPING_TIPOS[tipoSlug] || tipoSlug || "";
      const typeParam = typeDb ? `&type=${typeDb}` : "";
      const res = await apiBackend(
        `/api/suggest-cities?q=${encodeURIComponent(text)}&operation=${operacionDb}${typeParam}`,
      );

      setResults(res.success ? res.data || [] : []);
      setLoading(false);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [text, isShort, operation, tipoSlug]);

  if (isShort) return { results: [], loading: false };
  return { results, loading };
};

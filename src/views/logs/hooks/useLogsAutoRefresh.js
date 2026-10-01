import { useEffect, useRef, useState } from "react";
import useLogsTracking from "@/hooks/useLogsTracking";

const REFRESH_MS = 4000;

export const useLogsAutoRefresh = () => {
  const { cargarLogsTracking } = useLogsTracking();
  const cargaInicialHecha = useRef(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const intervaloRef = useRef(null);

  // Carga inicial
  useEffect(() => {
    if (cargaInicialHecha.current) return;
    cargaInicialHecha.current = true;
    cargarLogsTracking();
  }, []);

  // Auto-refresh cada 4 segundos, sin mostrar loading
  useEffect(() => {
    if (autoRefresh) {
      intervaloRef.current = setInterval(() => {
        cargarLogsTracking(false);
      }, REFRESH_MS);
    }
    return () => clearInterval(intervaloRef.current);
  }, [autoRefresh]);

  return { autoRefresh, setAutoRefresh };
};

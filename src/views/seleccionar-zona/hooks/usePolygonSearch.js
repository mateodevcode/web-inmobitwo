import { useCallback, useState } from "react";
import { fetchInmueblesEnPoligono } from "@/lib/geoApi";

export const usePolygonSearch = (operation, tipoInmueble) => {
  const [customPolygon, setCustomPolygon] = useState(null);
  const [polygonProps, setPolygonProps] = useState([]);
  const [polygonPropCount, setPolygonPropCount] = useState(0);
  const [polygonLoading, setPolygonLoading] = useState(false);

  const clearPolygon = useCallback(() => {
    setCustomPolygon(null);
    setPolygonProps([]);
    setPolygonPropCount(0);
  }, []);

  const handlePolygonChange = useCallback(
    async (geojson) => {
      if (!geojson) {
        clearPolygon();
        return;
      }
      setCustomPolygon(geojson);
      setPolygonLoading(true);
      try {
        const result = await fetchInmueblesEnPoligono(
          geojson,
          operation,
          tipoInmueble,
        );
        setPolygonPropCount(result.total || 0);
        setPolygonProps(result.propiedades || []);
      } catch {
        setPolygonPropCount(0);
        setPolygonProps([]);
      } finally {
        setPolygonLoading(false);
      }
    },
    [operation, tipoInmueble, clearPolygon],
  );

  return {
    customPolygon,
    polygonProps,
    polygonPropCount,
    polygonLoading,
    clearPolygon,
    handlePolygonChange,
  };
};

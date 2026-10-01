import { useEffect, useState } from "react";
import { fetchStatesGeoJSON } from "@/lib/geoApi";

export const useDeptNames = () => {
  const [deptNames, setDeptNames] = useState({});

  useEffect(() => {
    let vivo = true;
    fetchStatesGeoJSON()
      .then((data) => {
        if (!vivo) return;
        const map = {};
        data.features?.forEach((f) => {
          map[f.properties.DPTO_CCDGO] = f.properties.DPTO_CNMBR;
        });
        setDeptNames(map);
      })
      .catch(() => {
        // sin nombres de depto: el mapa sigue funcionando con slugs
      });
    return () => {
      vivo = false;
    };
  }, []);

  return deptNames;
};

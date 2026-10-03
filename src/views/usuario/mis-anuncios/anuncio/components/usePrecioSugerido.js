import { useEffect, useState } from "react";
import { apiBackend } from "@/actions/apiBackend.js";

// Arma el input del algoritmo desde la propiedad (+ overrides del draft).
export function armarPrecioInput(propiedad, overrides = {}, featureCodes = null) {
  const codes =
    featureCodes ??
    Object.values(propiedad?.caracteristicas ?? {})
      .flat()
      .map((f) => f.code)
      .filter(Boolean);
  return {
    city_id: overrides.city_id ?? propiedad?.city_id ?? null,
    estrato: overrides.estrato ?? propiedad?.estrato ?? null,
    private_area: overrides.private_area ?? propiedad?.private_area ?? null,
    constructed_area:
      overrides.constructed_area ?? propiedad?.constructed_area ?? null,
    condition_type_id:
      overrides.condition_type_id ?? propiedad?.condition_type_id ?? null,
    construction_year:
      overrides.construction_year ?? propiedad?.construction_year ?? null,
    floor: overrides.floor ?? propiedad?.floor ?? null,
    features: codes,
    parqueadero_tipo:
      overrides.parqueadero_tipo ?? propiedad?.parqueadero_tipo ?? null,
    parqueadero_modo:
      overrides.parqueadero_modo ?? propiedad?.parqueadero_modo ?? null,
    zona: overrides.zona ?? propiedad?.zona ?? null,
  };
}

const NIVEL_ESTILO = {
  sobrevalorado: "text-red-700",
  alto: "text-yellow-700",
  optimo: "text-green-700",
  bueno: "text-green-700",
  oportunidad: "text-green-700",
};

// Sugerencia del algoritmo (SOLO venta) con debounce. Si se pasa
// precioUsuario, además valida la posición (óptimo/alto/...).
export function usePrecioSugerido(input, { precioUsuario, activo }) {
  const [sugerido, setSugerido] = useState(null);
  const [validacion, setValidacion] = useState(null);
  const [cargando, setCargando] = useState(false);
  const key = JSON.stringify({ input, precioUsuario });

  useEffect(() => {
    const t = setTimeout(async () => {
      if (!activo) {
        setSugerido(null);
        setValidacion(null);
        setCargando(false);
        return;
      }
      setCargando(true);
      try {
        const parsed = JSON.parse(key);
        const res = await apiBackend(
          "/propiedades/calcular-precio-sugerido",
          "POST",
          parsed.input,
        );
        if (res?.success) {
          setSugerido(res.data);
          const pu = parsed.precioUsuario;
          if (pu !== undefined && pu !== null && pu !== "") {
            const v = await apiBackend("/propiedades/validar-precio", "POST", {
              precio_usuario: Number(pu),
              datos_propiedad: parsed.input,
            });
            if (v?.success) setValidacion(v.data);
          } else {
            setValidacion(null);
          }
        } else {
          setSugerido(null);
          setValidacion(null);
        }
      } catch {
        setSugerido(null);
        setValidacion(null);
      } finally {
        setCargando(false);
      }
    }, 600);
    return () => clearTimeout(t);
  }, [key, activo]);

  return { sugerido, validacion, cargando, nivelEstilo: NIVEL_ESTILO };
}

export function formatoCOPcorto(v) {
  if (v === null || v === undefined) return "—";
  const n = Number(v);
  if (!Number.isFinite(n)) return "—";
  if (n >= 1000000) {
    const m = n / 1000000;
    return `$${Number(m.toFixed(m >= 100 ? 0 : 1))}M`;
  }
  return `$${n.toLocaleString("es-CO")}`;
}

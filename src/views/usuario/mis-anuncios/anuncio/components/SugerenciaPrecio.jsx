import { formatoCOPcorto } from "./usePrecioSugerido";

const NIVEL_ESTILO = {
  sobrevalorado: "text-red-700",
  alto: "text-yellow-700",
  optimo: "text-green-700",
  bueno: "text-green-700",
  oportunidad: "text-green-700",
};

// Panel de sugerencia del algoritmo (solo venta). Compacto para reutilizar
// en Precio, Servicios y cambio de operación.
export function SugerenciaPrecio({ sugerido, validacion, cargando }) {
  if (cargando && !sugerido) {
    return (
      <p className="text-sm text-segundo/60">Calculando precio sugerido…</p>
    );
  }
  if (!sugerido) return null;

  return (
    <div className="bg-tercero/10 border border-tercero/30 rounded-md p-3 mt-3">
      <p className="text-sm text-segundo">
        Sugerido por mercado:{" "}
        <span className="font-semibold">
          {formatoCOPcorto(sugerido.precio_sugerido_min)} —{" "}
          {formatoCOPcorto(sugerido.precio_sugerido_max)}
        </span>
        {sugerido.price_per_sqm_sugerido != null && (
          <span className="text-segundo/70">
            {" "}
            (${Number(sugerido.price_per_sqm_sugerido).toLocaleString("es-CO")}/m²)
          </span>
        )}
      </p>
      {validacion?.mensaje && (
        <p
          className={`text-sm font-semibold mt-1 ${NIVEL_ESTILO[validacion.nivel] ?? "text-segundo"}`}
        >
          {validacion.mensaje}
        </p>
      )}
    </div>
  );
}

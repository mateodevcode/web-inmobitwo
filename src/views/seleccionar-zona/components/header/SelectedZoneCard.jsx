import { TfiMapAlt } from "react-icons/tfi";
import { FiX } from "react-icons/fi";
import { claveZona, MAX_ZONAS } from "../../lib/zonasSeleccion";

const ETIQUETA_TIPO = {
  region: "Región",
  departamento: "Depto.",
  municipio: "Municipio",
  barrio: "Barrio",
};

// Zonas marcadas en el mapa (varias): chips con "x", total de inmuebles de
// todas juntas y "Ver inmuebles". En móvil va abajo para no tapar el mapa.
export function SelectedZoneCard({
  drawMode,
  zonas,
  propertyCount,
  loading,
  onRemove,
  onClear,
  onVerInmuebles,
}) {
  if (drawMode || !zonas?.length) return null;

  // Sin resultados el botón queda en tono bajo pero sigue clicable
  // para mostrar el aviso (igual que en modo dibujo).
  const sinResultados = !loading && !propertyCount;
  const n = zonas.length;

  return (
    <div className="absolute left-2 right-2 bottom-16 md:bottom-auto md:right-auto md:top-24 md:left-5 md:w-96 bg-white rounded-lg shadow-xl p-4 z-1000 font-poppins flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="text-base md:text-lg font-semibold text-segundo flex items-center gap-2 font-montserrat">
          <TfiMapAlt className="text-xl" />
          <h3>
            {n === 1 ? "1 zona seleccionada" : `${n} zonas seleccionadas`}
          </h3>
        </div>
        <button
          className="text-xs text-decimo hover:text-decimo/80 cursor-pointer font-semibold shrink-0"
          onClick={onClear}
        >
          Quitar todas
        </button>
      </div>

      <ul className="flex flex-wrap gap-2 max-h-32 overflow-y-auto" aria-label="Zonas seleccionadas">
        {zonas.map((z) => (
          <li
            key={claveZona(z)}
            className="flex items-center gap-1.5 bg-noveno/10 text-[#72243e] border border-noveno/40 rounded-full pl-3 pr-1 py-1 text-sm"
          >
            <span className="text-[10px] uppercase tracking-wide opacity-70">
              {ETIQUETA_TIPO[z.type]}
            </span>
            <span className="font-medium">{z.name}</span>
            <button
              className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-noveno hover:text-white cursor-pointer transition-colors"
              onClick={() => onRemove(claveZona(z))}
              aria-label={`Quitar ${z.name}`}
              title={`Quitar ${z.name}`}
            >
              <FiX size={12} />
            </button>
          </li>
        ))}
      </ul>

      <p className="text-xs text-gray-500 -mt-1">
        {n >= MAX_ZONAS
          ? `Máximo ${MAX_ZONAS} zonas.`
          : "Haz clic en el mapa para añadir o quitar zonas."}
      </p>

      <button
        className={`w-full py-3 px-5 text-white border-none rounded-md text-sm font-semibold cursor-pointer transition-colors ${
          sinResultados ? "bg-tercero/80" : "bg-tercero hover:bg-tercero/80"
        }`}
        onClick={onVerInmuebles}
        disabled={loading}
      >
        {loading
          ? "Contando inmuebles…"
          : `Ver ${propertyCount.toLocaleString("es-CO")} ${propertyCount === 1 ? "inmueble" : "inmuebles"}`}
      </button>
    </div>
  );
}

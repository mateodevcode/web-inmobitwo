import { useState } from "react";
import { TfiMapAlt } from "react-icons/tfi";
import { FiX, FiChevronUp } from "react-icons/fi";
import { claveZona, MAX_ZONAS } from "../../lib/zonasSeleccion";

const ETIQUETA_TIPO = {
  region: "Región",
  departamento: "Depto.",
  municipio: "Municipio",
  barrio: "Barrio",
};

// Zonas marcadas en el mapa (varias): chips con "x", total de inmuebles de
// todas juntas y "Ver inmuebles".
// En móvil va abajo como hoja plegable: plegada (por defecto) es una barra
// compacta con el total y "Ver"; desplegada muestra los chips. En escritorio
// siempre va desplegada arriba a la izquierda.
export function SelectedZoneCard({
  drawMode,
  zonas,
  propertyCount,
  loading,
  onRemove,
  onClear,
  onVerInmuebles,
}) {
  const [desplegada, setDesplegada] = useState(false);

  if (drawMode || !zonas?.length) return null;

  // Sin resultados el botón queda en tono bajo pero sigue clicable
  // para mostrar el aviso (igual que en modo dibujo).
  const sinResultados = !loading && !propertyCount;
  const n = zonas.length;
  const titulo = n === 1 ? "1 zona seleccionada" : `${n} zonas seleccionadas`;
  const textoVer = loading
    ? "Contando…"
    : `Ver ${propertyCount.toLocaleString("es-CO")} ${propertyCount === 1 ? "inmueble" : "inmuebles"}`;
  const claseVer = `py-3 px-5 text-white border-none rounded-md text-sm font-semibold cursor-pointer transition-colors whitespace-nowrap ${
    sinResultados ? "bg-tercero/80" : "bg-tercero hover:bg-tercero/80"
  }`;
  // En móvil, lo que solo se ve desplegado; en escritorio, siempre.
  const soloDesplegada = desplegada ? "flex" : "hidden md:flex";

  return (
    <div
      className={`absolute left-2 right-2 bottom-16 md:bottom-auto md:right-auto md:top-24 md:left-5 md:w-96 bg-white rounded-lg shadow-xl z-1000 font-poppins flex flex-col gap-3 ${
        desplegada ? "p-4" : "p-3 md:p-4"
      }`}
    >
      {/* Barra compacta (solo móvil plegada): toca para ver los chips */}
      {!desplegada && (
        <div className="flex md:hidden items-center gap-3">
          <button
            className="flex-1 min-w-0 flex items-center gap-2 text-left cursor-pointer"
            onClick={() => setDesplegada(true)}
            aria-expanded="false"
            aria-label={`${titulo}. Mostrar zonas`}
          >
            <FiChevronUp className="shrink-0 text-segundo/70" size={18} />
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-segundo font-montserrat">
                {n === 1 ? "1 zona" : `${n} zonas`}
              </span>
              <span className="block text-xs text-gray-500 truncate">
                {zonas.map((z) => z.name).join(", ")}
              </span>
            </span>
          </button>
          <button className={claseVer} onClick={onVerInmuebles} disabled={loading}>
            {textoVer}
          </button>
        </div>
      )}

      <div className={`${soloDesplegada} items-center justify-between gap-3`}>
        <button
          className="text-base md:text-lg font-semibold text-segundo flex items-center gap-2 font-montserrat md:cursor-default cursor-pointer"
          onClick={() => setDesplegada(false)}
          aria-expanded="true"
        >
          <TfiMapAlt className="text-xl" />
          <h3>{titulo}</h3>
          <FiChevronUp className="md:hidden rotate-180 text-segundo/70" size={18} aria-hidden="true" />
        </button>
        <button
          className="text-xs text-decimo hover:text-decimo/80 cursor-pointer font-semibold shrink-0"
          onClick={onClear}
        >
          Quitar todas
        </button>
      </div>

      <ul
        className={`${soloDesplegada} flex-wrap gap-2 max-h-32 overflow-y-auto`}
        aria-label="Zonas seleccionadas"
      >
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

      <p className={`${desplegada ? "block" : "hidden md:block"} text-xs text-gray-500 -mt-1`}>
        {n >= MAX_ZONAS
          ? `Máximo ${MAX_ZONAS} zonas.`
          : "Haz clic en el mapa para añadir o quitar zonas."}
      </p>

      <button
        className={`${desplegada ? "block" : "hidden md:block"} w-full ${claseVer}`}
        onClick={onVerInmuebles}
        disabled={loading}
      >
        {textoVer}
      </button>
    </div>
  );
}

import { MdOutlineModeEdit } from "react-icons/md";
import { DetalleCard } from "./DetalleCard";
import { CardActionLink } from "./CardActionLink";
import { useCardEdit, aEnteroSeguro } from "./useCardEdit";
import { useCatalogos } from "./useCatalogos";

const inputCls =
  "border border-segundo/50 p-2.5 w-full text-segundo bg-white";

// Booleanos del inmueble (servicios propios, no del catálogo N:M).
const BOOLEANOS = [
  ["tiene_agua", "Agua"],
  ["tiene_luz", "Luz"],
  ["tiene_gas", "Gas"],
  ["tiene_alcantarillado", "Alcantarillado"],
  ["has_elevator", "Ascensor"],
  ["has_swimming_pool", "Piscina"],
  ["has_gym", "Gimnasio"],
  ["has_security_24h", "Seguridad 24 horas"],
  ["has_air_conditioning", "Aire acondicionado"],
  ["is_furnished", "Amoblado"],
  ["is_new_construction", "Obra nueva"],
  ["parking_space_included", "Parqueadero incluido"],
];

const NUMEROS = [
  ["estrato", "Estrato"],
  ["construction_year", "Año de construcción"],
  ["antiguedad_anios", "Antigüedad (años)"],
  ["parking_space_count", "Parqueaderos (#)"],
  ["parking_space_price", "Precio parqueadero (COP)"],
];

const TEXTOS = [
  ["floor", "Piso / planta"],
  ["interior_apartment_number", "Interior / apto"],
  ["postal_code", "Código postal"],
  ["parqueadero_tipo", "Tipo de parqueadero"],
  ["parqueadero_modo", "Modo de parqueadero"],
  ["cedula_catastral", "Cédula catastral"],
  ["matricula_inmobiliaria", "Matrícula inmobiliaria"],
];

// campo_id -> { catalogo, etiqueta }
const SELECTS_CATALOGO = [
  ["operation_type_id", "operaciones", "Operación"],
  ["property_type_id", "inmuebles", "Tipo de inmueble"],
  ["rental_type_id", "alquiler", "Tipo de alquiler"],
  ["condition_type_id", "estados", "Estado de conservación"],
  ["heating_type_id", "calefaccion", "Calefacción"],
];

const CAMPOS_EDITABLES = [
  ...SELECTS_CATALOGO.map(([c]) => c),
  ...NUMEROS.map(([c]) => c),
  ...TEXTOS.map(([c]) => c),
  ...BOOLEANOS.map(([c]) => c),
];

const esRental = (propiedad) =>
  propiedad?.operacion_slug === "arriendo" ||
  propiedad?.operation_type_id === 2;

function Fila({ etiqueta, children }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-segundo/70">{etiqueta}</span>
      {children}
    </div>
  );
}

export function DetallesCard({ propiedad }) {
  const { datos: catalogos } = useCatalogos([
    "operaciones",
    "inmuebles",
    "alquiler",
    "estados",
    "calefaccion",
  ]);
  const { editando, loading, draft, iniciar, cancelar, set, guardar } =
    useCardEdit(propiedad, CAMPOS_EDITABLES);

  const normalizar = (campo, valor) => {
    if (SELECTS_CATALOGO.some(([c]) => c === campo)) {
      return valor === "" || valor == null ? undefined : Number(valor);
    }
    if (NUMEROS.some(([c]) => c === campo)) return aEnteroSeguro(valor);
    if (BOOLEANOS.some(([c]) => c === campo)) {
      return valor === "" || valor == null ? undefined : !!valor;
    }
    return valor;
  };

  const booleanosActivos = BOOLEANOS.filter(([c]) => propiedad?.[c] === true);
  const tipos = [
    propiedad?.operacion && `Operación: ${propiedad.operacion}`,
    propiedad?.tipo_inmueble && `Tipo: ${propiedad.tipo_inmueble}`,
    propiedad?.tipo_alquiler && `Alquiler: ${propiedad.tipo_alquiler}`,
    propiedad?.estado_conservacion &&
      `Estado: ${propiedad.estado_conservacion}`,
    propiedad?.tipo_calefaccion &&
      `Calefacción: ${propiedad.tipo_calefaccion}`,
  ].filter(Boolean);

  const numerosPresentes = NUMEROS.filter(
    ([c]) => propiedad?.[c] != null,
  ).map(([c, etiqueta]) => `${etiqueta}: ${propiedad[c]}`);
  const textosPresentes = TEXTOS.filter(([c]) => {
    const v = propiedad?.[c];
    return v !== null && v !== undefined && String(v).trim() !== "";
  }).map(([c, etiqueta]) => `${etiqueta}: ${propiedad[c]}`);

  const hayAlgo =
    tipos.length + numerosPresentes.length + textosPresentes.length >
      0 || booleanosActivos.length > 0;

  return (
    <DetalleCard
      title="Detalles del inmueble"
      action={
        editando ? (
          <div className="flex items-center gap-4 mt-4">
            <button
              type="button"
              onClick={() => guardar(normalizar)}
              disabled={loading}
              className="rounded-md bg-tercero px-6 py-2 text-sm md:text-base font-semibold text-primero hover:bg-tercero/80 active:scale-[0.99] cursor-pointer select-none font-montserrat disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
            <button
              type="button"
              onClick={cancelar}
              className="rounded-md bg-segundo px-6 py-2 text-sm md:text-base font-semibold text-primero hover:bg-segundo/80 active:scale-[0.99] cursor-pointer select-none font-montserrat"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <CardActionLink
            Icon={MdOutlineModeEdit}
            className="mt-4"
            onClick={iniciar}
          >
            Editar detalles
          </CardActionLink>
        )
      }
    >
      {editando ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {SELECTS_CATALOGO.map(([campo, cat, etiqueta]) => {
            if (campo === "rental_type_id" && !esRental(propiedad)) return null;
            const opciones = Array.isArray(catalogos[cat])
              ? catalogos[cat]
              : [];
            return (
              <Fila key={campo} etiqueta={etiqueta}>
                <select
                  value={draft?.[campo] ?? ""}
                  onChange={(e) => set(campo, e.target.value)}
                  className={inputCls}
                >
                  <option value="">Sin cambiar</option>
                  {opciones.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label_es}
                    </option>
                  ))}
                </select>
              </Fila>
            );
          })}
          {NUMEROS.map(([campo, etiqueta]) => (
            <Fila key={campo} etiqueta={etiqueta}>
              <input
                type="number"
                min={0}
                value={draft?.[campo] ?? ""}
                onChange={(e) => set(campo, e.target.value)}
                className={inputCls}
              />
            </Fila>
          ))}
          {TEXTOS.map(([campo, etiqueta]) => (
            <Fila key={campo} etiqueta={etiqueta}>
              <input
                type="text"
                value={draft?.[campo] ?? ""}
                onChange={(e) => set(campo, e.target.value)}
                className={inputCls}
              />
            </Fila>
          ))}
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-2">
            {BOOLEANOS.map(([campo, etiqueta]) => (
              <label
                key={campo}
                className="flex items-center gap-2 text-segundo cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={draft?.[campo] === true}
                  onChange={(e) => set(campo, e.target.checked)}
                  className="w-4 h-4 accent-[#b8860b]"
                />
                {etiqueta}
              </label>
            ))}
          </div>
        </div>
      ) : hayAlgo ? (
        <ul className="list-disc mx-5 mt-4 text-segundo">
          {tipos.map((t) => (
            <li key={t} className="my-1">
              {t}
            </li>
          ))}
          {[...numerosPresentes, ...textosPresentes].map((t) => (
            <li key={t} className="my-1">
              {t}
            </li>
          ))}
          {booleanosActivos.map(([c, etiqueta]) => (
            <li key={c} className="my-1">
              {etiqueta}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-segundo/60">
          Este anuncio no tiene detalles registrados. Edítalo para agregarlos.
        </p>
      )}
    </DetalleCard>
  );
}

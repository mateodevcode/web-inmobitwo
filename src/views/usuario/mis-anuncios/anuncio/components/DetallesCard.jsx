import { useState } from "react";
import { MdOutlineModeEdit, MdOutlineSwapHoriz } from "react-icons/md";
import { DetalleCard } from "./DetalleCard";
import { CardActionLink } from "./CardActionLink";
import { useCardEdit, aEnteroSeguro } from "./useCardEdit";
import { useCatalogos } from "./useCatalogos";
import { CambiarOperacionModal } from "./CambiarOperacionModal";

const inputCls =
  "border border-segundo/50 p-2.5 w-full text-segundo bg-white";

// Secciones como en el wizard y la vista pública. Cada campo declara cómo
// mostrarse (ver) y cómo editarse (kind). Lo ausente (null) no se muestra;
// en edición aparece para poder agregarlo.
const SECCIONES = [
  {
    titulo: "Operación y tipo",
    campos: [
      {
        campo: "operation_type_id",
        kind: "lectura",
        etiqueta: "Operación",
        ver: (p) => p.operacion && `Operación: ${p.operacion}`,
      },
      {
        campo: "property_type_id",
        kind: "select",
        catalogo: "inmuebles",
        etiqueta: "Tipo de inmueble",
        ver: (p) => p.tipo_inmueble && `Tipo: ${p.tipo_inmueble}`,
      },
      {
        campo: "rental_type_id",
        kind: "select",
        catalogo: "alquiler",
        etiqueta: "Tipo de alquiler",
        soloRental: true,
        ver: (p) => p.tipo_alquiler && `Alquiler: ${p.tipo_alquiler}`,
      },
    ],
  },
  {
    titulo: "Estado y antigüedad",
    campos: [
      {
        campo: "condition_type_id",
        kind: "select",
        catalogo: "estados",
        etiqueta: "Estado de conservación",
        ver: (p) =>
          p.estado_conservacion && `Estado: ${p.estado_conservacion}`,
      },
      {
        campo: "estrato",
        kind: "numero",
        etiqueta: "Estrato",
        ver: (p) => (p.estrato != null ? `Estrato ${p.estrato}` : null),
      },
      {
        campo: "construction_year",
        kind: "numero",
        etiqueta: "Año de construcción",
        ver: (p) =>
          p.construction_year != null
            ? `Construido en ${p.construction_year}`
            : null,
      },
      {
        campo: "antiguedad_anios",
        kind: "numero",
        etiqueta: "Antigüedad (años)",
        ver: (p) =>
          p.antiguedad_anios != null
            ? `Antigüedad: ${p.antiguedad_anios} años`
            : null,
      },
      {
        campo: "is_new_construction",
        kind: "bool",
        etiqueta: "Obra nueva",
        ver: (p) => (p.is_new_construction === true ? "Obra nueva" : null),
      },
    ],
  },
  {
    titulo: "Ubicación física",
    campos: [
      {
        campo: "floor",
        kind: "texto",
        etiqueta: "Piso / planta",
        ver: (p) => p.floor && `Piso ${p.floor}`,
      },
      {
        campo: "interior_apartment_number",
        kind: "texto",
        etiqueta: "Interior / apto",
        ver: (p) =>
          p.interior_apartment_number &&
          `Interior ${p.interior_apartment_number}`,
      },
      {
        campo: "postal_code",
        kind: "texto",
        etiqueta: "Código postal",
        ver: (p) => p.postal_code && `C.P. ${p.postal_code}`,
      },
    ],
  },
  {
    titulo: "Parqueadero",
    campos: [
      {
        campo: "parqueadero_tipo",
        kind: "texto",
        etiqueta: "Tipo de parqueadero",
        ver: (p) =>
          p.parqueadero_tipo &&
          `Parqueadero ${p.parqueadero_tipo}${p.parqueadero_modo ? ` (${p.parqueadero_modo})` : ""}`,
      },
      {
        campo: "parqueadero_modo",
        kind: "texto",
        etiqueta: "Modo de parqueadero",
        ver: (p) =>
          p.parqueadero_modo && !p.parqueadero_tipo
            ? `Modo: ${p.parqueadero_modo}`
            : null,
      },
      {
        campo: "parking_space_count",
        kind: "numero",
        etiqueta: "Parqueaderos (#)",
        ver: (p) =>
          p.parking_space_count != null
            ? `${p.parking_space_count} parqueadero(s)`
            : null,
      },
      {
        campo: "parking_space_included",
        kind: "bool",
        etiqueta: "Parqueadero incluido",
        ver: (p) =>
          p.parking_space_included === true
            ? "Parqueadero incluido en el precio"
            : null,
      },
      {
        campo: "parking_space_price",
        kind: "numero",
        etiqueta: "Precio parqueadero (COP)",
        ver: (p) =>
          p.parking_space_price != null
            ? `Parqueadero: $${Number(p.parking_space_price).toLocaleString("es-CO")}`
            : null,
      },
    ],
  },
  {
    titulo: "Servicios públicos",
    campos: [
      {
        campo: "tiene_agua",
        kind: "bool",
        etiqueta: "Agua",
        ver: (p) => (p.tiene_agua === true ? "Agua" : null),
      },
      {
        campo: "tiene_luz",
        kind: "bool",
        etiqueta: "Luz",
        ver: (p) => (p.tiene_luz === true ? "Luz" : null),
      },
      {
        campo: "tiene_gas",
        kind: "bool",
        etiqueta: "Gas",
        ver: (p) => (p.tiene_gas === true ? "Gas" : null),
      },
      {
        campo: "tiene_alcantarillado",
        kind: "bool",
        etiqueta: "Alcantarillado",
        ver: (p) =>
          p.tiene_alcantarillado === true ? "Alcantarillado" : null,
      },
    ],
  },
  {
    titulo: "Comodidades y mejoras",
    campos: [
      {
        campo: "heating_type_id",
        kind: "select",
        catalogo: "calefaccion",
        etiqueta: "Calefacción",
        ver: (p) => p.tipo_calefaccion && `Calefacción: ${p.tipo_calefaccion}`,
      },
      {
        campo: "has_elevator",
        kind: "bool",
        etiqueta: "Ascensor",
        ver: (p) => (p.has_elevator === true ? "Ascensor" : null),
      },
      {
        campo: "has_swimming_pool",
        kind: "bool",
        etiqueta: "Piscina",
        ver: (p) => (p.has_swimming_pool === true ? "Piscina" : null),
      },
      {
        campo: "has_gym",
        kind: "bool",
        etiqueta: "Gimnasio",
        ver: (p) => (p.has_gym === true ? "Gimnasio" : null),
      },
      {
        campo: "has_security_24h",
        kind: "bool",
        etiqueta: "Seguridad 24 horas",
        ver: (p) =>
          p.has_security_24h === true ? "Seguridad 24 horas" : null,
      },
      {
        campo: "has_air_conditioning",
        kind: "bool",
        etiqueta: "Aire acondicionado",
        ver: (p) =>
          p.has_air_conditioning === true ? "Aire acondicionado" : null,
      },
      {
        campo: "is_furnished",
        kind: "bool",
        etiqueta: "Amoblado",
        ver: (p) => (p.is_furnished === true ? "Amoblado" : null),
      },
    ],
  },
  {
    titulo: "Documentos",
    campos: [
      {
        campo: "cedula_catastral",
        kind: "texto",
        etiqueta: "Cédula catastral",
        ver: (p) => p.cedula_catastral && `Cédula: ${p.cedula_catastral}`,
      },
      {
        campo: "matricula_inmobiliaria",
        kind: "texto",
        etiqueta: "Matrícula inmobiliaria",
        ver: (p) =>
          p.matricula_inmobiliaria && `Matrícula: ${p.matricula_inmobiliaria}`,
      },
    ],
  },
];

const TODOS_CAMPOS = SECCIONES.flatMap((s) => s.campos.map((c) => c.campo));

const esRental = (propiedad) =>
  propiedad?.operacion_slug === "arriendo" ||
  propiedad?.operation_type_id === 2;

const visibleEnSeccion = (def, propiedad) =>
  !(def.soloRental && !esRental(propiedad));

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
    "inmuebles",
    "alquiler",
    "estados",
    "calefaccion",
  ]);
  const { editando, loading, draft, iniciar, cancelar, set, guardar } =
    useCardEdit(propiedad, TODOS_CAMPOS);
  const [cambioAbierto, setCambioAbierto] = useState(false);

  const normalizar = (campo, valor) => {
    const def = SECCIONES.flatMap((s) => s.campos).find((c) => c.campo === campo);
    if (!def) return valor;
    // Lectura: se muestra pero jamás viaja en el PATCH (cambiar de operación
    // tiene su propio flujo). El backend además lo rechazaría con 400.
    if (def.kind === "lectura") return undefined;
    if (def.kind === "select") {
      return valor === "" || valor == null ? undefined : Number(valor);
    }
    if (def.kind === "numero") return aEnteroSeguro(valor);
    if (def.kind === "bool") {
      return valor === "" || valor == null ? undefined : !!valor;
    }
    return valor;
  };

  const seccionesConDatos = SECCIONES.map((sec) => ({
    ...sec,
    filas: sec.campos
      .filter((c) => visibleEnSeccion(c, propiedad))
      .map((c) => c.ver(propiedad))
      .filter(Boolean),
  })).filter((sec) => sec.filas.length > 0);

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
        <div className="flex flex-col gap-5 mt-4">
          {SECCIONES.map((sec) => (
            <div key={sec.titulo}>
              <p className="text-sm font-bold text-segundo uppercase tracking-wide mb-2">
                {sec.titulo}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sec.campos
                  .filter((c) => visibleEnSeccion(c, propiedad))
                  .map((def) => (
                    <Fila key={def.campo} etiqueta={def.etiqueta}>
                      {def.kind === "lectura" ? (
                        <p className="text-segundo">
                          {def.ver(propiedad) ?? "—"}
                        </p>
                      ) : def.kind === "select" ? (
                        <select
                          value={draft?.[def.campo] ?? ""}
                          onChange={(e) => set(def.campo, e.target.value)}
                          className={inputCls}
                        >
                          <option value="">Sin cambiar</option>
                          {(Array.isArray(catalogos[def.catalogo])
                            ? catalogos[def.catalogo]
                            : []
                          ).map((o) => (
                            <option key={o.id} value={o.id}>
                              {o.label_es}
                            </option>
                          ))}
                        </select>
                      ) : def.kind === "numero" ? (
                        <input
                          type="number"
                          min={0}
                          value={draft?.[def.campo] ?? ""}
                          onChange={(e) => set(def.campo, e.target.value)}
                          className={inputCls}
                        />
                      ) : def.kind === "bool" ? (
                        <label className="flex items-center gap-2 text-segundo cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={draft?.[def.campo] === true}
                            onChange={(e) => set(def.campo, e.target.checked)}
                            className="w-4 h-4 accent-[#b8860b]"
                          />
                          {def.etiqueta}
                        </label>
                      ) : (
                        <input
                          type="text"
                          value={draft?.[def.campo] ?? ""}
                          onChange={(e) => set(def.campo, e.target.value)}
                          className={inputCls}
                        />
                      )}
                    </Fila>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : seccionesConDatos.length > 0 ? (
        <div className="mt-4 flex flex-col gap-4">
          {seccionesConDatos.map((sec) => (
            <div key={sec.titulo}>
              <p className="text-sm font-bold text-segundo uppercase tracking-wide mb-1">
                {sec.titulo}
              </p>
              <ul className="list-disc mx-5 text-segundo">
                {sec.filas.map((fila) => (
                  <li key={fila} className="my-1">
                    {fila}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="pt-2 border-t border-segundo/10">
            <CardActionLink
              Icon={MdOutlineSwapHoriz}
              onClick={() => setCambioAbierto(true)}
            >
              Cambiar de operación
            </CardActionLink>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-segundo/60">
          Este anuncio no tiene detalles registrados. Edítalo para agregarlos.
        </p>
      )}
      <CambiarOperacionModal
        open={cambioAbierto}
        onClose={() => setCambioAbierto(false)}
        propiedad={propiedad}
      />
    </DetalleCard>
  );
}

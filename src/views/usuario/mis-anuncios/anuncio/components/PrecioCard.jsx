import { MdOutlineModeEdit } from "react-icons/md";
import { formatPrecioCompleto } from "@/utils/formatPrecio";
import { DetalleCard } from "./DetalleCard";
import { CardActionLink } from "./CardActionLink";
import { useCardEdit, aEnteroSeguro } from "./useCardEdit";

const Stat = ({ children }) => (
  <>
    <div className="w-0.5 h-6 bg-segundo/40" />
    <p className="text-segundo">{children}</p>
  </>
);

const CAMPOS_NUMERICOS = [
  "administracion",
  "constructed_area",
  "private_area",
  "plot_area",
  "room_count",
  "bedroom_count",
  "bathroom_count",
  "social_bathroom_count",
];

const ETIQUETAS = {
  precio: "Precio (COP)",
  administracion: "Administración (COP /mes)",
  constructed_area: "Área construida (m²)",
  private_area: "Área privada (m²)",
  plot_area: "Área de lote (m²)",
  room_count: "Ambientes",
  bedroom_count: "Alcobas",
  bathroom_count: "Baños completos",
  social_bathroom_count: "Baños sociales",
};

const inputCls =
  "border border-segundo/50 p-2.5 w-full text-segundo bg-white";

function FilaNumero({ campo, valor, draft, editando, onChange }) {
  if (!editando && (valor === null || valor === undefined)) return null;
  if (editando && !(campo in (draft ?? {}))) return null;
  return (
    <label className="flex flex-col gap-1 min-w-40 flex-1">
      <span className="text-sm text-segundo/70">{ETIQUETAS[campo]}</span>
      {editando ? (
        <input
          type="number"
          min={0}
          value={draft?.[campo] ?? ""}
          onChange={(e) => onChange(campo, e.target.value)}
          className={inputCls}
        />
      ) : (
        <Stat>
          {campo === "precio" || campo === "administracion"
            ? formatPrecioCompleto(valor)
            : `${valor}${campo.includes("area") ? " m²" : ""}`}
        </Stat>
      )}
    </label>
  );
}

export function PrecioCard({ propiedad }) {
  // Solo lo presente es editable; el precio siempre (activar sin precio).
  const campos = [
    "precio",
    ...CAMPOS_NUMERICOS.filter((c) => propiedad?.[c] != null),
  ];
  const { editando, loading, draft, iniciar, cancelar, set, guardar } =
    useCardEdit(propiedad, campos);
  const esArriendo = propiedad?.operacion_slug === "arriendo";

  return (
    <DetalleCard
      title="Precio y características"
      action={
        editando ? (
          <div className="flex items-center gap-4 mt-4">
            <button
              type="button"
              onClick={() => guardar((campo, valor) => aEnteroSeguro(valor))}
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
            Modificar precio y datos
          </CardActionLink>
        )
      }
    >
      {editando ? (
        <div className="flex gap-4 mt-4 flex-wrap">
          {campos.map((campo) => (
            <FilaNumero
              key={campo}
              campo={campo}
              valor={propiedad?.[campo]}
              draft={draft}
              editando
              onChange={set}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-4 mt-4 flex-wrap">
          <p className="text-segundo font-bold">
            {propiedad?.precio != null ? (
              <>
                {formatPrecioCompleto(propiedad.precio)}
                {esArriendo ? "/mes" : ""}
              </>
            ) : (
              "Sin precio"
            )}
          </p>
          {propiedad?.administracion != null && (
            <Stat>Admón {formatPrecioCompleto(propiedad.administracion)}</Stat>
          )}
          {propiedad?.constructed_area != null && (
            <Stat>{propiedad.constructed_area} m² </Stat>
          )}
          {propiedad?.private_area != null && (
            <Stat>{propiedad.private_area} m² priv. </Stat>
          )}
          {propiedad?.plot_area != null && (
            <Stat>{propiedad.plot_area} m² lote </Stat>
          )}
          {propiedad?.room_count != null && (
            <Stat>{propiedad.room_count} amb. </Stat>
          )}
          {propiedad?.bedroom_count != null && (
            <Stat>{propiedad.bedroom_count} alc. </Stat>
          )}
          {propiedad?.bathroom_count != null && (
            <Stat>{propiedad.bathroom_count} baño(s) </Stat>
          )}
          {propiedad?.social_bathroom_count != null && (
            <Stat>{propiedad.social_bathroom_count} b. soc. </Stat>
          )}
          {propiedad?.price_per_sqm != null && (
            <Stat>{formatPrecioCompleto(propiedad.price_per_sqm)}/m² </Stat>
          )}
          {propiedad?.zona && <Stat>{propiedad.zona}</Stat>}
        </div>
      )}
    </DetalleCard>
  );
}

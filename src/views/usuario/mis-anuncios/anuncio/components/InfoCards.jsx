import { useState } from "react";
import { toast } from "sonner";
import { MdOutlineModeEdit } from "react-icons/md";
import { DetalleCard } from "./DetalleCard";
import { CardActionLink } from "./CardActionLink";
import { useCardEdit } from "./useCardEdit";
import { useCatalogos } from "./useCatalogos";
import usePropiedades from "@/hooks/usePropiedades";
import { DescriptionEditor } from "@/views/publicar-anuncio/paso-2/descripcion/DescriptionEditor";
import { stripTags } from "@/views/publicar-anuncio/paso-2/descripcion/editorConfig";
import UbicacionMapa from "@/views/anuncio/UbicacionMapa";
import AddressMapModal from "@/views/publicar-anuncio/paso-1/ubicacion/AddressMapModal";
import {
  armarPrecioInput,
  usePrecioSugerido,
} from "./usePrecioSugerido";
import { SugerenciaPrecio } from "./SugerenciaPrecio";

const inputCls =
  "border border-segundo/50 p-2.5 w-full text-segundo bg-white";

function AccionesEdicion({ loading, onGuardar, onCancelar }) {
  return (
    <div className="flex items-center gap-4 mt-4">
      <button
        type="button"
        onClick={onGuardar}
        disabled={loading}
        className="rounded-md bg-tercero px-6 py-2 text-sm md:text-base font-semibold text-primero hover:bg-tercero/80 active:scale-[0.99] cursor-pointer select-none font-montserrat disabled:opacity-50"
      >
        {loading ? "Guardando..." : "Guardar cambios"}
      </button>
      <button
        type="button"
        onClick={onCancelar}
        className="rounded-md bg-segundo px-6 py-2 text-sm md:text-base font-semibold text-primero hover:bg-segundo/80 active:scale-[0.99] cursor-pointer select-none font-montserrat"
      >
        Cancelar
      </button>
    </div>
  );
}

export function DireccionCard({ propiedad }) {
  // Solo texto en esta fase (ciudad/depto por selects van en Fase 3).
  const campos = [
    "direccion",
    "numero_direccion",
    "barrio_nombre",
    "latitude",
    "longitude",
  ].filter((c) => propiedad?.[c] != null);
  const hayCampos = campos.length > 0;
  const { editando, loading, draft, iniciar, cancelar, set, guardar } =
    useCardEdit(propiedad, hayCampos ? campos : ["direccion"]);
  const [mapaAbierto, setMapaAbierto] = useState(false);

  const lat = Number(propiedad?.latitude);
  const lng = Number(propiedad?.longitude);
  const tieneCoords = Number.isFinite(lat) && Number.isFinite(lng);

  const calle = [propiedad?.direccion, propiedad?.numero_direccion]
    .filter(Boolean)
    .join(" ");
  const partes = [
    calle || null,
    propiedad?.barrio_nombre || propiedad?.barrio || null,
    propiedad?.ciudad || null,
    propiedad?.departamento || null,
  ].filter(Boolean);

  return (
    <DetalleCard
      title="Dirección"
      action={
        editando ? (
          <AccionesEdicion
            loading={loading}
            onGuardar={() => guardar()}
            onCancelar={cancelar}
          />
        ) : (
          hayCampos && (
            <CardActionLink
              Icon={MdOutlineModeEdit}
              className="mt-4"
              onClick={iniciar}
            >
              Editar dirección
            </CardActionLink>
          )
        )
      }
    >
      {editando ? (
        <div className="flex flex-col gap-3 mt-4 max-w-96">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-segundo/70">Dirección</span>
            <input
              type="text"
              value={draft?.direccion ?? ""}
              onChange={(e) => set("direccion", e.target.value)}
              className={inputCls}
            />
          </label>
          {draft && "numero_direccion" in draft && (
            <label className="flex flex-col gap-1">
              <span className="text-sm text-segundo/70">Número / interior</span>
              <input
                type="text"
                value={draft?.numero_direccion ?? ""}
                onChange={(e) => set("numero_direccion", e.target.value)}
                className={inputCls}
              />
            </label>
          )}
          {draft && "barrio_nombre" in draft && (
            <label className="flex flex-col gap-1">
              <span className="text-sm text-segundo/70">Barrio</span>
              <input
                type="text"
                value={draft?.barrio_nombre ?? ""}
                onChange={(e) => set("barrio_nombre", e.target.value)}
                className={inputCls}
              />
            </label>
          )}
          <div className="flex flex-col gap-1">
            <span className="text-sm text-segundo/70">Ubicación en el mapa</span>
            <p className="text-sm text-segundo">
              {draft?.latitude != null &&
              draft?.longitude != null &&
              draft.latitude !== "" &&
              draft.longitude !== "" ? (
                <>
                  {Number(draft.latitude).toFixed(6)},{" "}
                  {Number(draft.longitude).toFixed(6)}
                </>
              ) : (
                "Sin marcar"
              )}
            </p>
            <button
              type="button"
              onClick={() => setMapaAbierto(true)}
              className="self-start text-sm md:text-base font-semibold text-decimo hover:text-decimo/80 cursor-pointer select-none hover:underline"
            >
              Marcar en el mapa
            </button>
          </div>
          <AddressMapModal
            open={mapaAbierto}
            onClose={() => setMapaAbierto(false)}
            onConfirm={({ lat, lng }) => {
              set("latitude", lat);
              set("longitude", lng);
              setMapaAbierto(false);
            }}
            initialPosition={
              draft?.latitude != null &&
              draft?.longitude != null &&
              draft.latitude !== "" &&
              draft.longitude !== ""
                ? {
                    lat: Number(draft.latitude),
                    lng: Number(draft.longitude),
                  }
                : tieneCoords
                  ? { lat, lng }
                  : null
            }
            fallbackPosition={{ latitude: 4.711, longitude: -74.0721 }}
          />
        </div>
      ) : (
        <>
          <p className="text-lg text-segundo mt-4">
            {partes.length > 0
              ? partes.join(", ")
              : "Este anuncio no tiene dirección registrada."}
          </p>
          {tieneCoords && (
            <div className="mt-4 max-w-xl">
              <UbicacionMapa lat={lat} lng={lng} zoom={17} />
            </div>
          )}
        </>
      )}
    </DetalleCard>
  );
}

export function DescripcionCard({ propiedad }) {
  const { editando, loading, draft, iniciar, cancelar, set, guardar } =
    useCardEdit(propiedad, ["description"]);
  // Se muestra formateada como la verá el visitante (el texto guarda HTML
  // del editor TipTap de creación). Vacía = sin texto real tras los tags.
  const html = propiedad?.description || "";
  const tieneTexto = stripTags(html).trim().length > 0;

  return (
    <DetalleCard
      title="Descripción"
      action={
        editando ? (
          <AccionesEdicion
            loading={loading}
            onGuardar={() => guardar()}
            onCancelar={cancelar}
          />
        ) : (
          <CardActionLink
            Icon={MdOutlineModeEdit}
            className="mt-4"
            onClick={iniciar}
          >
            Editar descripción o cambiar idioma
          </CardActionLink>
        )
      }
    >
      {editando ? (
        <div className="mt-4">
          <DescriptionEditor
            value={draft?.description ?? ""}
            onChange={(v) => set("description", v)}
            placeholder="Describe el inmueble: zona, acabados, estado, cercanía a servicios, ventajas, etc..."
          />
        </div>
      ) : tieneTexto ? (
        <div
          className="prose prose-lg max-w-none mt-4 text-segundo"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <p className="text-lg text-segundo mt-4">
          Todavía no has escrito un comentario
        </p>
      )}
    </DetalleCard>
  );
}

// Servicios / características N:M del catálogo (Seguridad, Confort...).
// Lectura desde `propiedad.caracteristicas` (viene en el GET); edición con
// el catálogo completo y guardado por reemplazo (POST /caracteristicas).
export function ServiciosCard({ propiedad }) {
  const { guardarCaracteristicasPropiedad, cargarPropiedad } = usePropiedades();
  const { datos: catalogos } = useCatalogos(["caracteristicas"]);
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activos, setActivos] = useState(null); // { code: valor }

  const actuales = propiedad?.caracteristicas ?? {};
  const esVentaServicios = propiedad?.operacion_slug !== "arriendo";
  // Sugerencia viva (solo venta): se recalcula al marcar/quitar servicios.
  const { sugerido, validacion, cargando } = usePrecioSugerido(
    armarPrecioInput(
      propiedad,
      {},
      Object.keys(activos ?? {}),
    ),
    {
      precioUsuario: propiedad?.precio ?? "",
      activo: editando && esVentaServicios,
    },
  );
  const categoriasActuales = Object.keys(actuales);
  const catalogo = catalogos.caracteristicas ?? {};
  const categoriasCatalogo = Object.keys(catalogo);

  const iniciar = () => {
    const base = {};
    for (const items of Object.values(actuales)) {
      for (const f of items) {
        base[f.code] =
          f.data_type === "numeric"
            ? (f.numeric_value ?? "")
            : f.data_type === "text"
              ? (f.text_value ?? "")
              : true;
      }
    }
    setActivos(base);
    setEditando(true);
  };

  const cancelar = () => {
    setActivos(null);
    setEditando(false);
  };

  const toggle = (code) => {
    setActivos((prev) => {
      const next = { ...(prev ?? {}) };
      if (next[code] !== undefined) delete next[code];
      else next[code] = true;
      return next;
    });
  };

  const setValor = (code, valor) => {
    setActivos((prev) => ({ ...(prev ?? {}), [code]: valor }));
  };

  const porCodigo = {};
  for (const items of Object.values(catalogo)) {
    for (const f of items) porCodigo[f.code] = f;
  }

  const guardar = async () => {
    const features = [];
    for (const [code, valor] of Object.entries(activos ?? {})) {
      const meta = porCodigo[code];
      if (!meta?.id) continue;
      if (meta.data_type === "numeric") {
        const n = Number(valor);
        if (!Number.isFinite(n)) continue;
        features.push({
          feature_id: meta.id,
          bool_value: true,
          numeric_value: n,
        });
      } else if (meta.data_type === "text") {
        if (!String(valor ?? "").trim()) continue;
        features.push({
          feature_id: meta.id,
          bool_value: true,
          text_value: String(valor).trim(),
        });
      } else if (valor) {
        features.push({ feature_id: meta.id, bool_value: true });
      }
    }
    setLoading(true);
    try {
      const res = await guardarCaracteristicasPropiedad(
        propiedad.id,
        features,
      );
      if (res?.success) {
        toast.success(res.message || "Servicios guardados correctamente.", {
          position: "bottom-right",
        });
        setActivos(null);
        setEditando(false);
        await cargarPropiedad(propiedad.id);
      } else {
        toast.error(res?.error || res?.message || "No se pudo guardar", {
          position: "bottom-right",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DetalleCard
      title="Servicios aplicados a este anuncio"
      action={
        editando ? (
          <AccionesEdicion
            loading={loading}
            onGuardar={guardar}
            onCancelar={cancelar}
          />
        ) : (
          <CardActionLink
            Icon={MdOutlineModeEdit}
            className="mt-4"
            onClick={iniciar}
          >
            {categoriasActuales.length > 0
              ? "Editar servicios"
              : "Agregar servicios"}
          </CardActionLink>
        )
      }
    >
      {editando ? (
        <>
          <div className="mt-4 flex flex-col gap-5">
            {categoriasCatalogo.length === 0 && (
              <p className="text-segundo/60">Cargando servicios...</p>
            )}
          {categoriasCatalogo.map((cat) => (
            <div key={cat}>
              <p className="text-sm font-bold text-segundo uppercase tracking-wide mb-2">
                {cat}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {catalogo[cat].map((f) => {
                  const activo = (activos ?? {})[f.code] !== undefined;
                  return (
                    <div
                      key={f.code}
                      className="flex items-center gap-2 text-segundo"
                    >
                      {f.data_type === "boolean" ? (
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={activo}
                            onChange={() => toggle(f.code)}
                            className="w-4 h-4 accent-[#b8860b]"
                          />
                          {f.label_es}
                        </label>
                      ) : (
                        <label className="flex flex-col gap-1 w-full">
                          <span className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={activo}
                              onChange={() =>
                                activo
                                  ? toggle(f.code)
                                  : setValor(f.code, "")
                              }
                              className="w-4 h-4 accent-[#b8860b]"
                            />
                            {f.label_es}
                          </span>
                          {activo && (
                            <input
                              type={f.data_type === "numeric" ? "number" : "text"}
                              value={(activos ?? {})[f.code] ?? ""}
                              onChange={(e) => setValor(f.code, e.target.value)}
                              placeholder={f.label_es}
                              className="border border-segundo/50 p-2 w-full text-segundo bg-white"
                            />
                          )}
                        </label>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          </div>
          {esVentaServicios && (
            <SugerenciaPrecio
              sugerido={sugerido}
              validacion={validacion}
              cargando={cargando}
            />
          )}
        </>
      ) : categoriasActuales.length > 0 ? (
        <div className="mt-4">
          {categoriasActuales.map((cat) => (
            <div key={cat} className="mb-3">
              <p className="text-sm font-bold text-segundo uppercase tracking-wide mb-1">
                {cat}
              </p>
              <p className="text-base md:text-lg text-segundo">
                {actuales[cat].map((f) => f.label_es).join(", ")}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-segundo mt-4">
          Actualmente no tienes productos contratados.
        </p>
      )}
    </DetalleCard>
  );
}

import { useEffect, useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import usePropiedades from "@/hooks/usePropiedades";
import { apiBackend } from "@/actions/apiBackend.js";

// El título se compone como en creación ("{Operación} de {Tipo} en
// {dirección}, {ciudad}, {depto}"). Se puede regenerar cuando cambian esos
// datos, o editarse a mano (pre-llenado, máx 120, como el Bloque 8 del wizard).
export function DetalleEstado({ propiedad, setLoading, onRecargar }) {
  const { actualizarPropiedad } = usePropiedades();
  const [sugerido, setSugerido] = useState(null);
  const [regenerando, setRegenerando] = useState(false);
  const [cambiandoEstado, setCambiandoEstado] = useState(false);
  const publicado = propiedad.estado === "publicado";

  const handleToggle = async (e) => {
    if (cambiandoEstado) return; // anti doble-clic
    setCambiandoEstado(true);
    try {
      const destino = publicado ? "no_publicado" : "publicado";
      const res = await actualizarPropiedad(e, propiedad.id, setLoading, {
        estado: destino,
      });
      if (res?.success) await onRecargar(propiedad.id);
    } finally {
      setCambiandoEstado(false);
    }
  };

  const claveTitulo = [
    propiedad?.property_type_id,
    propiedad?.city_id,
    propiedad?.state_id,
    propiedad?.direccion,
    propiedad?.operacion_slug,
  ]
    .map((v) => String(v ?? ""))
    .join("|");
  const puedeComponer =
    propiedad?.property_type_id != null &&
    propiedad?.city_id != null &&
    propiedad?.state_id != null &&
    !!propiedad?.direccion;

  useEffect(() => {
    if (!puedeComponer) return;
    let vivo = true;
    (async () => {
      const params = new URLSearchParams({
        propertyTypeId: String(propiedad.property_type_id),
        cityId: String(propiedad.city_id),
        stateId: String(propiedad.state_id),
        direccion: propiedad.direccion ?? "",
        operacion: propiedad.operacion_slug ?? "",
      });
      const res = await apiBackend(`/api/titulo-sugerido?${params.toString()}`);
      if (vivo)
        setSugerido({
          clave: claveTitulo,
          titulo: res?.success ? (res.data?.titulo ?? null) : null,
        });
    })();
    return () => {
      vivo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    propiedad?.id,
    propiedad?.property_type_id,
    propiedad?.city_id,
    propiedad?.state_id,
    propiedad?.direccion,
    propiedad?.operacion_slug,
  ]);

  const desactualizado =
    puedeComponer &&
    sugerido?.clave === claveTitulo &&
    sugerido?.titulo &&
    propiedad?.titulo &&
    sugerido.titulo !== propiedad.titulo;

  const regenerar = async () => {
    if (!sugerido?.titulo) return;
    setRegenerando(true);
    try {
      const res = await actualizarPropiedad(null, propiedad.id, setLoading, {
        titulo: sugerido.titulo,
      });
      if (res?.success) onRecargar(propiedad.id);
    } finally {
      setRegenerando(false);
    }
  };

  return (
    <div className="w-full py-5">
      <div className="w-9/12 mx-auto">
        <div className="flex items-start gap-3">
            <p className="text-xl md:text-2xl font-semibold text-segundo">
              {`${propiedad?.titulo || "Anuncio"}`}
            </p>
          </div>
        {desactualizado && (
          <div className="mt-3 bg-tercero/10 border border-tercero/30 rounded-md p-3 max-w-2xl">
            <p className="text-sm text-segundo">
              Tus cambios dejaron el título desactualizado. Nuevo título
              sugerido: <span className="font-semibold">{sugerido.titulo}</span>
            </p>
            <button
              type="button"
              onClick={regenerar}
              disabled={regenerando}
              className="mt-2 flex items-center gap-2 text-decimo font-semibold text-sm md:text-base cursor-pointer select-none hover:text-decimo/80 disabled:opacity-50"
            >
              <MdOutlineRefresh className="text-lg" />
              {regenerando ? "Regenerando..." : "Regenerar título"}
            </button>
          </div>
        )}
        <div className="bg-stone-100 mt-4 p-2 px-4 border border-segundo/20 w-max text-sm">
          <p className="font-semibold">
            {publicado ? "Anuncio publicado" : "Anuncio no publicado"}
          </p>
        </div>
        <p className="mt-6 text-segundo text-lg">
          {`Anuncio gratuito. (Cod. ${propiedad?.id})`}
        </p>

        <button
          type="button"
          onClick={handleToggle}
          disabled={cambiandoEstado}
          className="rounded-md bg-tercero px-6 py-2 text-lg md:text-lg font-semibold font-montserrat text-primero hover:bg-tercero/80 active:scale-[0.99] cursor-pointer select-none mt-2 md:mt-8 disabled:opacity-50 disabled:cursor-wait"
        >
          {cambiandoEstado
            ? "Guardando..."
            : publicado
              ? "Desactivar"
              : "Reactivar gratis"}
        </button>
      </div>
    </div>
  );
}

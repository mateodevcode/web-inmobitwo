"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  XCircle,
  Undo2,
  ExternalLink,
  Search,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { listarDescartados, restaurarPropiedad } from "@/actions/descartados";
import { removeDescartadoStore } from "@/hooks/descartadosStore";
import { formatPrecioCompleto } from "@/utils/formatPrecio";

// Tarjeta copiada de "Mis búsquedas" (TabMisBusquedas).
const CARD =
  "w-full md:w-190 bg-stone-50 shadow-sm shadow-segundo/20 p-6 md:p-8 flex flex-col justify-between border border-segundo/10";
const LINK_DECIMO =
  "inline-flex items-center gap-2 text-decimo hover:text-decimo/80 font-semibold text-base md:text-lg font-montserrat cursor-pointer select-none";
const BTN_OSCURO =
  "inline-flex items-center gap-2 text-primero bg-segundo hover:bg-segundo/80 rounded-md px-5 py-2.5 font-semibold font-montserrat cursor-pointer select-none active:scale-95 duration-75 transition disabled:opacity-50";

const aviso = (ok, msg) =>
  (ok ? toast.success : toast.error)(msg, { position: "bottom-right" });

function fechaCorta(iso) {
  return iso
    ? new Date(iso).toLocaleDateString("es-CO", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;
}

function TarjetaDescartado({ p, onRestaurada }) {
  const [guardando, setGuardando] = useState(false);

  const oferta = p.ofertas?.[0];
  const precio = oferta?.precio ?? p.precio_base;
  const esAlquiler = oferta?.operacion === "alquiler";
  const disponible = p.estado === "publicado" && (p.ofertas?.length ?? 0) > 0;
  const area = p.private_area ?? p.constructed_area;
  const ubicacion =
    [p.city_name, p.state_name].filter(Boolean).join(", ") || "Colombia";

  const restaurar = async () => {
    setGuardando(true);
    const r = await restaurarPropiedad(p.id);
    setGuardando(false);
    if (r?.success) {
      removeDescartadoStore(p.id); // para que vuelva a verse en listados
      aviso(true, "Anuncio restaurado.");
      onRestaurada(p.id);
    } else aviso(false, r?.error || "No se pudo restaurar.");
  };

  return (
    <section className={CARD}>
      <div className="flex gap-4 md:gap-6">
        <div className="w-28 h-24 md:w-44 md:h-32 shrink-0 bg-segundo/5 overflow-hidden">
          {p.portada_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.portada_url}
              alt={p.titulo || "Anuncio descartado"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-segundo/40 text-sm">
              Sin foto
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-segundo truncate">
            {p.titulo || "Inmueble en venta"}
          </h2>
          <p className="text-base md:text-lg mt-1 text-segundo/80">
            {ubicacion}
          </p>
          {precio != null && (
            <p className="text-lg md:text-xl font-bold text-segundo mt-1">
              {formatPrecioCompleto(precio)}
              {esAlquiler && "/mes"}
            </p>
          )}
          <p className="text-base text-segundo/80 mt-1">
            {[
              area && `${area} m²`,
              p.bedroom_count != null && `${p.bedroom_count} hab.`,
              p.bathroom_count != null && `${p.bathroom_count} baños`,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <p className="text-base md:text-lg mt-2 text-segundo/80">
            Descartado el {fechaCorta(p.fecha_descarte)}
          </p>
        </div>
      </div>

      {/* Caja de estado, mismo estilo que Mis búsquedas */}
      <div className="flex items-center gap-4 bg-segundo/5 p-4 px-6 my-4">
        {disponible ? (
          <CheckCircle2 size={22} className="text-segundo shrink-0" />
        ) : (
          <AlertTriangle size={22} className="text-segundo shrink-0" />
        )}
        <p className="text-base md:text-lg font-semibold text-segundo">
          {disponible ? "Anuncio disponible" : "Anuncio ya no disponible"}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
        <button
          className={BTN_OSCURO}
          disabled={guardando}
          onClick={restaurar}
        >
          <Undo2 size={18} /> Restaurar
        </button>
        {disponible && (
          <Link href={`/inmueble/${p.id}`} className={LINK_DECIMO}>
            <ExternalLink size={20} /> Ver anuncio
          </Link>
        )}
      </div>
    </section>
  );
}

export default function TabDescartados() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    listarDescartados().then((r) => setItems(r?.success ? r.data : []));
  }, []);

  return (
    <div>
      {/* Cabecera, mismo patrón que Mis búsquedas */}
      <div className="flex items-start md:items-center my-8 gap-4 text-decimo select-none">
        <XCircle className="text-xl md:text-2xl" />
        <p className="text-base md:text-xl font-semibold font-montserrat">
          Anuncios que has descartado
        </p>
      </div>

      {items === null ? (
        <p className="text-segundo/60">Cargando tus descartados...</p>
      ) : items.length === 0 ? (
        <section className={`${CARD} space-y-4`}>
          <h2 className="text-xl font-bold text-segundo">
            Aún no has descartado ningún anuncio
          </h2>
          <p className="text-base md:text-lg text-segundo/80">
            Pulsa &quot;Descartar&quot; en un anuncio para dejar de verlo en
            tus búsquedas. Aquí podrás recuperarlo cuando quieras.
          </p>
          <div>
            <Link href="/" className={BTN_OSCURO}>
              <Search size={18} /> Buscar viviendas
            </Link>
          </div>
        </section>
      ) : (
        <div className="space-y-6 md:space-y-8">
          {items.map((p) => (
            <TarjetaDescartado
              key={p.id}
              p={p}
              onRestaurada={(id) =>
                setItems((l) => l.filter((x) => x.id !== id))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

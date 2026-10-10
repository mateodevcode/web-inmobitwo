"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Bell, Pause, Play, Trash2, ExternalLink, Search, AlertTriangle, CheckCircle2 } from "lucide-react";
import {
  listarBusquedas, actualizarBusqueda, eliminarBusqueda,
} from "@/actions/busquedasGuardadas";

// Tarjeta copiada de "Tus datos" / "Email de acceso" (perfil y acceso).
const CARD =
  "w-full md:w-190 bg-stone-50 shadow-sm shadow-segundo/20 p-6 md:p-8 flex flex-col justify-between border border-segundo/10";
const LINK_DECIMO =
  "inline-flex items-center gap-2 text-decimo hover:text-decimo/80 font-semibold text-base md:text-lg font-montserrat cursor-pointer select-none";
const BTN_OSCURO =
  "inline-flex items-center gap-2 text-primero bg-segundo hover:bg-segundo/80 rounded-md px-5 py-2.5 font-semibold font-montserrat cursor-pointer select-none active:scale-95 duration-75 transition disabled:opacity-50";

const FRECUENCIAS = {
  inmediata: "Lo antes posible (cada ~15 min)",
  diaria: "Resumen diario",
  semanal: "Resumen semanal",
};

const aviso = (ok, msg) =>
  (ok ? toast.success : toast.error)(msg, { position: "bottom-right" });

function fechaCorta(iso) {
  return iso
    ? new Date(iso).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" })
    : null;
}

function TarjetaBusqueda({ b, onCambio, onBorrada }) {
  const [guardando, setGuardando] = useState(false);
  const [confirmando, setConfirmando] = useState(false);
  const activa = b.estado === "activa";

  const patch = async (data) => {
    setGuardando(true);
    const r = await actualizarBusqueda(b.id, data);
    setGuardando(false);
    if (r?.success) onCambio(r.data);
    else aviso(false, r?.error || "No se pudo actualizar.");
  };

  const borrar = async () => {
    setGuardando(true);
    const r = await eliminarBusqueda(b.id);
    setGuardando(false);
    if (r?.success) { aviso(true, "Búsqueda eliminada."); onBorrada(b.id); }
    else aviso(false, r?.error || "No se pudo eliminar.");
  };

  return (
    <section className={CARD}>
      <div>
        <h2 className="text-xl font-bold text-segundo">{b.nombre}</h2>
        <p className="text-base md:text-lg mt-2 text-segundo/80">
          Creada el {fechaCorta(b.created_at)}
          {b.last_sent_at && <> · Último aviso el {fechaCorta(b.last_sent_at)}</>}
        </p>
      </div>

      {/* Caja de estado, mismo estilo que "Email sin verificar" */}
      <div className="flex items-center gap-4 bg-segundo/5 p-4 px-6 my-4">
        {activa
          ? <CheckCircle2 size={22} className="text-segundo shrink-0" />
          : <AlertTriangle size={22} className="text-segundo shrink-0" />}
        <p className="text-base md:text-lg font-semibold text-segundo">
          {activa ? "Alertas activas" : "Alertas pausadas"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-segundo">
          <span className="block font-semibold mb-1">Frecuencia de aviso</span>
          <select
            value={b.frecuencia}
            disabled={guardando}
            onChange={(e) => patch({ frecuencia: e.target.value })}
            className="w-full border border-segundo/20 bg-white rounded-md px-3 py-3 disabled:opacity-50"
          >
            {Object.entries(FRECUENCIAS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </label>

        <div className="text-segundo">
          <span className="block font-semibold mb-1">Canales</span>
          <label className="flex items-center gap-2 py-2">
            <input
              type="checkbox"
              checked={b.canal_email}
              disabled={guardando}
              onChange={(e) => patch({ canalEmail: e.target.checked })}
              className="size-4 accent-black"
            />
            Email
          </label>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4">
        <button className={BTN_OSCURO} disabled={guardando}
          onClick={() => patch({ estado: activa ? "pausada" : "activa" })}>
          {activa ? <Pause size={18} /> : <Play size={18} />}
          {activa ? "Pausar alertas" : "Reanudar alertas"}
        </button>

        <Link href={b.url_original} className={LINK_DECIMO}>
          <ExternalLink size={20} /> Ver resultados
        </Link>

        {!confirmando ? (
          <button onClick={() => setConfirmando(true)}
            className="inline-flex items-center gap-2 text-red-600 hover:underline font-medium text-base md:text-lg ml-auto cursor-pointer select-none">
            <Trash2 size={20} /> Eliminar
          </button>
        ) : (
          <span className="inline-flex items-center gap-3 ml-auto text-base md:text-lg text-segundo">
            ¿Eliminar?
            <button onClick={borrar} disabled={guardando} className="text-red-600 font-semibold hover:underline cursor-pointer select-none disabled:opacity-50">Sí, eliminar</button>
            <button onClick={() => setConfirmando(false)} className="text-segundo/60 hover:underline cursor-pointer select-none">Cancelar</button>
          </span>
        )}
      </div>
    </section>
  );
}

export default function TabMisBusquedas() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    listarBusquedas().then((r) => setItems(r?.success ? r.data : []));
  }, []);

  return (
    <div>
      {/* Cabecera, mismo patrón que el enlace de Perfil (sin hover: no es enlace) */}
      <div className="flex items-start md:items-center my-8 gap-4 text-decimo select-none">
        <Bell className="text-xl md:text-2xl" />
        <p className="text-base md:text-xl font-semibold font-montserrat">
          Alertas de tus búsquedas guardadas
        </p>
      </div>

      {items === null ? (
        <p className="text-segundo/60">Cargando tus búsquedas...</p>
      ) : items.length === 0 ? (
        <section className={`${CARD} space-y-4`}>
          <h2 className="text-xl font-bold text-segundo">Aún no tienes búsquedas guardadas</h2>
          <p className="text-base md:text-lg text-segundo/80">
            Busca viviendas y pulsa &quot;Guardar búsqueda&quot; para recibir un email cuando haya
            anuncios nuevos, bajen de precio o vuelvan a estar disponibles.
          </p>
          <div>
            <Link href="/" className={BTN_OSCURO}><Search size={18} /> Buscar viviendas</Link>
          </div>
        </section>
      ) : (
        <div className="space-y-6 md:space-y-8">
          {items.map((b) => (
            <TarjetaBusqueda
              key={b.id}
              b={b}
              onCambio={(nuevo) => setItems((l) => l.map((x) => (x.id === nuevo.id ? nuevo : x)))}
              onBorrada={(id) => setItems((l) => l.filter((x) => x.id !== id))}
            />
          ))}
        </div>
      )}
    </div>
  );
}

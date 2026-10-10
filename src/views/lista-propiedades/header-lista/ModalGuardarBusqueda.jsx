"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { crearBusqueda } from "@/actions/busquedasGuardadas";
import { suscribirPush, PUSH_HABILITADO } from "@/lib/push";

function nombreAutomatico(pathname = "") {
  const partes = pathname.split("/").filter(Boolean).map((s) => s.replace(/-/g, " "));
  const txt = partes.join(" · ");
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}

export default function ModalGuardarBusqueda({ filtros, urlOriginal, pathname, onClose, onGuardada }) {
  const [nombre, setNombre] = useState(nombreAutomatico(pathname));
  const [frecuencia, setFrecuencia] = useState("diaria");
  const [canalEmail, setCanalEmail] = useState(true);
  const [canalPush, setCanalPush] = useState(false);
  const [acepta, setAcepta] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const guardar = async () => {
    if (!acepta) return toast.error("Debes aceptar el tratamiento de datos.", { position: "bottom-right" });
    if (!canalEmail && !canalPush) return toast.error("Elige al menos un canal.", { position: "bottom-right" });
    setEnviando(true);
    if (canalPush && PUSH_HABILITADO) {
      const ps = await suscribirPush();
      if (!ps?.success) {
        setEnviando(false);
        return toast.error(ps?.error || "No se pudo activar push.", { position: "bottom-right" });
      }
    }
    const r = await crearBusqueda({
      nombre, filtros, urlOriginal, frecuencia, canalEmail, canalPush, aceptaTerminos: true,
    });
    setEnviando(false);
    if (r?.success) {
      toast.success("Búsqueda guardada. Te avisaremos por email.", { position: "bottom-right" });
      onGuardada?.(r.data);
    } else {
      toast.error(r?.error || r?.message || "No se pudo guardar.", { position: "bottom-right" });
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold">Guardar búsqueda</h2>
        <p className="text-sm text-neutral-600">
          Te avisaremos cuando haya viviendas nuevas, bajen de precio o vuelvan a estar disponibles.
        </p>

        <label className="block text-sm font-medium">Nombre
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} maxLength={160}
            className="mt-1 w-full border rounded-lg px-3 py-2" />
        </label>

        <label className="block text-sm font-medium">Frecuencia
          <select value={frecuencia} onChange={(e) => setFrecuencia(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2">
            <option value="inmediata">Lo antes posible (cada ~15 min)</option>
            <option value="diaria">Resumen diario</option>
            <option value="semanal">Resumen semanal</option>
          </select>
        </label>

        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={canalEmail} onChange={(e) => setCanalEmail(e.target.checked)} /> Email
          </label>
          <label className={`flex items-center gap-2 ${PUSH_HABILITADO ? "" : "opacity-50"}`}>
            <input type="checkbox" disabled={!PUSH_HABILITADO} checked={canalPush}
              onChange={(e) => setCanalPush(e.target.checked)} />
            Notificación push {!PUSH_HABILITADO && <span className="text-xs">(próximamente)</span>}
          </label>
        </div>

        <label className="flex items-start gap-2 text-xs text-neutral-600">
          <input type="checkbox" checked={acepta} onChange={(e) => setAcepta(e.target.checked)} className="mt-0.5" />
          <span>Autorizo el tratamiento de mis datos para enviarme alertas de esta búsqueda, conforme a la política
            de tratamiento de datos personales (Habeas Data). Puedo darme de baja en cualquier momento.</span>
        </label>

        <div className="flex gap-2 justify-end pt-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">Cancelar</button>
          <button onClick={guardar} disabled={enviando}
            className="px-4 py-2 rounded-lg bg-black text-white font-bold disabled:opacity-50">
            {enviando ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

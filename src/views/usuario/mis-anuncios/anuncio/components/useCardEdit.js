import { useState } from "react";
import { toast } from "sonner";
import usePropiedades from "@/hooks/usePropiedades";

// Edición inline por tarjeta: snapshot para Cancelar y guardado parcial
// (solo los campos de la tarjeta viajan en el PATCH).
export const useCardEdit = (propiedad, campos) => {
  const { actualizarPropiedad, cargarPropiedad } = usePropiedades();
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState(null);

  const iniciar = () => {
    const base = {};
    for (const campo of campos) base[campo] = propiedad?.[campo] ?? "";
    setDraft(base);
    setEditando(true);
  };

  const cancelar = () => {
    setDraft(null);
    setEditando(false);
  };

  const set = (campo, valor) => {
    setDraft((prev) => ({ ...(prev ?? {}), [campo]: valor }));
  };

  // Envía solo campos con valor (el backend ignora undefined/null/"").
  // `normalizar` opcional con firma (campo, valor) => valor listo para el PATCH.
  const guardar = async (normalizar) => {
    const payload = {};
    for (const [campo, valor] of Object.entries(draft ?? {})) {
      const v = normalizar ? normalizar(campo, valor) : valor;
      if (v === undefined || v === null || v === "") continue;
      payload[campo] = v;
    }
    if (Object.keys(payload).length === 0) {
      toast.warning("No hay cambios para guardar", {
        position: "bottom-right",
      });
      return { success: false };
    }
    const res = await actualizarPropiedad(
      null,
      propiedad.id,
      setLoading,
      payload,
    );
    if (res?.success) {
      setDraft(null);
      setEditando(false);
      await cargarPropiedad(propiedad.id);
    } else {
      toast.error(res?.error || "No se pudo guardar", {
        position: "bottom-right",
      });
    }
    return res;
  };

  return { editando, loading, draft, iniciar, cancelar, set, guardar };
};

// Inputs numéricos llegan como string: a número si hay valor, si no se omite.
export const aNumeroPatch = (valor) => {
  if (valor === "" || valor === null || valor === undefined) return undefined;
  const n = Number(valor);
  return Number.isFinite(n) ? n : valor;
};

// Enteros de dinero/áreas/conteos: el backend hace parseInt crudo al precio
// (400 si lleva "$", espacios o letras) y "1.500.000" lo truncaría a 1.
// Se queda solo con dígitos: "$ 1.500.000" → 1500000, "abc" → se omite.
export const aEnteroSeguro = (valor) => {
  if (valor === "" || valor === null || valor === undefined) return undefined;
  const digitos = String(valor).replace(/[^\d]/g, "");
  if (!digitos) return undefined;
  return parseInt(digitos, 10);
};

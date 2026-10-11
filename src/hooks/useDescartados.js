import { toast } from "sonner";
import {
  descartarPropiedad,
  restaurarPropiedad,
  idsDescartados,
} from "@/actions/descartados";
import {
  setDescartadosStore,
  addDescartadoStore,
  removeDescartadoStore,
} from "@/hooks/descartadosStore";

const aviso = { position: "bottom-right" };

const useDescartados = () => {
  const estaDescartado = (ids, id) => (ids ?? []).includes(Number(id));

  const cargarDescartados = async () => {
    try {
      const r = await idsDescartados();
      if (r?.success) setDescartadosStore(r.data);
    } catch (error) {
      console.error("Error cargando descartados:", error);
    }
  };

  const handleRestaurar = async (e, id) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    removeDescartadoStore(id); // optimista
    try {
      const r = await restaurarPropiedad(id);
      if (!r?.success) throw new Error(r?.error || "restore-failed");
      toast.success("Anuncio restaurado.", aviso);
    } catch {
      addDescartadoStore(id); // rollback
      toast.error("No se pudo restaurar el anuncio.", aviso);
    }
  };

  const handleDescartar = async (e, id) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    // Sin sesión: igual que handleFavorito (useFavoritos.js) — se llama al
    // endpoint y el backend responde 401, que se muestra como toast.
    // No hay modal de login ni redirección en ese flujo.
    addDescartadoStore(id); // optimista
    try {
      const r = await descartarPropiedad(id);
      if (!r?.success) throw new Error(r?.error || "discard-failed");
      toast("Anuncio descartado.", {
        ...aviso,
        action: { label: "Deshacer", onClick: () => handleRestaurar(null, id) },
      });
    } catch (error) {
      removeDescartadoStore(id); // rollback
      toast.error(error?.message || "No se pudo descartar el anuncio.", aviso);
    }
  };

  return {
    cargarDescartados,
    handleDescartar,
    handleRestaurar,
    estaDescartado,
  };
};

export default useDescartados;

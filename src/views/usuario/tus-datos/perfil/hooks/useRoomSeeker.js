import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "@/context/AppContext";
import { apiBackend } from "@/actions/apiBackend.js";

const PERFIL_VACIO = {
  genero: null,
  edad: null,
  ocupacion: null,
  fuma_en_casa: null,
  tiene_mascota: null,
  busca_con: "solo_yo",
  presupuesto_max: null,
  state_id: null,
  city_id: null,
  fecha_entrada: null,
  habitacion_privada: null,
  amoblada: null,
  bano_privado: null,
};

export const useRoomSeeker = () => {
  const { usuario, iniciarCarga, terminarCarga } = useAppContext();
  const [perfil, setPerfil] = useState(null); // null = sin perfil / aún no cargado
  const [existe, setExiste] = useState(false);
  const [cargado, setCargado] = useState(false);
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);
  const [borrando, setBorrando] = useState(false);
  const snapshotRef = useRef(null);

  const usuarioId = usuario?.id ?? null;

  const cargar = async (id) => {
    if (!id) return;
    try {
      iniciarCarga();
      const res = await apiBackend("/room-seeker/me");
      if (res.success) {
        setPerfil(res.data ?? null);
        setExiste(!!res.data);
      } else {
        toast.error(res.error || "No se pudo cargar tu perfil de habitación", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Error cargando perfil de habitación:", error);
    } finally {
      setCargado(true);
      terminarCarga();
    }
  };

  // Carga inicial tras hidratar la sesión (mismo patrón que usePerfilForm
  // y AppProvider): el setState ocurre tras el await dentro de `cargar`,
  // no sincrónico en el efecto.
  useEffect(() => {
    if (usuarioId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      cargar(usuarioId);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuarioId]);

  const iniciarEdicion = () => {
    snapshotRef.current = perfil ? { ...perfil } : { ...PERFIL_VACIO };
    setEditando(true);
  };

  const cancelarEdicion = () => {
    if (snapshotRef.current && existe) setPerfil(snapshotRef.current);
    snapshotRef.current = null;
    setEditando(false);
  };

  // Cambios locales del formulario (no guardan en backend).
  const setCampo = (campo, valor) => {
    setPerfil((prev) => ({ ...(prev ?? PERFIL_VACIO), [campo]: valor }));
  };

  const guardar = async (e) => {
    e?.preventDefault?.();
    const cuerpo = {};
    for (const campo of Object.keys(PERFIL_VACIO)) {
      const v = perfil?.[campo];
      // "" de los inputs = limpiar (null); undefined = no tocar.
      cuerpo[campo] = v === "" ? null : (v ?? null);
    }
    // No mandar ids de geo en null si nunca se eligieron: el backend los
    // acepta como null, así que se envían tal cual para permitir limpiar.
    try {
      iniciarCarga();
      setLoading(true);
      const res = await apiBackend("/room-seeker/me", "PUT", cuerpo);
      if (res.success) {
        setPerfil(res.data ?? null);
        setExiste(true);
        snapshotRef.current = null;
        setEditando(false);
        toast.success(res.message || "Perfil guardado correctamente.", {
          position: "bottom-right",
        });
      } else {
        toast.error(res.error || "No se pudo guardar tu perfil", {
          position: "bottom-right",
        });
      }
      return res;
    } catch (error) {
      console.error("Error guardando perfil de habitación:", error);
      toast.error("No se pudo guardar tu perfil", {
        position: "bottom-right",
      });
      return { success: false };
    } finally {
      terminarCarga();
      setLoading(false);
    }
  };

  const eliminar = async () => {
    try {
      iniciarCarga();
      setBorrando(true);
      const res = await apiBackend("/room-seeker/me", "DELETE");
      if (res.success) {
        setPerfil(null);
        setExiste(false);
        setEditando(false);
        toast.success(res.message || "Perfil borrado correctamente.", {
          position: "bottom-right",
        });
      } else {
        toast.error(res.error || "No se pudo borrar tu perfil", {
          position: "bottom-right",
        });
      }
      return res;
    } catch (error) {
      console.error("Error borrando perfil de habitación:", error);
      toast.error("No se pudo borrar tu perfil", {
        position: "bottom-right",
      });
      return { success: false };
    } finally {
      terminarCarga();
      setBorrando(false);
    }
  };

  return {
    perfil,
    existe,
    cargado,
    editando,
    loading,
    borrando,
    iniciarEdicion,
    cancelarEdicion,
    setCampo,
    guardar,
    eliminar,
    recargar: () => cargar(usuarioId),
  };
};

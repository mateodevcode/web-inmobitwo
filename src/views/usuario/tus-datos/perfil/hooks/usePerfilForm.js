import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "@/context/AppContext";
import { apiBackend } from "@/actions/apiBackend.js";
import useUsuarios from "@/hooks/useUsuarios";
import { mapearApiAFormDataUsuario } from "@/hooks/useResetForm";

export const usePerfilForm = () => {
  const {
    usuario,
    iniciarCarga,
    setFormDataUsuario,
    terminarCarga,
    formDataUsuario,
  } = useAppContext();
  const [editarUsuario, setEditarUsuario] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleChange, actualizarUsuario, handleChangeFile } = useUsuarios();
  const [imagenPrincipal, setImagenPrincipal] = useState(null);
  const [previewPrincipal, setPreviewPrincipal] = useState(null);
  const [eliminarFoto, setEliminarFoto] = useState(false);
  // Snapshot para revertir con "Cancelar" sin refetch.
  const snapshotRef = useRef(null);

  const usuarioId = usuario?.id ?? formDataUsuario?.id ?? "";

  const cargarUsuario = async (usuarioId) => {
    if (!usuarioId) return;
    try {
      iniciarCarga();
      const res = await apiBackend(
        `/usuarios/${usuarioId}?fields=id,name,email,telefono,image_url,public_id`,
      );
      const { success, data, error, message } = res;
      if (success && data) {
        setFormDataUsuario(mapearApiAFormDataUsuario(data));
      } else {
        toast.error(error || message || "No se pudieron cargar tus datos", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Error cargando usuario:", error);
      toast.error("No se pudieron cargar tus datos", {
        position: "bottom-right",
      });
    } finally {
      terminarCarga();
    }
  };

  useEffect(() => {
    if (usuarioId) {
      cargarUsuario(usuarioId);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuarioId]);

  // Libera la URL temporal anterior para no fugar memoria.
  useEffect(() => {
    return () => {
      if (previewPrincipal?.startsWith?.("blob:")) {
        URL.revokeObjectURL(previewPrincipal);
      }
    };
  }, [previewPrincipal]);

  const iniciarEdicion = () => {
    snapshotRef.current = { ...formDataUsuario };
    setEditarUsuario(true);
  };

  const handleArchivo = (e) => {
    const file = e?.target?.files?.[0];
    if (previewPrincipal?.startsWith?.("blob:")) {
      URL.revokeObjectURL(previewPrincipal);
    }
    handleChangeFile(e, setImagenPrincipal, setPreviewPrincipal);
    // Si se eligió un archivo válido, ya no hay eliminación pendiente.
    if (file?.type?.startsWith?.("image/")) {
      setEliminarFoto(false);
    }
  };

  const handleCancelar = () => {
    if (snapshotRef.current) {
      setFormDataUsuario(snapshotRef.current);
    } else if (usuarioId) {
      cargarUsuario(usuarioId);
    }
    if (previewPrincipal?.startsWith?.("blob:")) {
      URL.revokeObjectURL(previewPrincipal);
    }
    setImagenPrincipal(null);
    setPreviewPrincipal(null);
    setEliminarFoto(false);
    snapshotRef.current = null;
    setEditarUsuario(false);
  };

  // Solo lo que edita esta pantalla. Enviar el form entero incluía
  // `telefonos: []`, `rol`, `email_verificado`... y el backend rechaza
  // el array vacío ("Uno de los teléfonos no tiene un formato válido")
  // o peor: pone `telefono` a null en BD. Misma regex que el backend.
  const TELEFONO_REGEX = /^[0-9+\-\s()]{6,20}$/;

  const handleGuardar = async (e) => {
    const nombre = formDataUsuario?.name?.trim() ?? "";
    if (nombre.length < 3) {
      toast.error("El nombre debe tener al menos 3 caracteres.", {
        position: "bottom-right",
      });
      return;
    }
    const telefonoLimpio = formDataUsuario?.telefono?.trim() ?? "";
    if (telefonoLimpio && !TELEFONO_REGEX.test(telefonoLimpio)) {
      toast.error("El teléfono no tiene un formato válido.", {
        position: "bottom-right",
      });
      return;
    }
    // Sin teléfono => se omite (el backend no acepta "" ni null).
    const payload = telefonoLimpio
      ? { name: nombre, telefono: telefonoLimpio }
      : { name: nombre };

    const res = await actualizarUsuario(
      e,
      formDataUsuario?.id || usuarioId,
      setLoading,
      payload,
      imagenPrincipal,
      eliminarFoto,
    );
    if (res?.success) {
      setEditarUsuario(false);
      setEliminarFoto(false);
      setImagenPrincipal(null);
      if (previewPrincipal?.startsWith?.("blob:")) {
        URL.revokeObjectURL(previewPrincipal);
      }
      setPreviewPrincipal(null);
      snapshotRef.current = null;
      // Refresca el form con lo que devolvió el backend (ej. nueva image_url).
      if (res?.data && typeof res.data === "object") {
        setFormDataUsuario(mapearApiAFormDataUsuario(res.data));
      }
    }
  };

  const handleEliminarFoto = () => {
    setFormDataUsuario((prev) => ({
      ...prev,
      image_url: null,
      public_id: null,
    }));
    if (previewPrincipal?.startsWith?.("blob:")) {
      URL.revokeObjectURL(previewPrincipal);
    }
    setImagenPrincipal(null);
    setPreviewPrincipal(null);
    setEliminarFoto(true);
  };

  return {
    usuario,
    formDataUsuario,
    editarUsuario,
    setEditarUsuario,
    iniciarEdicion,
    loading,
    handleChange,
    handleChangeFile: handleArchivo,
    imagenPrincipal,
    setImagenPrincipal,
    previewPrincipal,
    setPreviewPrincipal,
    handleGuardar,
    handleCancelar,
    handleEliminarFoto,
  };
};

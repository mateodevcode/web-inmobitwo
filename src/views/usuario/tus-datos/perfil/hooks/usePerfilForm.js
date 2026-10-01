import { useEffect, useState } from "react";
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

  const cargarUsuario = async (usuarioId) => {
    try {
      iniciarCarga();
      const res = await apiBackend(
        `/usuarios/${usuarioId}?fields=id,name,email,telefono,image_url,public_id`,
      );
      const { success, data } = res;
      if (success) {
        setFormDataUsuario(mapearApiAFormDataUsuario(data));
      }
    } catch (error) {
      console.error("Error cargando propiedad:", error);
    } finally {
      terminarCarga();
    }
  };

  useEffect(() => {
    if (usuario.id) {
      cargarUsuario(usuario.id);
      return;
    }
  }, [usuario.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleGuardar = async (e) => {
    const res = await actualizarUsuario(
      e,
      formDataUsuario.id,
      setLoading,
      formDataUsuario,
      imagenPrincipal,
      eliminarFoto,
    );
    if (res?.success) {
      setEditarUsuario(false);
      setEliminarFoto(false);
      setImagenPrincipal(null);
    }
  };

  const handleEliminarFoto = () => {
    setFormDataUsuario((prev) => ({
      ...prev,
      image_url: null,
      public_id: null,
    }));
    setEliminarFoto(true);
  };

  return {
    usuario,
    formDataUsuario,
    editarUsuario,
    setEditarUsuario,
    loading,
    handleChange,
    handleChangeFile,
    setImagenPrincipal,
    setPreviewPrincipal,
    handleGuardar,
    handleEliminarFoto,
  };
};

import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { apiBackend } from "@/actions/apiBackend.js";
import useUsuarios from "@/hooks/useUsuarios";
import { mapearApiAFormDataUsuario } from "@/hooks/useResetForm";

export const useVerificacionEmail = () => {
  const {
    usuario,
    iniciarCarga,
    terminarCarga,
    setFormDataUsuario,
    formDataUsuario,
  } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [codigoInput, setCodigoInput] = useState("");
  const {
    enviarCodigoVerificacion,
    confirmarCodigoVerificacion,
    desactivarVerificacionEmail,
  } = useUsuarios();

  // El id del usuario vive en la sesión (contexto, viene del login).
  // `formDataUsuario` nunca trae `id`: el estado inicial no lo incluye y
  // `mapearApiAFormDataUsuario` lo descarta al recargar. Usarlo directo
  // mandaba las peticiones a /usuarios/undefined/... (404) y el correo
  // nunca se enviaba.

  const cargarUsuario = async (usuarioId) => {
    try {
      iniciarCarga();
      const res = await apiBackend(
        `/usuarios/${usuarioId}?fields=id,name,email,telefono,email_verificado`,
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

  const usuarioId = usuario?.id ?? formDataUsuario?.id;

  const handleEnviarCodigo = async () => {
    if (!usuarioId) return;
    const res = await enviarCodigoVerificacion(usuarioId, setLoading);
    if (res?.success) {
      setCodigoEnviado(true);
    }
  };

  const handleConfirmarCodigo = async (e) => {
    e.preventDefault();
    if (codigoInput.trim().length !== 6) return;
    if (!usuarioId) return;

    const res = await confirmarCodigoVerificacion(
      usuarioId,
      setLoading,
      codigoInput.trim(),
    );

    if (res?.success) {
      setFormDataUsuario((prev) => ({ ...prev, email_verificado: true }));
      setCodigoEnviado(false);
      setCodigoInput("");
    }
  };

  const handleDesactivar = async () => {
    if (!usuarioId) return;
    const res = await desactivarVerificacionEmail(usuarioId, setLoading);
    if (res?.success) {
      setFormDataUsuario((prev) => ({ ...prev, email_verificado: false }));
      setCodigoEnviado(false);
      setCodigoInput("");
    }
  };

  return {
    usuario,
    formDataUsuario,
    loading,
    codigoEnviado,
    codigoInput,
    setCodigoInput,
    cargarUsuario,
    handleEnviarCodigo,
    handleConfirmarCodigo,
    handleDesactivar,
  };
};

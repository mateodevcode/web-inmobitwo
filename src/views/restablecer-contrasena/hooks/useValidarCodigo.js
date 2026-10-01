import { useState } from "react";
import { toast } from "sonner";
import { apiBackend } from "@/actions/apiBackend.js";

const EMAIL_RE = /\S+@\S+\.\S+/;

export function useValidarCodigo(emailInicial = "") {
  const [email, setEmail] = useState(emailInicial);
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [idReset, setIdReset] = useState(null);

  const validar = async () => {
    const value = email.trim().toLowerCase();
    if (!value) {
      toast.error("Por favor, ingresa un email.", { position: "bottom-right" });
      return null;
    }
    if (!EMAIL_RE.test(value)) {
      toast.error("Por favor, ingresa un email válido.", { position: "bottom-right" });
      return null;
    }
    if (!/^\d{6}$/.test(codigo.trim())) {
      toast.error("El código de verificación debe tener 6 dígitos numéricos.", {
        position: "bottom-right",
      });
      return null;
    }

    setLoading(true);
    try {
      const res = await apiBackend("/api/validar-codigo", "POST", {
        email: value,
        codigoVerificacion: codigo.trim(),
      });
      if (res.success === true) {
        toast.success(res.message, { position: "top-right" });
        setIdReset(res.data);
        return res.data;
      }
      toast.error("No se pudo validar el código:", {
        description: res.error,
        position: "bottom-right",
      });
      return null;
    } catch {
      toast.error("No se pudo conectar con el servidor.", { position: "bottom-right" });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, codigo, setCodigo, loading, idReset, validar };
}

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiBackend } from "@/actions/apiBackend.js";

const EMAIL_RE = /\S+@\S+\.\S+/;

export function useSolicitarCodigo(emailInicial = "") {
  const router = useRouter();
  const [email, setEmail] = useState(emailInicial);
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const solicitar = async () => {
    const value = email.trim().toLowerCase();
    if (!value) {
      toast.error("Por favor, ingresa un email.", { position: "bottom-right" });
      return;
    }
    if (!EMAIL_RE.test(value)) {
      toast.error("Por favor, ingresa un email válido.", { position: "bottom-right" });
      return;
    }

    setLoading(true);
    try {
      const res = await apiBackend("/api/generar-codigo", "PATCH", { email: value });
      if (res.success === true) {
        toast.success(res.message, { position: "top-right" });
        setEnviado(true);
        setTimeout(() => {
          router.push(`/restablecer-contrasena?email=${encodeURIComponent(value)}`);
        }, 8000);
      } else {
        toast.error("No se pudo restablecer la contraseña:", {
          description: res.error,
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error("No se pudo conectar con el servidor.", { position: "bottom-right" });
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, enviado, loading, solicitar };
}

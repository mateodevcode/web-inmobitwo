import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiBackend } from "@/actions/apiBackend.js";
import { validatePasswordRegistro } from "@/utils/validatePassword";

// tokenReset: lo entrega /api/validar-codigo; es lo único que acepta el backend
// para cambiar la contraseña (vale 10 min y un solo uso).
export function useResetPassword(tokenReset, email) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);

  const cambiar = async (password, confirmPassword) => {
    const errores = validatePasswordRegistro(password);
    if (confirmPassword !== password) {
      errores.push("Las contraseñas no coinciden.");
    }
    if (errores.length > 0) {
      toast.error(errores[0], { position: "bottom-right" });
      return false;
    }

    setSubmitting(true);
    try {
      const res = await apiBackend("/api/usuario/reset-password", "PATCH", {
        password,
        token: tokenReset,
      });
      if (res.success === true) {
        toast.success(res.message, { position: "top-right" });
        setComplete(true);
        setTimeout(() => {
          router.push(`/login?email=${encodeURIComponent(email.trim().toLowerCase())}`);
        }, 8000);
        return true;
      }
      toast.error("No se pudo actualizar la contraseña:", {
        description: res.error,
        position: "bottom-right",
      });
      return false;
    } catch {
      toast.error("No se pudo conectar con el servidor.", { position: "bottom-right" });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { submitting, complete, cambiar };
}

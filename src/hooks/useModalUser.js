import { useEffect } from "react";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export function useModalUser({ isOpen, onClose }) {
  const router = useRouter();
  const { handleCerrarSesion } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const irAPerfil = () => {
    onClose();
    router.push("/usuario/tus-datos/perfil");
  };

  const irANotificaciones = () => {
    onClose();
    router.push("/usuario/tus-datos/notificaciones");
  };

  const cerrarSesion = () => {
    onClose();
    handleCerrarSesion();
  };

  return { irAPerfil, irANotificaciones, cerrarSesion };
}

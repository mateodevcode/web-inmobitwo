import { useEffect } from "react";

// Si se llega con ?email= en la URL, lo pone en el formulario.
export const useEmailPrefill = (
  emailActual,
  formDataUsuario,
  setFormDataUsuario,
) => {
  useEffect(() => {
    if (
      emailActual &&
      formDataUsuario.email !== decodeURIComponent(emailActual)
    ) {
      setFormDataUsuario({
        ...formDataUsuario,
        email: decodeURIComponent(emailActual),
      });
    }
  }, [emailActual, formDataUsuario, setFormDataUsuario]);
};

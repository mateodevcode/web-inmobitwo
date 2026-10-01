import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext.js";
import useOrganizaciones from "@/hooks/useOrganizaciones.js";

export const useOrganizacionSidebar = () => {
  const { organizaciones, usuario } = useAppContext();
  const { cargarMisOrganizaciones } = useOrganizaciones();
  const [cargadoPara, setCargadoPara] = useState(null);

  useEffect(() => {
    if (!usuario) return;
    if (cargadoPara === usuario.id) return;
    let vivo = true;
    cargarMisOrganizaciones().finally(() => {
      if (vivo) setCargadoPara(usuario.id);
    });
    return () => {
      vivo = false;
    };
  }, [usuario]);

  return { organizaciones, cargando: !!usuario && cargadoPara !== usuario.id };
};

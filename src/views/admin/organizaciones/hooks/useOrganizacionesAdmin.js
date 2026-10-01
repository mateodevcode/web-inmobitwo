import { useEffect, useState } from "react";
import { toast } from "sonner";
import useOrganizaciones from "@/hooks/useOrganizaciones.js";

export const ESTADOS_ORG = ["pendiente", "aprobada", "suspendida"];

export const useOrganizacionesAdmin = () => {
  const {
    cargarOrganizacionesAdmin,
    aprobarOrganizacion,
    suspenderOrganizacion,
    activarDominioPropio,
    desactivarDominioPropio,
    quitarDominioPropio,
  } = useOrganizaciones();

  const [organizaciones, setOrganizaciones] = useState([]);
  const [filtro, setFiltro] = useState("pendiente");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let vivo = true;
    cargarOrganizacionesAdmin(filtro || null).then((res) => {
      if (!vivo) return;
      if (res.success) setOrganizaciones(res.data);
      setLoading(false);
    });
    return () => {
      vivo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtro]);

  const recargar = async () => {
    setLoading(true);
    const res = await cargarOrganizacionesAdmin(filtro || null);
    if (res.success) setOrganizaciones(res.data);
    setLoading(false);
  };

  const handleFiltroChange = (estado) => {
    setFiltro(estado);
    setLoading(true);
  };

  const ejecutarAccion = async (accion, id, mensajeOk) => {
    const res = await accion(id);
    if (res.success) {
      toast.success(mensajeOk || res.message, { position: "bottom-right" });
      recargar();
    } else {
      toast.error(res.error || res.message, { position: "bottom-right" });
    }
  };

  return {
    organizaciones,
    filtro,
    loading,
    handleFiltroChange,
    ejecutarAccion,
    aprobarOrganizacion,
    suspenderOrganizacion,
    activarDominioPropio,
    desactivarDominioPropio,
    quitarDominioPropio,
  };
};

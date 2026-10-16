import { useEffect, useRef, useState } from "react";
import useLeads from "@/hooks/useLeads";

export const useLeadsFilter = (leads) => {
  const { cargarLeads } = useLeads();
  const cargaInicialHecha = useRef(false);
  const [filtroEstado, setFiltroEstado] = useState("todos");

  // Carga inicial una sola vez (cargarLeads no está memoizada: agregarla
  // a deps crearía loop de refetches).
  useEffect(() => {
    if (cargaInicialHecha.current) return;
    cargaInicialHecha.current = true;
    cargarLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const leadsFiltrados =
    filtroEstado === "todos"
      ? leads
      : leads.filter((lead) => lead.estado === filtroEstado);

  return { filtroEstado, setFiltroEstado, leadsFiltrados };
};

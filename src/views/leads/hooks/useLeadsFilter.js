import { useEffect, useRef, useState } from "react";
import useLeads from "@/hooks/useLeads";

export const useLeadsFilter = (leads) => {
  const { cargarLeads } = useLeads();
  const cargaInicialHecha = useRef(false);
  const [filtroEstado, setFiltroEstado] = useState("todos");

  useEffect(() => {
    if (cargaInicialHecha.current) return;
    cargaInicialHecha.current = true;
    cargarLeads();
  }, []);

  const leadsFiltrados =
    filtroEstado === "todos"
      ? leads
      : leads.filter((lead) => lead.estado === filtroEstado);

  return { filtroEstado, setFiltroEstado, leadsFiltrados };
};

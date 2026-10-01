import { useAppContext } from "@/context/AppContext";
import useLeads from "@/hooks/useLeads";
import { useLeadsFilter } from "./hooks/useLeadsFilter";
import { getEstadoInfo } from "./lib/estados";
import { EstadoFilter } from "./components/EstadoFilter";
import { LeadCard } from "./components/LeadCard";

const Leads = () => {
  const { leads, loadingLeads } = useAppContext();
  const { actualizarEstadoLead } = useLeads();
  const { filtroEstado, setFiltroEstado, leadsFiltrados } =
    useLeadsFilter(leads);

  const handleEstadoChange = (id, estado) =>
    actualizarEstadoLead(id, estado, leads);

  return (
    <main className="w-11/12 md:w-150 md:px-6 pb-10 pt-4 mx-auto">
      <h1 className="text-2xl font-bold mb-1">Mis leads</h1>
      <p className="text-black/60 text-sm mb-6">
        Personas interesadas en tus propiedades. Contáctalas mientras el interés
        está activo.
      </p>

      <EstadoFilter filtroEstado={filtroEstado} onChange={setFiltroEstado} />

      {loadingLeads ? (
        <div className="text-center py-20 text-gray-400">Cargando leads...</div>
      ) : leadsFiltrados.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          No hay leads{" "}
          {filtroEstado !== "todos"
            ? `en estado "${getEstadoInfo(filtroEstado).label}"`
            : "todavía"}
          .
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {leadsFiltrados.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onEstadoChange={handleEstadoChange}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Leads;

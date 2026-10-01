// views/admin/organizaciones/AdminOrganizacionesPage.jsx
import { useOrganizacionesAdmin } from "./hooks/useOrganizacionesAdmin";
import { EstadoFilter } from "./components/EstadoFilter";
import { OrgList } from "./components/OrgList";

const AdminOrganizacionesPage = () => {
  const {
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
  } = useOrganizacionesAdmin();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Organizaciones</h1>

      <EstadoFilter filtro={filtro} onChange={handleFiltroChange} />

      <OrgList
        loading={loading}
        organizaciones={organizaciones}
        actions={{
          aprobarOrganizacion,
          suspenderOrganizacion,
          activarDominioPropio,
          desactivarDominioPropio,
          quitarDominioPropio,
        }}
        onAction={ejecutarAccion}
      />
    </div>
  );
};

export default AdminOrganizacionesPage;

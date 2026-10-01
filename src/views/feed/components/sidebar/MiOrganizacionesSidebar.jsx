// views/feed/components/sidebar/MiOrganizacionesSidebar.jsx
import BotonAdminOrganizaciones from "./BotonAdminOrganizaciones";
import { EmptyOrgCard } from "./EmptyOrgCard";
import { ActiveOrgCard } from "./ActiveOrgCard";
import { OrgNavItems } from "./OrgNavItems";
import { useOrganizacionSidebar } from "./useOrganizacionSidebar";

const MiOrganizacionesSidebar = ({ itemSelect, setItemSelect }) => {
  const { organizaciones, cargando } = useOrganizacionSidebar();

  if (cargando) {
    return <div className="px-2.5 py-4 text-xs text-black/40">Cargando...</div>;
  }

  // Caso: No tiene ninguna organización
  if (organizaciones.length === 0) {
    return (
      <div>
        <BotonAdminOrganizaciones />

        <h3 className="uppercase font-semibold text-xs text-black/60 px-2">
          Mi organización
        </h3>
        <EmptyOrgCard />
      </div>
    );
  }

  // Caso: Tiene al menos una organización
  const organizacionActiva = organizaciones[0];

  return (
    <div>
      <BotonAdminOrganizaciones />
      <h3 className="uppercase font-semibold text-xs text-black/60 px-2">
        Mi organización
      </h3>

      <ActiveOrgCard organizacion={organizacionActiva} />

      <OrgNavItems
        itemSelect={itemSelect}
        onSelect={setItemSelect}
        organizacionActiva={organizacionActiva}
      />

      {organizaciones.length > 1 && (
        <div className="px-3 text-xs text-black/50 mt-1">
          {`${organizaciones.length} organizaciones`}
        </div>
      )}
    </div>
  );
};

export default MiOrganizacionesSidebar;

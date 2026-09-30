// src/pages/organizacion/paginas/OrganizacionLayout.jsx

import { useTenant } from "@/context/TenantContext.js";
import OrganizacionNav from "./OrganizacionNav.jsx";
import { useOutletContext } from "@/views/organizacion/paginas/OrgOutletContext.jsx"; // TODO-NEXT Outlet

const OrganizacionLayout = () => {
  const { organizacionActual } = useTenant();

  return (
    <div>
      <OrganizacionNav basePath="" organizacion={organizacionActual} />
      <Outlet context={organizacionActual} />
    </div>
  );
};

export default OrganizacionLayout;

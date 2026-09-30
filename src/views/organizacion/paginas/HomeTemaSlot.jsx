// src/pages/organizacion/paginas/HomeTemaSlot.jsx

import { getTema } from "@/views/organizacion/temas/temaRegistry.js";
import { useOutletContext } from "@/views/organizacion/paginas/OrgOutletContext.jsx"; // TODO-NEXT Outlet

const HomeTemaSlot = () => {
  const organizacion = useOutletContext();
  const { Home } = getTema(organizacion?.tema);
  return <Home />;
};

export default HomeTemaSlot;

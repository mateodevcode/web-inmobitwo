// src/pages/organizacion/paginas/SobreNosotrosTemaSlot.jsx

import { getTema } from "@/views/organizacion/temas/temaRegistry.js";
import { useOutletContext } from "@/views/organizacion/paginas/OrgOutletContext.jsx"; // TODO-NEXT Outlet

const SobreNosotrosTemaSlot = () => {
  const organizacion = useOutletContext();
  const { SobreNosotros } = getTema(organizacion?.tema);
  return <SobreNosotros />;
};

export default SobreNosotrosTemaSlot;

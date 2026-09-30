// src/pages/organizacion/paginas/ContactoTemaSlot.jsx

import { getTema } from "@/views/organizacion/temas/temaRegistry.js";
import { useOutletContext } from "@/views/organizacion/paginas/OrgOutletContext.jsx"; // TODO-NEXT Outlet

const ContactoTemaSlot = () => {
  const organizacion = useOutletContext();
  const { Contacto } = getTema(organizacion?.tema);
  return <Contacto />;
};

export default ContactoTemaSlot;

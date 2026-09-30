
import { useOutletContext } from "@/views/organizacion/paginas/OrgOutletContext.jsx"; // TODO-NEXT Outlet// src/pages/organizacion/paginas/ContactoOrg.jsx


const ContactoOrg = () => {
  const organizacion = useOutletContext();
  if (!organizacion) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Contacto</h1>
      <div className="space-y-2 text-gray-600">
        {organizacion.telefono && <p>Teléfono: {organizacion.telefono}</p>}
        {organizacion.email && <p>Email: {organizacion.email}</p>}
        {(organizacion.ciudad || organizacion.provincia) && (
          <p>
            {[organizacion.ciudad, organizacion.provincia]
              .filter(Boolean)
              .join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactoOrg;

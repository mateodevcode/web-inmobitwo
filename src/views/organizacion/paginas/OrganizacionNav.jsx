
import Link from "next/link";
import { usePathname } from "next/navigation";// src/pages/organizacion/paginas/OrganizacionNav.jsx


// basePath: "" para dominio propio (rutas en raíz) | "/inmobiliarias/:slug" para el modo red-social
const OrganizacionNav = ({ basePath, organizacion }) => {
  const pathname = usePathname();

  const items = [
    { label: "Inicio", to: basePath || "/" },
    { label: "Sobre nosotros", to: `${basePath}/sobre-nosotros` },
    { label: "Propiedades", to: `${basePath}/propiedades` },
    { label: "Contacto", to: `${basePath}/contacto` },
  ];

  return (
    <header className="border-b">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
        {organizacion?.logo_url && (
          <img
            src={organizacion.logo_url}
            alt={organizacion.nombre}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <p className="font-bold">{organizacion?.nombre}</p>

        <nav className="ml-auto flex gap-1">
          {items.map((item) => {
            const activo = pathname === item.to;
            return (
              <Link
                key={item.to}
                href={item.to}
                className={`px-3 py-1.5 rounded-lg text-sm ${
                  activo ? "bg-black text-white" : "hover:bg-stone-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default OrganizacionNav;

import { usePathname } from "next/navigation";
import { TabLink } from "./TabLink";

const TABS = [
  { id: "perfil", label: "Perfil", to: "/usuario/tus-datos/perfil" },
  {
    id: "acceso",
    label: "Acceso y seguridad",
    to: "/usuario/tus-datos/acceso",
  },
  {
    id: "mis-busquedas",
    label: "Mis búsquedas",
    to: "/usuario/tus-datos/mis-busquedas",
  },
  {
    id: "descartados",
    label: "Descartados",
    to: "/usuario/tus-datos/descartados",
  },
];

const HeadPerfilAcceso = () => {
  const pathname = usePathname();
  const segmento = pathname.split("/usuario/tus-datos/")[1];

  return (
    <>
      <div className="h-24 md:h-32 w-11/12 md:w-9/12 text-3xl font-bold text-black flex items-center">
        <h2 className="text-2xl md:text-2xl">Tu cuenta</h2>
      </div>

      {/* Menu */}
      <div className="w-11/12 md:w-9/12 gap-x-4 gap-y-3 flex flex-row flex-wrap font-semibold">
        {TABS.map(({ id, label, to }) => (
          <TabLink key={id} active={segmento === id} to={to}>
            {label}
          </TabLink>
        ))}
      </div>
    </>
  );
};

export default HeadPerfilAcceso;

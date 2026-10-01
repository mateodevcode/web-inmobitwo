import { HiBuildingOffice2 } from "react-icons/hi2";
import { toCapitalize } from "@/lib/toCapitalize";

export function ActiveOrgCard({ organizacion }) {
  const dominio_dns = organizacion?.custom_domain
    ? `https://${organizacion?.custom_domain}`
    : `/inmobiliarias/${organizacion?.slug}`;

  return (
    <div className="px-2.5 pt-2 pb-1">
      <a
        className="flex items-center gap-3 p-3 rounded-lg  hover:bg-blue-50 border hover:border-blue-100 border-transparent cursor-pointer select-none"
        href={dominio_dns}
        target="_blank"
      >
        {organizacion.logo_url ? (
          <img
            src={organizacion.logo_url}
            alt={organizacion.nombre}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
            <HiBuildingOffice2 className="text-xl text-blue-600" />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate text-black">
            {toCapitalize(organizacion.nombre)}
          </p>
          <p className="text-[11px] text-black/50 capitalize">
            {organizacion.rol_en_org === "agency_admin"
              ? "Administrador"
              : "Agente"}{" "}
            · {organizacion.estado}
          </p>
        </div>
      </a>
    </div>
  );
}

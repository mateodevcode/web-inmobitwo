import { useAppContext } from "@/context/AppContext.js";
import { HiShieldCheck } from "react-icons/hi2";
import { URL_CRM } from "@/config/config.js";


const BotonAdminOrganizaciones = () => {
  const { usuario } = useAppContext();
  if (usuario?.rol !== "superadmin") return null;

  return (
    <div className="px-2.5 pb-2 pt-2 my-4">
      <a
        className={`my-1 p-3 rounded-lg text-sm flex items-center gap-3 cursor-pointer select-none active:scale-95 transition-all duration-75 border text-black relative bg-stone-100 border-black/10 hover:bg-stone-100 hover:border-black/10 w-full`}
        href={`${URL_CRM}/admin`}
      >
        <HiShieldCheck className="text-lg text-rose-600" />
        Administrar inmobiliarias
      </a>
    </div>
  );
};

export default BotonAdminOrganizaciones;

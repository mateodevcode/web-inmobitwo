import { useAppContext } from "@/context/AppContext";
import { useFeed } from "@/hooks/feedStore";
import { IoClose } from "react-icons/io5";
import { StatsGrid } from "./StatsGrid";
import { RecentActivity } from "./RecentActivity";
import { SuggestedOrgs } from "./SuggestedOrgs";
import { ActivityMap } from "./ActivityMap";

const Actividad = () => {
  const { organizaciones, usuario, setOpenModalActividades } = useAppContext();
  const { propiedades } = useFeed();

  const cantidad_propiedades = (propiedades ?? []).filter(
    (pro) => pro.publicador?.id === usuario?.id,
  );

  return (
    <div className="bg-white w-full md:w-96 h-svh font-poppins border-l border-black/20 fixed right-0 overflow-y-auto">
      {/* tu actividad */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-black uppercase">Tu actividad</h2>
          <button
            className="bg-black/10 w-10 h-10 md:hidden items-center justify-center rounded-full flex"
            onClick={() => setOpenModalActividades(false)}
          >
            <IoClose className="text-black text-xl" />
          </button>
        </div>
        <StatsGrid activas={cantidad_propiedades.length} />
      </div>

      {/* actividad reciente */}
      <div className="p-4">
        <h2 className="text-sm text-black uppercase">Actividad reciente</h2>
        <RecentActivity />
      </div>

      {/* Organizaciones recienes */}
      <div className="p-4">
        <h2 className="text-black uppercase text-sm">
          Organizaciones segeridas
        </h2>
        <SuggestedOrgs organizaciones={organizaciones} />
      </div>

      {/* Mapa de actividades */}
      <div className="p-4">
        <h2 className="text-black uppercase text-sm">Mapa de actividad</h2>
        <ActivityMap />
      </div>
    </div>
  );
};

export default Actividad;

import Sidebar from "./components/sidebar/Sidebar.jsx";
import Principal from "@/components/principal/Principal.jsx";
import Actividad from "./components/actividad/Actividad.jsx";
import ModalUser from "@/components/modales/ModalUser.jsx";
import ModalAgregarPropiedad from "./components/modals/ModalAgregarPropiedad.jsx";
import ModalConfirmarEliminarPropiedad from "./components/modals/ModalConfirmarEliminarPropiedad.jsx";
import ModalSidebar from "./components/modals/ModalSidebar";
import ModalActividades from "./components/modals/ModalActividades";
import { scrollbarStyles } from "@/data/data.styles.scrollbar.js";

const Feed = () => {
  return (
    <div className="bg-gray-50">
      <div className="min-h-svh flex justify-between bg-gray-100 relative">
        <div className="md:flex hidden">
          <Sidebar />
        </div>

        <Principal />

        <div className="lg:flex hidden">
          <Actividad />
        </div>
      </div>

      <ModalUser />
      <ModalAgregarPropiedad />
      <ModalConfirmarEliminarPropiedad />
      <ModalSidebar />
      <ModalActividades />

      <style>{scrollbarStyles.default}</style>
    </div>
  );
};

export default Feed;

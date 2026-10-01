import Acceso from "./Acceso";
import { scrollbarStyles } from "@/data/data.styles.scrollbar.js";
import { SiteFooter } from "@/components/footer/SiteFooter";
import ModalCambiarPassword from "@/components/modales/ModalCambiarPassword";
import { SupportBlock } from "../components/SupportBlock";

const SeguridadAcceso = () => {
  return (
    <div className="bg-septimo">
      <Acceso />

      <SupportBlock />
      <SiteFooter />

      <ModalCambiarPassword />
      <style>{scrollbarStyles.default}</style>
    </div>
  );
};

export default SeguridadAcceso;

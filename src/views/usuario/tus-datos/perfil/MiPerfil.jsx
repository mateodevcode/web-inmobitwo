import Perfil from "./Perfil";
import { scrollbarStyles } from "@/data/data.styles.scrollbar.js";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { SupportBlock } from "../components/SupportBlock";

const MiPerfil = () => {
  return (
    <div className="bg-gray-100">
      <Perfil />
      <SupportBlock />
      <SiteFooter />

      <style>{scrollbarStyles.default}</style>
    </div>
  );
};

export default MiPerfil;

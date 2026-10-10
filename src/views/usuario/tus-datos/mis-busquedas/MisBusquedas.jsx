import HeaderInmobitwo from "@/components/header-inmobitwo/HeaderInmobitwo";
import HeadPerfilAcceso from "../components/HeadPerfilAcceso";
import { SupportBlock } from "../components/SupportBlock";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { scrollbarStyles } from "@/data/data.styles.scrollbar.js";
import TabMisBusquedas from "./TabMisBusquedas";

const MisBusquedas = () => {
  return (
    <div className="bg-septimo">
      <div className="flex flex-col font-poppins relative items-center">
        <HeaderInmobitwo />
        <HeadPerfilAcceso />

        {/* contenido */}
        <div className="w-11/12 md:w-9/12 min-h-svh mb-8 md:mb-20">
          <TabMisBusquedas />
        </div>
      </div>
      <SupportBlock />
      <SiteFooter />

      <style>{scrollbarStyles.default}</style>
    </div>
  );
};

export default MisBusquedas;

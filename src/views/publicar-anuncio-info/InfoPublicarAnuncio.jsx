import { HowToPublishHero } from "./components/hero/HowToPublishHero";
import { PublishingGuideSection } from "./components/guide/PublishingGuideSection";
import { AdvantagesSection } from "./components/advantages/AdvantagesSection";
import { ServicesSection } from "./components/services/ServicesSection";
import { LinksGridSection } from "./components/links/LinkGridSection";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import HeaderInmobitwo from "@/components/header-inmobitwo/HeaderInmobitwo";
import BarraNavegacionTauri from "../../components/barra-navegacion/BarraNavegacionTauri";

const InfoPublicarAnuncio = () => {
  return (
    <div className="flex flex-col font-montserrat bg-primero">
      <HeaderInmobitwo />
      <HowToPublishHero />
      <PublishingGuideSection />
      <AdvantagesSection />
      <ServicesSection />
      <LinksGridSection />
      <SiteFooter />

      <BarraNavegacionTauri />
      <style>{scrollbarStyles.default}</style>
    </div>
  );
};

export default InfoPublicarAnuncio;

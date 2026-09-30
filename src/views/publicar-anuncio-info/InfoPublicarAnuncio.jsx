import { HowToPublishHero } from "@/views/publicar-anuncio-info/components/HowToPublishHero";
import { PublishingGuideSection } from "@/views/publicar-anuncio-info/components/PublishingGuideSection";
import { AdvantagesSection } from "@/views/publicar-anuncio-info/components/AdvantagesSection";
import { ServicesSection } from "@/views/publicar-anuncio-info/components/ServicesSection";
import { LinksGridSection } from "@/views/publicar-anuncio-info/components/LinkGridSection";
import { SiteFooter } from "@/views/publicar-anuncio-info/components/SiteFooter";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import HeaderInmobitwo from "@/views/publicar-anuncio-info/components/HeaderInmobitwo";
import BarraNavegacionTauri from "../../components/barra-navegacion/BarraNavegacionTauri";
import ModalHamburguesa from "../inicio/components/modal-hamburguesa/ModalHamburguesa";

const InfoPublicarAnuncio = () => {
  AdvantagesSection;

  return (
    <div className="flex flex-col font-montserrat bg-primero">
      <HeaderInmobitwo />
      <HowToPublishHero />
      <PublishingGuideSection />
      <AdvantagesSection />
      <ServicesSection />
      <LinksGridSection />
      <SiteFooter />
      <ModalHamburguesa />

      <BarraNavegacionTauri />
      <style>{scrollbarStyles.default}</style>
    </div>
  );
};

export default InfoPublicarAnuncio;

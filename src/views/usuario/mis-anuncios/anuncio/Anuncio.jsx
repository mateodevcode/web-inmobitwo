import DetalleDeAnuncio from "@/views/usuario/mis-anuncios/anuncio/DetalleDeAnuncio";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import { SiteFooter } from "@/components/footer/SiteFooter";

const Anuncio = () => {
  return (
    <div>
      <DetalleDeAnuncio />
      <SiteFooter />
      <style>{scrollbarStyles.default}</style>
    </div>
  );
};

export default Anuncio;

import HeaderInmobitwo from "@/components/header-inmobitwo/HeaderInmobitwo";
import { useAppContext } from "@/context/AppContext";
import { useFeed } from "@/hooks/feedStore";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import { SiteFooter } from "@/components/footer/SiteFooter";
import ModalHamburguesa from "@/components/modales/modal-hamburguesa/ModalHamburguesa";
import { useEffect } from "react";
import usePropiedades from "@/hooks/usePropiedades";
import Loading from "@/views/organizacion/temas/loading/Loading";
import BarraNavegacionTauri from "@/components/barra-navegacion/BarraNavegacionTauri";
import { PublishAnuncioButton } from "./components/PublishAnuncioButton";
import { MisAnunciosContent } from "./components/MisAnunciosContent";

const MisAnuncios = () => {
  const { usuario } = useAppContext();
  const { propiedades, loading } = useFeed();
  const { cargarPropiedadesMisAnuncios } = usePropiedades();

  const mis_propiedades = propiedades?.filter(
    (pro) => pro.publicado_por_id === usuario?.id,
  );

  useEffect(() => {
    cargarPropiedadesMisAnuncios();
  }, []);

  return (
    <div className="flex flex-col font-montserrat relative bg-septimo">
      <HeaderInmobitwo />
      <div className="flex md:flex-row flex-col md:items-center justify-between py-4 mx-auto w-11/12 md:w-10/12">
        <h3 className="text-2xl font-bold text-black">Mis anuncios</h3>
        <PublishAnuncioButton hasAnuncios={mis_propiedades.length !== 0} />
      </div>

      <MisAnunciosContent loading={loading} propiedades={mis_propiedades} />

      {loading ? null : (
        <div className="w-full flex items-center justify-center my-10 md:px-0 px-4">
          <PublishAnuncioButton
            hasAnuncios={mis_propiedades.length !== 0}
            fullWidth
          />
        </div>
      )}

      <SiteFooter />

      <ModalHamburguesa />
      <BarraNavegacionTauri />

      <style>{scrollbarStyles.default}</style>
    </div>
  );
};

export default MisAnuncios;

import DatosBasicos from "./paso-1/DatosBasicos";
import Detalles from "./paso-2/Detalles";
import Fotos from "./paso-3/Fotos";
import HeaderPublicarAnuncio from "./header/HeaderPublicarAnuncio";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import { ModalContinuarAnuncio } from "@/components/modales/ModalContinuarAnuncio";
import ModalHamburguesa from "@/components/modales/modal-hamburguesa/ModalHamburguesa";
import BarraNavegacionTauri from "@/components/barra-navegacion/BarraNavegacionTauri";
import ModalInformativo from "@/components/modales/ModalInformativo";
import { WizardSteps } from "./components/WizardSteps";
import { HelpFab } from "./components/HelpFab";
import { useWizardProgress } from "./hooks/useWizardProgress";
import { useAppContext } from "@/context/AppContext";

const PublicarAnuncio = () => {
  const { contentNumber } = useAppContext();
  const {
    modalContinuar,
    anuncioGuardado,
    formDataPropiedad,
    handleContinuarAnuncio,
    handleNuevoAnuncio,
  } = useWizardProgress();

  return (
    <div className="bg-primero min-h-dvh">
      <HeaderPublicarAnuncio />

      {modalContinuar && (
        <ModalContinuarAnuncio
          anuncio={anuncioGuardado}
          onContinuar={handleContinuarAnuncio}
          onNuevo={handleNuevoAnuncio}
          propiedad={formDataPropiedad}
        />
      )}

      <WizardSteps modalContinuar={modalContinuar} contentNumber={contentNumber} />

      <ModalHamburguesa />
      <HelpFab />

      <BarraNavegacionTauri />
      <ModalInformativo />

      <style>{scrollbarStyles.default}</style>
    </div>
  );
};

export default PublicarAnuncio;

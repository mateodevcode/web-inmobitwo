import DatosBasicos from "../paso-1/DatosBasicos";
import Detalles from "../paso-2/Detalles";
import Fotos from "../paso-3/Fotos";

export function WizardSteps({ modalContinuar, contentNumber }) {
  if (modalContinuar) return null;

  return (
    <>
      {contentNumber === 0 && <DatosBasicos />}
      {contentNumber === 1 && <Detalles />}
      {contentNumber === 2 && <Fotos />}
    </>
  );
}

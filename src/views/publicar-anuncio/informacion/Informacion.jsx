import { MdOutlineWorkOutline } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { InfoIntro } from "./InfoIntro";
import { InfoPromoRow } from "./InfoPromoRow";

const Informacion = () => {
  return (
    <div className="border border-black/10 w-full lg:w-110 xl:w-120 mx-auto mt-20 font-montserrat text-black">
      <InfoIntro />

      <InfoPromoRow
        Icon={MdOutlineWorkOutline}
        title="¿Eres profesional inmobiliario?"
        linkLabel="Conoce nuestras ventajas para profesionales"
      />

      <InfoPromoRow
        Icon={FiFileText}
        title="¿Necesitas un contrato de alquiler?"
        linkLabel="crea tu contrato de alquiler 100% legak y gratis"
      />
    </div>
  );
};

export default Informacion;

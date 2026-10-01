import HeaderInmobitwo from "@/components/header-inmobitwo/HeaderInmobitwo";
import SkeletonDetalleAnuncio from "./SkeletonDetalleAnuncio";
import usePropiedades from "@/hooks/usePropiedades";
import { useAnuncioDetalle } from "./components/useAnuncioDetalle";
import { DetalleTopBar } from "./components/DetalleTopBar";
import { DetalleEstado } from "./components/DetalleEstado";
import { PrecioCard } from "./components/PrecioCard";
import { FotosCard } from "./components/FotosCard";
import { StatsCard } from "./components/StatsCard";
import { ContactoCard } from "./components/ContactoCard";
import {
  DireccionCard,
  DescripcionCard,
  ServiciosCard,
} from "./components/InfoCards";

const DetalleDeAnuncio = () => {
  const { propiedad, cargandoGlobal, setLoading } = useAnuncioDetalle();
  const { cargarPropiedad } = usePropiedades();

  if (cargandoGlobal) {
    return (
      <div className="flex flex-col font-montserrat relative items-center mb-20">
        <HeaderInmobitwo />
        <div className="w-full">
          <SkeletonDetalleAnuncio />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col font-montserrat relative items-center mb-20">
      <HeaderInmobitwo />
      <DetalleTopBar />
      <DetalleEstado
        propiedad={propiedad}
        setLoading={setLoading}
        onRecargar={cargarPropiedad}
      />
      <PrecioCard propiedad={propiedad} />
      <FotosCard />
      <StatsCard />
      <ContactoCard />
      <DireccionCard />
      <DescripcionCard />
      <ServiciosCard />
    </div>
  );
};

export default DetalleDeAnuncio;

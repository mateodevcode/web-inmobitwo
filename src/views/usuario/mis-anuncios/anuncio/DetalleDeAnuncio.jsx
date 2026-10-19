import HeaderInmobitwo from "@/components/header-inmobitwo/HeaderInmobitwo";
import SkeletonDetalleAnuncio from "./SkeletonDetalleAnuncio";
import usePropiedades from "@/hooks/usePropiedades";
import { useAnuncioDetalle } from "./components/useAnuncioDetalle";
import { DetalleTopBar } from "./components/DetalleTopBar";
import { DetalleEstado } from "./components/DetalleEstado";
import { PrecioCard } from "./components/PrecioCard";
import { DetallesCard } from "./components/DetallesCard";
import { FotosCard } from "./components/FotosCard";
import { StatsCard } from "./components/StatsCard";
import { ContactoCard } from "./components/ContactoCard";
import {
  DireccionCard,
  DescripcionCard,
  ServiciosCard,
} from "./components/InfoCards";
import PagoUbicacionOculta from "@/components/pagos/PagoUbicacionOculta";
import { useAppContext } from "@/context/AppContext";

const DetalleDeAnuncio = () => {
  const { propiedad, cargandoGlobal, setLoading } = useAnuncioDetalle();
  const { cargarPropiedad } = usePropiedades();
  const { pagoAnuncio, setPagoAnuncio, usuario } = useAppContext();

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

  // Id inexistente o sin permiso (el GET no devolvió propiedad).
  if (!propiedad?.id) {
    return (
      <div className="flex flex-col font-montserrat relative items-center mb-20">
        <HeaderInmobitwo />
        <div className="w-11/12 md:w-9/12 py-16 text-center">
          <p className="text-xl md:text-2xl font-semibold text-segundo">
            No encontramos este anuncio
          </p>
          <p className="text-base md:text-lg text-segundo/70 mt-2">
            Puede que ya no exista o que no tengas permiso para verlo.
          </p>
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
      <FotosCard propiedad={propiedad} />
      <DetallesCard propiedad={propiedad} />
      <StatsCard propiedad={propiedad} />
      <ContactoCard propiedad={propiedad} />
      <DireccionCard propiedad={propiedad} />
      <DescripcionCard propiedad={propiedad} />
      <ServiciosCard propiedad={propiedad} />

      <PagoUbicacionOculta
        abierto={pagoAnuncio.abierto && Boolean(pagoAnuncio.propiedadId)}
        propiedadId={pagoAnuncio.propiedadId}
        prefillEmail={usuario?.email || ""}
        onAprobado={() => cargarPropiedad(propiedad.id, { force: true })}
        onClose={() => {
          setPagoAnuncio({ abierto: false, propiedadId: null });
          cargarPropiedad(propiedad.id, { force: true });
        }}
      />
    </div>
  );
};

export default DetalleDeAnuncio;

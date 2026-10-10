import { BsFillGeoAltFill } from "react-icons/bs";
import { FaArchway } from "react-icons/fa6";
import { FiVideo } from "react-icons/fi";
import { ImImage } from "react-icons/im";
import { useRouter } from "next/navigation";
import { irAInmueble } from "@/lib/navState.js";

// Iconos de contenido sobre la foto: cada uno solo se renderiza si el
// anuncio realmente tiene ese contenido (mismas condiciones que el visor:
// FotoVisor y CardPrincipal del detalle).
// - Fotos: galeria con filas.
// - Planos: planos con filas.
// - 3D: video_3d (el backend aún no lo envía en búsqueda: TODO en
//   propiedades.controllers.js; quedará oculto hasta que exista).
// - Mapa: latitude + longitude.
export function MediaToolbar({ propiedad, navState }) {
  const router = useRouter();

  const tieneFotos = (propiedad?.galeria?.length ?? 0) > 0;
  const tienePlanos = (propiedad?.planos?.length ?? 0) > 0;
  const tieneVideo = !!propiedad?.video_3d;
  const tieneMapa = propiedad?.latitude != null && propiedad?.longitude != null;

  if (!tieneFotos && !tienePlanos && !tieneVideo && !tieneMapa) return null;

  const go = (e, visor) => {
    e.stopPropagation();
    if (propiedad?.id) irAInmueble(router, propiedad.id, navState, visor);
  };

  const btnClass =
    "bg-primero/60 group-hover:bg-primero rounded-xs p-2.5 flex items-center justify-center transition-colors duration-300 cursor-pointer select-none";
  const iconClass =
    "text-sm text-segundo/60 group-hover:text-segundo transition-colors duration-300";

  return (
    <div className="absolute left-2 bottom-2 flex items-center justify-center gap-2 z-10">
      {tieneFotos && (
        <div className={btnClass} onClick={(e) => go(e, "fotos")} title="Ver fotos">
          <ImImage className={iconClass} />
        </div>
      )}
      {tienePlanos && (
        <div
          className={btnClass}
          onClick={(e) => go(e, "planos")}
          title="Ver planos"
        >
          <FaArchway className={iconClass} />
        </div>
      )}
      {tieneVideo && (
        <div className={btnClass} onClick={(e) => go(e, "3d")} title="Visita 3D">
          <FiVideo className={iconClass} />
        </div>
      )}
      {tieneMapa && (
        <div className={btnClass} onClick={(e) => go(e, "mapa")} title="Ver mapa">
          <BsFillGeoAltFill className={iconClass} />
        </div>
      )}
    </div>
  );
}

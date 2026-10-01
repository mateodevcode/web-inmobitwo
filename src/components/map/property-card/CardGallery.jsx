import { FaArchway } from "react-icons/fa6";
import { FiVideo } from "react-icons/fi";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { BsFillGeoAltFill, BsImage } from "react-icons/bs";
import PropertyImage from "@/components/common/PropertyImage";
import { useRouter } from "next/navigation";
import { irAInmueble } from "@/lib/navState.js";

function ShortcutButton({ title, onClick, children }) {
  return (
    <div
      className="bg-white hover:bg-white/70 rounded p-2 flex items-center justify-center transition-colors duration-300 cursor-pointer select-none"
      title={title}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </div>
  );
}

export function CardGallery({
  inmueble,
  titulo,
  fotos,
  totalImagenes,
  currentIndex,
  goTo,
  hasPlanos,
  navState,
  onClose,
}) {
  const router = useRouter();
  const goTab = (tab) => {
    if (inmueble?.id) irAInmueble(router, inmueble.id, navState, tab);
  };

  return (
    <div className="relative w-full h-48 bg-gray-100 group">
      <PropertyImage
        foto={fotos[currentIndex]}
        tamañoBase="small"
        sizes="320px"
        alt={titulo}
        className="w-full h-full object-cover"
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
        className="absolute top-2 right-2 z-10 bg-white/90 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold hover:bg-white"
        title="Cerrar"
      >
        ✕
      </button>

      <div className="absolute left-2 bottom-2 flex items-center justify-center gap-2">
        <ShortcutButton title="Ver fotos" onClick={() => goTab("fotos")}>
          <BsImage className="text-sm text-black" />
        </ShortcutButton>
        <ShortcutButton title="Visita 3D" onClick={() => goTab("3d")}>
          <FiVideo className="text-sm text-black" />
        </ShortcutButton>
        {hasPlanos && (
          <ShortcutButton title="Ver planos" onClick={() => goTab("planos")}>
            <FaArchway className="text-sm text-black" />
          </ShortcutButton>
        )}
        <ShortcutButton title="Ver en mapa" onClick={() => goTab("mapa")}>
          <BsFillGeoAltFill className="text-sm text-black" />
        </ShortcutButton>
      </div>

      {totalImagenes > 1 && (
        <>
          <div
            className="absolute left-1 top-1/2 -translate-y-1/2 hover:bg-white/80 rounded-full p-1.5 text-white hover:text-black transition duration-300 cursor-pointer select-none"
            onClick={(e) => {
              e.stopPropagation();
              goTo(currentIndex - 1);
            }}
          >
            <MdOutlineKeyboardArrowLeft className="text-2xl" />
          </div>
          <div
            className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-white/80 rounded-full p-1.5 text-white hover:text-black transition duration-300 cursor-pointer select-none"
            onClick={(e) => {
              e.stopPropagation();
              goTo(currentIndex + 1);
            }}
          >
            <MdOutlineKeyboardArrowRight className="text-2xl" />
          </div>
        </>
      )}

      <div className="bg-black/70 absolute bottom-2 right-2 p-1 px-2 rounded-md">
        <span className="text-white/90 font-semibold text-xs">
          {currentIndex + 1}/{totalImagenes}
        </span>
      </div>
    </div>
  );
}

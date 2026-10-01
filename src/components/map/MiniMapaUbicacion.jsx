// components/map/MiniMapaUbicacion.jsx
import { useRef } from "react";
import { BsFillGeoAltFill } from "react-icons/bs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMiniMapa } from "./useMiniMapa";

export default function MiniMapaUbicacion({
  locationInfo,
  operationSlug,
  typeSlug,
}) {
  const mapRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const polyKey = searchParams.get("polyKey");

  useMiniMapa(mapRef, locationInfo, polyKey);

  const handleVerEnMapa = () => {
    if (locationInfo?.tipo === "custom_polygon") {
      router.push(`/busqueda-multizona/${operationSlug}-${typeSlug}`);
      return;
    }
    router.push(`${pathname}/mapa`);
  };

  return (
    <div className="w-full h-60 2xl:h-80 flex flex-col">
      <div className="w-full h-full border border-black/40 border-b-transparent rounded-sm">
        <div ref={mapRef} className="w-full h-full rounded-sm" />
      </div>
      <div
        className="w-full h-14 border border-black/40 text-black flex items-center gap-2 justify-center font-semibold cursor-pointer select-none hover:bg-black/5"
        onClick={handleVerEnMapa}
      >
        <BsFillGeoAltFill />
        <p>Ver en mapa</p>
      </div>
    </div>
  );
}

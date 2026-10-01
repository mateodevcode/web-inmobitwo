// views/mapa-inmuebles/MapaInmueblesPage.jsx

import MapaInmuebles from "./MapaInmuebles";
import { useParams } from "next/navigation";
import { parseOperationAndType } from "./lib/routeParams";
import { useMapaCenter } from "./hooks/useMapaCenter";

export default function MapaInmueblesPage() {
  const { operationAndType, cityAndDepartment, lat, lng, zoom } = useParams();

  const { operation, tipoInmueble } = parseOperationAndType(operationAndType);
  const { center, boundary, geocoding } = useMapaCenter({
    lat,
    lng,
    zoom,
    cityAndDepartment,
  });

  return (
    <div className="flex flex-col w-screen h-screen font-poppins relative">
      <div className="flex-1 relative">
        {geocoding ? (
          <div className="w-full h-full flex items-center justify-center bg-white">
            <p className="text-sm text-black/40 animate-pulse">
              Ubicando zona...
            </p>
          </div>
        ) : (
          <MapaInmuebles
            lat={center.lat}
            lng={center.lng}
            zoom={center.zoom}
            operation={operation}
            tipoInmueble={tipoInmueble}
            boundary={boundary}
          />
        )}
      </div>
    </div>
  );
}

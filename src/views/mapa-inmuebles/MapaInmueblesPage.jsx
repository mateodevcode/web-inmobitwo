// views/mapa-inmuebles/MapaInmueblesPage.jsx
// MAPA DE UBICACION CON CHINCHETAS: se entra desde el hero (flujo "ubicación").
// Comportamiento esperado: busca los anuncios más cercanos a la ubicación del
// cliente (geolocalización) o, en su defecto, a lo escrito en el input de
// búsqueda. Al hacer clic en una chincheta se abre un modal con el anuncio
// seleccionado. Cuando el usuario diga "mapa de ubicación con chinchetas",
// se refiere a este componente.

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

  // La ruta /point/... viene del hero con las coords del usuario
  // ("buscar alrededor de mí"): el centro YA es su ubicación, así que el
  // punto azul se pinta solo al entrar, sin pulsar "Tu ubicación".
  const esUbicacionPropia = lat != null && lng != null;

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
            autoMarcarUbicacion={esUbicacionPropia}
          />
        )}
      </div>
    </div>
  );
}

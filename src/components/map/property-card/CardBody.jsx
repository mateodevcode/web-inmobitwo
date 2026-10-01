import { formatPrecioCompleto } from "@/utils/formatPrecio";

export function CardBody({ inmueble, titulo, ubicacion, tipoLabel, operacionLabel }) {
  return (
    <div>
      <h2 className="font-medium text-sm text-blue-600 mb-1 line-clamp-2">
        {titulo}
      </h2>
        <div className="flex items-center gap-2 text-black">
          <p className="text-xl font-bold">
            {formatPrecioCompleto(inmueble.precio)}
          </p>
          {inmueble.operacion_slug === "arriendo" && (
            <p className="text-xs text-gray-500">/mes</p>
          )}
        </div>
        {(inmueble.bedroom_count != null || inmueble.constructed_area != null) && (
          <p className="text-xs text-gray-700 mt-1">
            {inmueble.bedroom_count != null
              ? `${inmueble.bedroom_count} alc. `
              : ""}
            {(inmueble.private_area ?? inmueble.constructed_area) != null
              ? `${inmueble.private_area ?? inmueble.constructed_area} m²`
              : ""}
          </p>
        )}
        {ubicacion && (
          <p className="text-xs text-gray-500 mt-1">
            {ubicacion}
            {tipoLabel ? ` — ${tipoLabel}` : ""}
          </p>
        )}
        <div className="flex items-center gap-2 text-xs mt-2">
          {operacionLabel && (
            <div className="bg-amber-100 px-2 py-0.5 rounded-sm">
              {operacionLabel}
            </div>
          )}
          {tipoLabel && (
            <div className="bg-amber-100 px-2 py-0.5 rounded-sm">
              {tipoLabel}
            </div>
          )}
        </div>
      </div>
  );
}

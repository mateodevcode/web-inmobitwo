import { useRef } from "react";
import * as maplibregl from "maplibre-gl";

// Pinta la chincheta de "mi ubicación" (azul décimo + anillo blanco).
// Se usa tanto al pulsar "Tu ubicación" como al entrar al mapa desde el
// hero con las coords del usuario (ruta /point/...).
// Solo puede existir UNA: antes de pintar, elimina la anterior (sea de
// quien sea) buscándola por clase dentro del contenedor del mapa.
export function pintarMiUbicacion(map, lngLat) {
  if (!map || !lngLat) return null;
  map
    .getContainer()
    ?.querySelectorAll?.(".mi-ubicacion-pin")
    .forEach((n) => n.remove());
  const el = document.createElement("div");
  el.className = "mi-ubicacion-pin";
  Object.assign(el.style, {
    width: "20px",
    height: "20px",
    borderRadius: "9999px",
    backgroundColor: "#1944c5",
    border: "3px solid #ffffff",
    boxShadow: "0 0 0 2px rgba(25,68,197,0.4), 0 2px 6px rgba(0,0,0,0.4)",
    cursor: "pointer",
  });
  el.title = "Tu ubicación";
  return new maplibregl.Marker({ element: el, anchor: "center" })
    .setLngLat(lngLat)
    .addTo(map);
}
export function BackControl({ onBack }) {
  if (!onBack) return null;

  return (
    <button
      className="w-10 h-10 flex items-center justify-center rounded-full bg-primero hover:bg-gray-100 text-gray-700 cursor-pointer shadow-lg border-2 border-segundo/80"
      title="Regresar"
      aria-label="Regresar"
      onClick={onBack}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </svg>
    </button>
  );
}

export function ZoomControl({ map }) {
  if (!map) return null;

  return (
    <div className="flex flex-col overflow-hidden shadow-lg border-2 border-segundo/80 rounded w-min justify-end items-end">
      <button
        className="w-10 h-10 flex items-center justify-center bg-primero hover:bg-gray-100 font-semibold text-gray-700 cursor-pointer text-xl"
        title="Acercar"
        onClick={() => map.zoomIn()}
      >
        +
      </button>
      <button
        className="w-10 h-10 flex items-center justify-center bg-primero hover:bg-gray-100 text-xl font-semibold text-gray-700 cursor-pointer border-t-2 border-segundo/80"
        title="Alejar"
        onClick={() => map.zoomOut()}
      >
        −
      </button>
    </div>
  );
}

export function LocationControl({ map }) {
  const markerRef = useRef(null);

  if (!map) return null;

  const irAUbicacion = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lngLat = [pos.coords.longitude, pos.coords.latitude];
        map.flyTo({ center: lngLat, zoom: 15 });
        // Chincheta de "mi ubicación" (azul décimo + anillo blanco) para
        // distinguirla de las chinchetas de precio de los inmuebles.
        markerRef.current?.remove();
        markerRef.current = pintarMiUbicacion(map, lngLat);
      },
      (err) => {
        console.warn("[Mi ubicación] geolocalización denegada:", err?.message);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    );
  };

  return (
    <div className="rounded overflow-hidden shadow-lg border-2 border-segundo/80 bg-primero">
      <button
        className="flex items-center gap-2 px-4 py-2.5 bg-primero cursor-pointer text-sm text-segundo/80 font-poppins font-semibold hover:bg-gray-100"
        title="Tu ubicacion"
        onClick={irAUbicacion}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
        <span>Tu ubicacion</span>
      </button>
    </div>
  );
}

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import { BsArrowsAngleExpand } from "react-icons/bs";

// Modo "aproximado": en lugar de chincheta exacta muestra un CÍRCULO de
// ~500 m de radio (radio = RADIO_ZONA_UBICACION_M del backend) y bloquea el
// zoom para que no se pueda descender hasta precisar dónde está el inmueble.
export default function UbicacionMapa({
  lat,
  lng,
  zoom = 15,
  aproximado = false,
}) {
  const mapContainerRef = useRef(null);
  const instanceRef = useRef(null);
  const coordsRef = useRef({ lat, lng });

  const zoomEfectivo = aproximado ? Math.min(zoom, 14) : zoom;

  useEffect(() => {
    coordsRef.current = { lat, lng };
  }, [lat, lng]);

  useEffect(() => {
    if (!lat || !lng || instanceRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
          },
        },
        layers: [{ id: "osm-tiles", type: "raster", source: "osm" }],
      },
      center: [lng, lat],
      zoom: zoomEfectivo,
      attributionControl: false,
    });

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "bottom-right",
    );

    if (aproximado) {
      // Círculo de la zona aproximada (radio 500 m) — sin chincheta.
      const radioKm = 0.5;
      const puntos = [];
      for (let i = 0; i <= 64; i++) {
        const angulo = (i / 64) * 2 * Math.PI;
        const dx = radioKm * Math.cos(angulo) / (111.32 * Math.cos((lat * Math.PI) / 180));
        const dy = radioKm * Math.sin(angulo) / 110.574;
        puntos.push([lng + dx, lat + dy]);
      }
      map.on("load", () => {
        map.addSource("zona-aproximada", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [puntos],
            },
          },
        });
        map.addLayer({
          id: "zona-aproximada-fill",
          type: "fill",
          source: "zona-aproximada",
          paint: {
            "fill-color": "#3b82f6",
            "fill-opacity": 0.15,
          },
        });
        map.addLayer({
          id: "zona-aproximada-outline",
          type: "line",
          source: "zona-aproximada",
          paint: {
            "line-color": "#3b82f6",
            "line-width": 2,
          },
        });
      });
      // Anti-triangulación: no permitir acercarse más al mapa.
      map.on("zoomend", () => {
        if (map.getZoom() > 14) map.easeTo({ zoom: 14 });
      });
    } else {
      const el = document.createElement("div");
      el.innerHTML = `<svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 8.6 12.5 27 12.5 27s12.5-18.4 12.5-27C25 5.6 19.4 0 12.5 0z" fill="#FF1B1C"/><circle cx="12.5" cy="12.5" r="5" fill="white"/></svg>`;

      new maplibregl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([lng, lat])
        .addTo(map);
    }

    instanceRef.current = map;

    return () => {
      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }
    };
  }, [lat, lng, zoomEfectivo, aproximado]);

  const handleAmpliar = () => {
    // En modo aproximado no exponemos la coordenada exacta en la URL de
    // Google Maps: se abre la zona sin precisión.
    if (aproximado) {
      window.open(
        `https://www.google.com/maps/@?api=1&map_action=map&center=${lat},${lng}&zoom=14`,
        "_blank",
      );
      return;
    }
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
      "_blank",
    );
  };

  const handleCentrar = () => {
    const map = instanceRef.current;
    const c = coordsRef.current;
    if (map && c.lat && c.lng) {
      map.flyTo({ center: [c.lng, c.lat], zoom: zoomEfectivo, duration: 800 });
    }
  };

  return (
    <div>
      <div className="relative w-full h-64 rounded-sm border border-gray-200">
        <div ref={mapContainerRef} className="w-full h-full rounded-sm" />
        <button
          onClick={handleCentrar}
          className="absolute top-2 right-9 bg-white border border-gray-300 rounded-sm px-2 py-1 text-xs font-semibold shadow hover:bg-gray-100 z-10"
          title="Centrar mapa"
        >
          Centrar
        </button>
      </div>
      <button
        onClick={handleAmpliar}
        className="text-base text-blue-600 hover:underline mt-2 flex items-center gap-2 font-poppins"
      >
        <BsArrowsAngleExpand /> Ampliar mapa
      </button>
    </div>
  );
}

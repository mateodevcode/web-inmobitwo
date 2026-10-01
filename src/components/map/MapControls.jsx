// components/map/MapControls.jsx
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
  if (!map) return null;

  return (
    <div className="rounded overflow-hidden shadow-lg border-2 border-segundo/80 bg-primero">
      <button
        className="flex items-center gap-2 px-4 py-2.5 bg-primero cursor-pointer text-sm text-segundo/80 font-poppins font-semibold hover:bg-gray-100"
        title="Tu ubicacion"
        onClick={() => {
          if (!navigator.geolocation) return;
          navigator.geolocation.getCurrentPosition((pos) => {
            map.flyTo({
              center: [pos.coords.longitude, pos.coords.latitude],
              zoom: 15,
            });
          });
        }}
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

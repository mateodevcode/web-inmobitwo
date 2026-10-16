// Aviso centrado arriba, mismo estilo que los badges del mapa
// (negro transparente con texto blanco).
export function AvisoMapa({ mensaje }) {
  if (!mensaje) return null;
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 max-w-[90%]">
      <div className="bg-black/85 text-white px-4 py-2 rounded-full text-xs text-center">
        {mensaje}
      </div>
    </div>
  );
}

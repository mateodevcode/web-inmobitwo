export function VerInmueblesBar({
  drawMode,
  mapReady,
  hasPolygon,
  loading,
  count,
  onVerInmuebles,
}) {
  if (!(drawMode && mapReady && hasPolygon)) return null;

  return (
    <div className="absolute bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-50">
      <button
        className="flex items-center gap-2 px-6 py-3 rounded-md shadow-lg border-2 border-black/80 bg-[#e6007a] text-white cursor-pointer text-sm font-poppins font-semibold hover:bg-[#c40068] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onVerInmuebles}
        disabled={loading || !count}
      >
        {loading
          ? "Cargando..."
          : `Ver ${count?.toLocaleString() || 0} inmuebles`}
      </button>
    </div>
  );
}

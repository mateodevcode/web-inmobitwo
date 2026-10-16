export function VerInmueblesBar({
  drawMode,
  mapReady,
  hasPolygon,
  loading,
  count,
  onVerInmuebles,
}) {
  if (!(drawMode && mapReady && hasPolygon)) return null;

  // Sin resultados el botón queda en tono bajo (tercero/80) pero SIGUE
  // clicable para mostrar el aviso; solo se deshabilita mientras carga.
  const sinResultados = !loading && !count;

  return (
    <div className="absolute bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-50">
      <button
        className={`flex items-center gap-2 px-6 py-3 rounded-md shadow-lg border-2 border-segundo/80 text-white cursor-pointer text-sm font-poppins font-semibold transition-colors disabled:cursor-not-allowed ${
          sinResultados ? "bg-tercero/80" : "bg-tercero hover:bg-tercero/90"
        }`}
        onClick={onVerInmuebles}
        disabled={loading}
      >
        {loading
          ? "Cargando..."
          : `Ver ${count?.toLocaleString() || 0} inmuebles`}
      </button>
    </div>
  );
}

export function TituloAuto({ tituloGenerado }) {
  return (
    <div>
      <label className="mb-3 block text-xl font-semibold text-slate-900">
        Título
      </label>
      <div className="rounded-md border border-emerald-500 bg-emerald-50 px-4 py-3">
        <p className="text-lg font-semibold text-emerald-900">
          {tituloGenerado || "Se genera automáticamente..."}
        </p>
      </div>
    </div>
  );
}

export function IaGeneratePanel({ generando, onGenerar }) {
  return (
    <div className="rounded-lg bg-blue-50 border border-blue-200 p-6">
      <div className="text-center">
        <p className="text-slate-700 mb-4">
          Usa inteligencia artificial para generar descripciones profesionales
          y atractivas
        </p>
        <button
          type="button"
          onClick={onGenerar}
          disabled={generando}
          className="rounded-md border border-segundo bg-segundo px-8 py-3 text-base font-semibold text-white hover:bg-segundo/80 disabled:opacity-50 cursor-pointer select-none active:scale-95 duration-75 transition"
        >
          {generando
            ? "🤖 Creando descripciones..."
            : "🤖 Generar descripciones con IA"}
        </button>
      </div>
    </div>
  );
}

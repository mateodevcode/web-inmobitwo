const TAB_BASE = "px-4 py-2 font-medium text-sm transition";

export function DescripcionTabs({ vistaActiva, onChange, hasIa }) {
  const tabClass = (id) =>
    `${TAB_BASE} ${
      vistaActiva === id
        ? "text-blue-600 border-b-2 border-blue-600"
        : "text-slate-600 hover:text-slate-900"
    }`;

  return (
    <div className="flex gap-2 mb-4 border-b border-slate-200">
      <button
        type="button"
        onClick={() => onChange("selector")}
        className={tabClass("selector")}
      >
        {hasIa ? "🤖 Opciones IA" : "Editar"}
      </button>

      <button
        type="button"
        onClick={() => onChange("editor")}
        className={tabClass("editor")}
      >
        ✏️ Editar descripción
      </button>
    </div>
  );
}

import { ESTADOS } from "../lib/estados";

export function EstadoFilter({ filtroEstado, onChange }) {
  return (
    <div className="flex items-center gap-2 mb-4 flex-wrap">
      <FilterChip
        active={filtroEstado === "todos"}
        onClick={() => onChange("todos")}
      >
        Todos
      </FilterChip>
      {ESTADOS.map((e) => (
        <FilterChip
          key={e.valor}
          active={filtroEstado === e.valor}
          onClick={() => onChange(e.valor)}
        >
          {e.label}
        </FilterChip>
      ))}
    </div>
  );
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      className={`text-sm font-semibold rounded-full px-3 py-1 cursor-pointer select-none active:scale-95 duration-75 transition ${
        active
          ? "bg-black text-white"
          : "bg-white border border-black/20 text-black"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

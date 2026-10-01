import { ESTADOS_ORG } from "../hooks/useOrganizacionesAdmin";

export function EstadoFilter({ filtro, onChange }) {
  return (
    <div className="flex gap-2 mb-4">
      {ESTADOS_ORG.map((estado) => (
        <button
          key={estado}
          onClick={() => onChange(estado)}
          className={`px-3 py-1 rounded-full text-sm border transition ${
            filtro === estado ? "bg-black text-white" : "bg-white"
          }`}
        >
          {estado}
        </button>
      ))}
    </div>
  );
}

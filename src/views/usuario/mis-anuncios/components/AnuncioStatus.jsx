import { IoAlertCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

export function AnuncioStatus({ estado, onToggle }) {
  const publicado = estado === "publicado";

  return (
    <div className="h-full w-full flex flex-col items-center bg-stone-100">
      <div className="flex items-center justify-center p-4 gap-2">
        <p className="font-bold text-xl md:text-2xl">
          {publicado ? "Activo" : "Desactivado"}
        </p>
        {publicado ? (
          <FaCheckCircle className="text-xl md:text-2xl text-green-600" />
        ) : (
          <IoAlertCircle className="text-xl md:text-2xl text-blue-900" />
        )}
      </div>
      <p className="text-center px-4">
        {publicado
          ? "Ahora se ve en inmobitwo, pero puedes desactivarlo cuando quieras."
          : "Ahora no se ve en inmobitwo, pero puedes reactivarlo gratis."}
      </p>
      <button
        className="bg-stone-300 my-4 py-2 px-4 font-semibold cursor-pointer select-none hover:bg-stone-200"
        onClick={onToggle}
      >
        {publicado ? "Desactivar" : "Reactivar gratis"}
      </button>
    </div>
  );
}

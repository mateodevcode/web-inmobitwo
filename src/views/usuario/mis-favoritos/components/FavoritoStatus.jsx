import { TiHeartFullOutline } from "react-icons/ti";
import { FaCheckCircle } from "react-icons/fa";
import { IoAlertCircle } from "react-icons/io5";

export function FavoritoStatus({ estado, removing, onRemove }) {
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
        onClick={onRemove}
        disabled={removing}
        className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium disabled:opacity-50 mt-4 pb-4 md:pb-0"
      >
        <TiHeartFullOutline className="text-xl" />
        {removing ? "Quitando..." : "Quitar de favoritos"}
      </button>
    </div>
  );
}

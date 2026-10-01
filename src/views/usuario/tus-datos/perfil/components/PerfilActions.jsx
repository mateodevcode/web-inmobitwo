import { useRouter } from "next/navigation";
import { irArriba } from "@/utils/irArriba";
import { MdOutlineModeEdit } from "react-icons/md";

export function AccessLinkRow() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-start mt-6">
      <p className="text-lg font-semibold text-segundo">Tus datos de acceso</p>
      <button
        className="text-lg text-decimo hover:text-decimo/80 cursor-pointer select-none active:scale-95 duration-75 transition mt-2"
        onClick={() => {
          router.push("/usuario/tus-datos/acceso");
          irArriba();
        }}
      >
        Modificar contraseña y email
      </button>
    </div>
  );
}

export function SaveActions({ loading, onGuardar, onCancelar }) {
  return (
    <div className="flex items-center gap-4">
      <button
        className="rounded-md bg-tercero px-6 py-3 md:py-2 text-sm md:text-lg font-semibold text-primero hover:bg-tercero/80 active:scale-[0.99] cursor-pointer select-none mt-8 font-montserrat"
        type="button"
        onClick={onGuardar}
      >
        {loading ? "Cargando" : "Guardar cambios"}
      </button>
      <button
        className="font-montserrat rounded-md bg-segundo px-6 py-3 md:py-2 text-sm md:text-lg font-semibold text-primero hover:bg-segundo/80 active:scale-[0.99] cursor-pointer select-none mt-8"
        type="button"
        onClick={onCancelar}
      >
        Cancelar
      </button>
    </div>
  );
}

export function EditToggle({ onToggle }) {
  return (
    <button
      className="flex items-center gap-2 text-decimo cursor-pointer select-none hover:text-decimo/80 mt-4"
      type="button"
      onClick={onToggle}
    >
      <MdOutlineModeEdit className="text-base md:text-xl" />
      <p className="font-semibold text-base md:text-lg font-montserrat">
        Editar datos
      </p>
    </button>
  );
}

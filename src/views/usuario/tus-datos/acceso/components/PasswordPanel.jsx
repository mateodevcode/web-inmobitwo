import { useAppContext } from "@/context/AppContext";

export function PasswordPanel() {
  const { setOpenModalCambiarPassword } = useAppContext();

  return (
    <div className="w-full md:w-150 bg-stone-50 shadow-sm shadow-black/20 p-6 md:p-8 flex flex-col justify-between border border-black/10 mt-8">
      <div>
        <h3 className="text-xl font-bold text-black">Contraseña</h3>
      </div>

      <button
        className="flex items-center gap-2 text-blue-700 cursor-pointer select-none hover:text-blue-600 mt-8 hover:underline"
        type="button"
        onClick={() => setOpenModalCambiarPassword(true)}
      >
        <p className="font-semibold text-base md:text-lg">
          Cambiar contraseña
        </p>
      </button>
    </div>
  );
}

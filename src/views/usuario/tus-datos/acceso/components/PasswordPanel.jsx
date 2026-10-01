import { useAppContext } from "@/context/AppContext";

export function PasswordPanel() {
  const { setOpenModalCambiarPassword } = useAppContext();

  return (
    <div className="w-full md:w-150 bg-stone-50 shadow-sm shadow-segundo/20 p-6 md:p-8 flex flex-col justify-between border border-segundo/10 mt-8">
      <div>
        <h3 className="text-xl font-bold text-segundo">Contraseña</h3>
      </div>

      <button
        className="flex items-center gap-2 text-decimo cursor-pointer select-none hover:text-decimo/80 mt-8 hover:underline"
        type="button"
        onClick={() => setOpenModalCambiarPassword(true)}
      >
        <p className="font-semibold text-base md:text-lg">Cambiar contraseña</p>
      </button>
    </div>
  );
}

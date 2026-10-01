import { GoArrowLeft } from "react-icons/go";
import { SubmitButton } from "../common/SubmitButton";
import { PasswordInput } from "@/components/auth/PasswordInput";

export function PasswordStep({
  password,
  onChange,
  onSubmit,
  onUseAnotherEmail,
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div>
        <label className="block text-sm font-medium text-black/80 mb-1">
          Contraseña
        </label>
        <PasswordInput
          value={password}
          onChange={onChange}
          inputClassName="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xl"
        />
      </div>

      <SubmitButton loadingLabel="Ingresando...">Continuar</SubmitButton>

      <button
        type="button"
        onClick={onUseAnotherEmail}
        className="text-blue-600 font-medium py-2 rounded-md transition hover:underline text-sm flex items-center justify-center gap-2"
      >
        <GoArrowLeft /> <span>Usar otro email</span>
      </button>

      <div className="flex items-center justify-end py-2 text-sm hover:underline text-black/80 hover:text-blue-600 cursor-pointer select-none">
        <p>¿Olvidaste tu contraseña?</p>
      </div>
    </form>
  );
}

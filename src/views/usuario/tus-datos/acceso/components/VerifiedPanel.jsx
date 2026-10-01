import { FaCheckCircle } from "react-icons/fa";

export function VerifiedPanel({ email, loading, onDesactivar }) {
  return (
    <div className="w-full md:w-150 bg-stone-50 shadow-sm shadow-black/20 p-8 flex flex-col justify-between border border-black/10 mt-8">
      <div>
        <h3 className="text-lg md:text-xl font-bold text-black">
          Protege tu cuenta con verificación por email al iniciar sesión
        </h3>

        <div className="flex items-center gap-4 bg-green-100 p-2 px-4 my-4">
          <FaCheckCircle className="text-green-700 text-xl" />
          <p className="text-base md:text-lg font-semibold text-green-800">
            Verificación en dos pasos activada
          </p>
        </div>

        <p className="text-base md:text-lg mt-2 text-black/90">
          Tus datos cuentan con una seguridad adicional. Al iniciar sesión,
          recibirás un código de verificación en el correo {email} para
          verificar tu identidad.
        </p>
      </div>

      <button
        className="flex items-center gap-2 text-blue-700 cursor-pointer select-none hover:text-blue-600 mt-4 hover:underline"
        type="button"
        disabled={loading}
        onClick={onDesactivar}
      >
        <p className="font-semibold text-base md:text-lg">
          Desactivar verificación por email
        </p>
      </button>
    </div>
  );
}

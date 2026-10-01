import { GoAlert } from "react-icons/go";
import { IoMailOutline } from "react-icons/io5";
import { CodeForm } from "./CodeForm";

export function UnverifiedPanel({
  email,
  loading,
  codigoEnviado,
  codigoInput,
  onCodigoChange,
  onEnviarCodigo,
  onConfirmarCodigo,
}) {
  return (
    <div className="w-full md:w-150 bg-stone-50 shadow-sm shadow-black/20 p-6 md:p-8 flex flex-col justify-between border border-black/10 mt-8">
      <div>
        <h3 className="text-xl font-bold text-black">
          Verifica tu correo electrónico para proteger tu cuenta
        </h3>

        <div className="flex items-center gap-4 bg-black/5 p-2 px-4 my-4">
          <GoAlert className="text-black text-xl" />
          <p className="text-base md:text-lg font-semibold text-black">
            Email sin verificar
          </p>
        </div>

        <p className="text-base md:text-lg mt-2 text-black/90">
          Tu dirección de correo {email} aún no ha sido verificada. Verifícala
          para activar la seguridad adicional y poder recibir códigos al
          iniciar sesión.
        </p>
      </div>

      {!codigoEnviado ? (
        <button
          className="flex items-center gap-2 text-white cursor-pointer select-none hover:bg-black/80 bg-black mt-4 py-2 px-4 rounded-md justify-center w-full md:w-80 active:scale-95 duration-75 transition disabled:opacity-50"
          type="button"
          disabled={loading}
          onClick={onEnviarCodigo}
        >
          <IoMailOutline className="text-lg md:text-xl" />
          <p className="font-semibold text-base">
            Enviar correo de verificación
          </p>
        </button>
      ) : (
        <CodeForm
          email={email}
          loading={loading}
          codigoInput={codigoInput}
          onCodigoChange={onCodigoChange}
          onEnviarCodigo={onEnviarCodigo}
          onConfirmarCodigo={onConfirmarCodigo}
        />
      )}
    </div>
  );
}

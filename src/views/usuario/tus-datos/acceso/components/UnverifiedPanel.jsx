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
    <div className="w-full md:w-150 bg-stone-50 shadow-sm shadow-segundo/20 p-6 md:p-8 flex flex-col justify-between border border-segundo/10 mt-8">
      <div>
        <h3 className="text-xl font-bold text-segundo">
          Verifica tu correo electrónico para proteger tu cuenta
        </h3>

        <div className="flex items-center gap-4 bg-segundo/5 p-4 px-6 my-4">
          <GoAlert className="text-segundo text-xl" />
          <p className="text-base md:text-lg font-semibold text-segundo">
            Email sin verificar
          </p>
        </div>

        <p className="text-base md:text-lg mt-2 text-segundo/90">
          Tu dirección de correo {email} aún no ha sido verificada. Verifícala
          para activar la seguridad adicional y poder recibir códigos al iniciar
          sesión.
        </p>
      </div>

      {!codigoEnviado ? (
        <button
          className="flex items-center gap-2 text-primero cursor-pointer select-none hover:bg-segundo/80 bg-segundo mt-4 py-2 px-4 rounded-md justify-center w-full md:w-max active:scale-95 duration-75 transition disabled:opacity-50 font-montserrat"
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

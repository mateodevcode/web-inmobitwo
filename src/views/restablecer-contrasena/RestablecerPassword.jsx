"use client";

import Logo from "@/components/logo/Logo";
import BarraNavegacionTauri from "@/components/barra-navegacion/BarraNavegacionTauri";
import { scrollbarStyles } from "@/data/data.styles.scrollbar.js";
import { useSearchParams } from "next/navigation";
import { useValidarCodigo } from "./hooks/useValidarCodigo";
import { useResetPassword } from "./hooks/useResetPassword";
import { ValidarCodigo } from "./components/validar/ValidarCodigo";
import { FormRestablecer } from "./components/form/FormRestablecer";
import { MensajeConfirmacion } from "./components/MensajeConfirmacion";

const RestablecerPassword = () => {
  const searchParams = useSearchParams();
  const { email, setEmail, codigo, setCodigo, loading, idReset, validar } =
    useValidarCodigo(searchParams.get("email") ?? "");
  const { submitting, complete, cambiar } = useResetPassword(idReset, email);

  return (
    <div className="grid grid-cols-1 bg-gray-100 relative">
      <div className="bg-gray-100 min-h-dvh flex flex-col items-center justify-center py-10">
        <div className="flex items-center justify-center px-4 w-full">
          <div className="max-w-md w-full min-w-sm bg-white p-8">
            {!idReset && (
              <>
                <div className="pb-5 flex items-center flex-col">
                  <Logo />
                  <p className="text-center mt-2">
                    Valida el código de tu correo
                  </p>
                </div>
                <ValidarCodigo
                  email={email}
                  onEmailChange={setEmail}
                  codigo={codigo}
                  onCodigoChange={setCodigo}
                  loading={loading}
                  onValidar={validar}
                />
              </>
            )}

            {idReset && !complete && (
              <>
                <div className="pb-5 flex items-center flex-col">
                  <Logo />
                  <p className="text-center mt-2">
                    Crea una nueva contraseña segura
                  </p>
                </div>
                <FormRestablecer
                  submitting={submitting}
                  onSubmit={cambiar}
                />
              </>
            )}

            {complete && <MensajeConfirmacion />}
          </div>
        </div>
      </div>

      <BarraNavegacionTauri />
      <style>{scrollbarStyles.default}</style>
    </div>
  );
};

export default RestablecerPassword;

import HeaderInmobitwo from "@/components/header-inmobitwo/HeaderInmobitwo";
import HeadPerfilAcceso from "../components/HeadPerfilAcceso";
import { useEffect } from "react";
import { useVerificacionEmail } from "./hooks/useVerificacionEmail";
import { VerifiedPanel } from "./components/VerifiedPanel";
import { UnverifiedPanel } from "./components/UnverifiedPanel";
import { EmailPanel } from "./components/EmailPanel";
import { PasswordPanel } from "./components/PasswordPanel";

const Acceso = () => {
  const {
    usuario,
    formDataUsuario,
    loading,
    codigoEnviado,
    codigoInput,
    setCodigoInput,
    cargarUsuario,
    handleEnviarCodigo,
    handleConfirmarCodigo,
    handleDesactivar,
  } = useVerificacionEmail();

  const { email } = usuario ?? {};

  // Carga datos al tener usuario (fn no memoizada: a deps = loop).
  useEffect(() => {
    if (usuario?.id) {
      cargarUsuario(usuario.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario?.id]); 

  return (
    <div className="flex flex-col font-montserrat relative items-center">
      <HeaderInmobitwo />
      <HeadPerfilAcceso />

      <div className="w-11/12 md:w-9/12 min-h-svh mb-8 md:mb-20">
        {formDataUsuario.email_verificado ? (
          <VerifiedPanel
            email={email}
            loading={loading}
            onDesactivar={handleDesactivar}
          />
        ) : (
          <UnverifiedPanel
            email={email}
            loading={loading}
            codigoEnviado={codigoEnviado}
            codigoInput={codigoInput}
            onCodigoChange={setCodigoInput}
            onEnviarCodigo={handleEnviarCodigo}
            onConfirmarCodigo={handleConfirmarCodigo}
          />
        )}

        <EmailPanel email={email} telefono={formDataUsuario.telefono} />

        <PasswordPanel />
      </div>
    </div>
  );
};

export default Acceso;

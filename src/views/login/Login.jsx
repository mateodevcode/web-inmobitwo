import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { scrollbarStyles } from "@/data/data.styles.scrollbar.js";
import Logo from "@/components/logo/Logo";
import BarraNavegacionTauri from "@/components/barra-navegacion/BarraNavegacionTauri";
import { useSearchParams } from "next/navigation";
import { useEmailPrefill } from "./hooks/useEmailPrefill";
import { EmailStep } from "./components/email-step/EmailStep";
import { PasswordStep } from "./components/password-step/PasswordStep";
import { ProfessionalFooter } from "./components/common/ProfessionalFooter";

const Login = () => {
  const {
    handleChange,
    handleValidateEmail,
    handleLogin,
    handleChangeEmail,
    formDataUsuario,
    setFormDataUsuario,
  } = useAuth();
  const searchParams = useSearchParams();
  const emailActual = searchParams.get("email");

  useEmailPrefill(emailActual, formDataUsuario, setFormDataUsuario);

  return (
    <div className="grid grid-cols-1 bg-gray-100 relative">
      <div
        className="bg-gray-100 h-dvh flex flex-col items-center justify-center"
        id="form-login"
      >
        <div className="flex items-center justify-center px-4">
          <div className="max-w-md min-w-sm bg-white p-8">
            <div className="pb-5 flex items-center flex-col">
              <Logo />
              <p className="text-center mt-2">
                Accede a tu cuenta de Inmobitwo
              </p>
            </div>

            {!emailActual && (
              <EmailStep
                email={formDataUsuario.email}
                onChange={handleChange}
                onSubmit={handleValidateEmail}
              />
            )}

            {emailActual && (
              <PasswordStep
                password={formDataUsuario.password}
                onChange={handleChange}
                onSubmit={handleLogin}
                onUseAnotherEmail={handleChangeEmail}
              />
            )}
          </div>
        </div>

        <ProfessionalFooter />
      </div>

      <BarraNavegacionTauri />
      <style>{scrollbarStyles.default}</style>
    </div>
  );
};

export default Login;

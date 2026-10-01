import useAuth from "@/hooks/useAuth";
import { scrollbarStyles } from "@/data/data.styles.scrollbar.js";
import Logo from "@/components/logo/Logo";
import BarraNavegacionTauri from "@/components/barra-navegacion/BarraNavegacionTauri";
import { useSearchParams } from "next/navigation";
import { useEmailPrefill } from "./hooks/useEmailPrefill";
import { EmailStep } from "./components/email-step/EmailStep";
import { PasswordStep } from "./components/password-step/PasswordStep";
import { OtpStep } from "./components/otp-step/OtpStep";
import { ProfessionalFooter } from "./components/common/ProfessionalFooter";
import { agregarNext } from "@/utils/authRedirect.js";

const Login = () => {
  const {
    handleChange,
    handleValidateEmail,
    handleLogin,
    handleVerificarOtp,
    handleReenviarOtp,
    handleChangeEmail,
    formDataUsuario,
    setFormDataUsuario,
  } = useAuth();
  const searchParams = useSearchParams();
  const emailActual = searchParams.get("email");
  // Segundo factor: el login con email verificado avanza a ?otp=1.
  const requiereOtp = searchParams.get("otp") === "1";
  // Página de origen (?next=): a dónde volver tras un login exitoso.
  // Se propaga por los pasos de email/password/otp y se consume al final.
  const nextRaw = searchParams.get("next");

  useEmailPrefill(emailActual, formDataUsuario, setFormDataUsuario);

  // El paso OTP necesita el email; sin él se vuelve al paso 1.
  const emailOtp = formDataUsuario.email || emailActual || "";
  const mostrarOtp = requiereOtp && !!emailOtp;

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

            {!emailActual && !mostrarOtp && (
              <EmailStep
                email={formDataUsuario.email}
                onChange={handleChange}
                onSubmit={(e) => handleValidateEmail(e, nextRaw)}
                registerHref={agregarNext("/registro", nextRaw)}
              />
            )}

            {emailActual && !mostrarOtp && (
              <PasswordStep
                password={formDataUsuario.password}
                onChange={handleChange}
                onSubmit={(e) => handleLogin(e, nextRaw)}
                onUseAnotherEmail={() => handleChangeEmail(nextRaw)}
              />
            )}

            {mostrarOtp && (
              <OtpStep
                key={emailOtp}
                email={emailOtp}
                onSubmit={(codigo) => handleVerificarOtp(codigo, nextRaw)}
                onReenviar={handleReenviarOtp}
                onVolver={() => handleChangeEmail(nextRaw)}
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

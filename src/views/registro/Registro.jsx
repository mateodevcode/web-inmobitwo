import useAuth from "@/hooks/useAuth.js";
import { scrollbarStyles } from "@/data/data.styles.scrollbar.js";
import BarraNavegacionTauri from "@/components/barra-navegacion/BarraNavegacionTauri";
import { RegisterHeader } from "./components/RegisterHeader";
import { RegisterForm } from "./components/form/RegisterForm";
import { LoginLink } from "./components/LoginLink";

const Registro = () => {
  const { handleRegistro, handleChange, formDataUsuario } = useAuth();

  return (
    <div className="h-dvh flex items-center justify-center px-4 relative bg-gray-100">
      <div className="max-w-md min-w-sm p-8 bg-white/80">
        <RegisterHeader />

        <RegisterForm
          values={formDataUsuario}
          onChange={handleChange}
          onSubmit={handleRegistro}
        />

        <LoginLink />
      </div>

      <BarraNavegacionTauri />
      <style>{scrollbarStyles.default}</style>
    </div>
  );
};

export default Registro;

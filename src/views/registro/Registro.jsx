import useAuth from "@/hooks/useAuth.js";
import { useSearchParams } from "next/navigation";
import { scrollbarStyles } from "@/data/data.styles.scrollbar.js";
import BarraNavegacionTauri from "@/components/barra-navegacion/BarraNavegacionTauri";
import { RegisterHeader } from "./components/RegisterHeader";
import { RegisterForm } from "./components/form/RegisterForm";
import { LoginLink } from "./components/LoginLink";

const Registro = () => {
  const { handleRegistro, handleChange, formDataUsuario } = useAuth();
  // Página de origen (?next=): a dónde volver tras un registro exitoso.
  // (La page /registro ya está envuelta en <Suspense>, exigido por useSearchParams.)
  const nextRaw = useSearchParams().get("next");

  return (
    <div className="h-dvh flex items-center justify-center px-4 relative bg-gray-100">
      <div className="max-w-md min-w-sm p-8 bg-white/80">
        <RegisterHeader />

        <RegisterForm
          values={formDataUsuario}
          onChange={handleChange}
          onSubmit={(e) => handleRegistro(e, nextRaw)}
        />

        <LoginLink nextRaw={nextRaw} />
      </div>

      <BarraNavegacionTauri />
      <style>{scrollbarStyles.default}</style>
    </div>
  );
};

export default Registro;

"use client";

import Logo from "@/components/logo/Logo";
import BarraNavegacionTauri from "@/components/barra-navegacion/BarraNavegacionTauri";
import { scrollbarStyles } from "@/data/data.styles.scrollbar.js";
import { useSearchParams } from "next/navigation";
import { useSolicitarCodigo } from "./hooks/useSolicitarCodigo";
import { SolicitarForm } from "./components/solicitar/SolicitarForm";

const OlvidastePassword = () => {
  const searchParams = useSearchParams();
  const { email, setEmail, enviado, loading, solicitar } = useSolicitarCodigo(
    searchParams.get("email") ?? "",
  );

  return (
    <div className="grid grid-cols-1 bg-gray-100 relative">
      <div
        className="bg-gray-100 h-dvh flex flex-col items-center justify-center"
        id="form-recovery"
      >
        <div className="flex items-center justify-center px-4">
          <div className="max-w-md min-w-sm bg-white p-8">
            <div className="pb-5 flex items-center flex-col">
              <Logo />
              <p className="text-center mt-2">
                Recupera tu cuenta de Inmobitwo
              </p>
            </div>

            <SolicitarForm
              email={email}
              onChange={setEmail}
              loading={loading}
              enviado={enviado}
              onSubmit={solicitar}
            />
          </div>
        </div>
      </div>

      <BarraNavegacionTauri />
      <style>{scrollbarStyles.default}</style>
    </div>
  );
};

export default OlvidastePassword;

"use client";
export const dynamic = "force-dynamic";
// Home: en modo red-social es PageInicio; en modo organización (dominio
// propio) es el escaparate de la org. Equivale a "/" de AppRouter.jsx.
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import PageInicio from "@/views/inicio/PageInicio";
import { useTenant } from "@/context/TenantContext.js";
import { OrgShell } from "@/views/organizacion/paginas/OrgShell.jsx";
import HomeTemaSlot from "@/views/organizacion/paginas/HomeTemaSlot.jsx";

const Cargando = () => (
  <div className="flex min-h-screen items-center justify-center bg-primero text-segundo">
    Cargando...
  </div>
);

const Page = () => {
  const { modo, cargandoTenant, organizacionActual } = useTenant();

  if (cargandoTenant || modo === "cargando") return <Cargando />;

  if (modo === "organizacion") {
    return (
      <OrgShell organizacion={organizacionActual} basePath="">
        <HomeTemaSlot />
      </OrgShell>
    );
  }

  return (
    <div>
      <PageInicio />
      <style>{scrollbarStyles.default}</style>
    </div>
  );
};

export default Page;

"use client";
export const dynamic = "force-dynamic";
// /sobre-nosotros — solo existe en modo organización (dominio propio).
// En red-social redirige a "/". Equivale a rutasModoOrganizacion de Vite.
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTenant } from "@/context/TenantContext.js";
import { OrgShell } from "@/views/organizacion/paginas/OrgShell.jsx";
import SobreNosotrosTemaSlot from "@/views/organizacion/paginas/SobreNosotrosTemaSlot.jsx";

export default function RoutePage() {
  const { modo, cargandoTenant, organizacionActual } = useTenant();
  const router = useRouter();

  useEffect(() => {
    if (!cargandoTenant && modo === "red-social") router.replace("/");
  }, [cargandoTenant, modo, router]);

  if (cargandoTenant || modo !== "organizacion") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primero text-segundo">
        Cargando...
      </div>
    );
  }

  return (
    <OrgShell organizacion={organizacionActual} basePath="">
      <SobreNosotrosTemaSlot />
    </OrgShell>
  );
}

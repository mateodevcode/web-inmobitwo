"use client";
// Redirección: "Descartados" ahora es la cuarta pestaña de "Tu cuenta".
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Cargando = () => (
  <div className="flex min-h-screen items-center justify-center bg-primero text-segundo">
    Cargando...
  </div>
);

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/usuario/tus-datos/descartados");
  }, [router]);
  return <Cargando />;
}

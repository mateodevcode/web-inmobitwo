"use client";
// Redirección: "Mis búsquedas" ahora es la tercera pestaña de "Tu cuenta".
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
    router.replace("/usuario/tus-datos/mis-busquedas");
  }, [router]);
  return <Cargando />;
}

"use client";
// src/app/usuario/tus-datos/perfil/page.js — equivale a la ruta "/usuario/tus-datos/perfil" de AppRouter.jsx (Vite).
import { Suspense } from "react";
import Page from "@/views/usuario/tus-datos/perfil/MiPerfil.jsx";
import { RutaPrivada } from "@/components/guards/Guards.jsx";
const Cargando = () => (
  <div className="flex min-h-screen items-center justify-center bg-primero text-segundo">
    Cargando...
  </div>
);

export default function RoutePage() {
  return (
    <Suspense fallback={<Cargando />}>
      <RutaPrivada><Page /></RutaPrivada>
    </Suspense>
  );
}

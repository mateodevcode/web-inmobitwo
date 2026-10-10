"use client";
// src/app/usuario/tus-datos/mis-busquedas/page.js — tercera pestaña de "Tu cuenta".
import { Suspense } from "react";
import Page from "@/views/usuario/tus-datos/mis-busquedas/MisBusquedas.jsx";
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

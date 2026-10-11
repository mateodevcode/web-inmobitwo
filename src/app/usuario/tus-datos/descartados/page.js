"use client";
// src/app/usuario/tus-datos/descartados/page.js — cuarta pestaña de "Tu cuenta".
import { Suspense } from "react";
import Page from "@/views/usuario/tus-datos/descartados/Descartados.jsx";
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

"use client";
// src/app/organizaciones/agentes/page.js — equivale a la ruta "/organizaciones/agentes" de AppRouter.jsx (Vite).
import { Suspense } from "react";
import Page from "@/views/organizacion/AgentesPanel.jsx";
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

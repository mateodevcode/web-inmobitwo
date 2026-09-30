"use client";
// src/app/leads/page.js — equivale a la ruta "/leads" de AppRouter.jsx (Vite).
import { Suspense } from "react";
import Page from "@/views/Leads.jsx";
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

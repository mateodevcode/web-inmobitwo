"use client";
// src/app/propiedades/[id]/page.js — equivale a la ruta "/propiedades/[id]" de AppRouter.jsx (Vite).
import { Suspense } from "react";
import Page from "@/views/PagePropiedadId.jsx";
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

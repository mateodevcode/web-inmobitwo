"use client";
// src/app/nuevo-profesional/page.js — equivale a la ruta "/nuevo-profesional" de AppRouter.jsx (Vite).
import { Suspense } from "react";
import Page from "@/views/nuevo-profesional/NuevoProfesional.jsx";
const Cargando = () => (
  <div className="flex min-h-screen items-center justify-center bg-primero text-segundo">
    Cargando...
  </div>
);

export default function RoutePage() {
  return (
    <Suspense fallback={<Cargando />}>
      <Page />
    </Suspense>
  );
}

"use client";
// src/app/olvidaste-tu-password/page.js — equivale a la ruta "/olvidaste-tu-password" de AppRouter.jsx (Vite).
import { Suspense } from "react";
import Page from "@/views/olvidaste-tu-password/OlvidastePassword.jsx";
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

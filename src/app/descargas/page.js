"use client";
// src/app/descargas/page.js — equivale a la ruta "/descargas" de AppRouter.jsx (Vite).
import { Suspense } from "react";
import Page from "@/views/descargas/DescargarApp.jsx";
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

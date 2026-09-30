"use client";
// src/app/[operationAndType]/zona-personalizada/page.js — equivale a la ruta "/[operationAndType]/zona-personalizada" de AppRouter.jsx (Vite).
import { Suspense } from "react";
import Page from "@/views/lista-propiedades/ListaPropiedades.jsx";
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

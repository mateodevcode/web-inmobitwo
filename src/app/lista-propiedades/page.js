"use client";
// src/app/lista-propiedades/page.js — equivale a la ruta "/lista-propiedades" de AppRouter.jsx (Vite).
import { Suspense } from "react";
import Page from "@/views/ListaPruebaPropiedades.jsx";
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

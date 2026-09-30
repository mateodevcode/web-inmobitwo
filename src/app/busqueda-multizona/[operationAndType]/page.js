"use client";
// src/app/busqueda-multizona/[operationAndType]/page.js — equivale a la ruta "/busqueda-multizona/[operationAndType]" de AppRouter.jsx (Vite).
import { Suspense } from "react";
import Page from "@/views/seleccionar-zona/SeleccionarZonaPage.jsx";
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

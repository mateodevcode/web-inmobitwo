"use client";
// src/app/[operationAndType]/[cityAndDepartment]/mapa/page.js — equivale a la ruta "/[operationAndType]/[cityAndDepartment]/mapa" de AppRouter.jsx (Vite).
import { Suspense } from "react";
import Page from "@/views/mapa-inmuebles/MapaInmueblesPage.jsx";
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

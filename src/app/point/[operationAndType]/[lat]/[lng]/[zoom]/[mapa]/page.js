"use client";
// src/app/point/[operationAndType]/[lat]/[lng]/[zoom]/[mapa]/page.js — equivale a la ruta "/point/[operationAndType]/[lat]/[lng]/[zoom]/[mapa]" de AppRouter.jsx (Vite).
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

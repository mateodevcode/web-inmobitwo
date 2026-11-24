"use client";
// src/app/[operationAndType]/zonas/page.js — resultados de varias zonas del mapa (?z=tipo:codigo,...).
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

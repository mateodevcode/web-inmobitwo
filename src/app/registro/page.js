"use client";
// src/app/registro/page.js — equivale a la ruta "/registro" de AppRouter.jsx (Vite).
import { Suspense } from "react";
import Page from "@/views/registro/Registro.jsx";
import { RutaPublica } from "@/components/guards/Guards.jsx";
const Cargando = () => (
  <div className="flex min-h-screen items-center justify-center bg-primero text-segundo">
    Cargando...
  </div>
);

export default function RoutePage() {
  return (
    <Suspense fallback={<Cargando />}>
      <RutaPublica><Page /></RutaPublica>
    </Suspense>
  );
}

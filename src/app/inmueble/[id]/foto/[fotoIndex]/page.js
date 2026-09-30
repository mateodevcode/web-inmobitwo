"use client";
// src/app/inmueble/[id]/foto/[fotoIndex]/page.js — equivale a la ruta "/inmueble/[id]/foto/[fotoIndex]" de AppRouter.jsx (Vite).
import { Suspense } from "react";
import Page from "@/views/anuncio/foto-visor/FotoVisor.jsx";
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

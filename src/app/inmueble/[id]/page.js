"use client";
// src/app/inmueble/[id]/page.js — equivale a la ruta "/inmueble/[id]" de AppRouter.jsx (Vite).
import { Suspense } from "react";
import Page from "@/views/anuncio/PageAnuncio.jsx";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
const Cargando = () => (
  <div className="flex min-h-screen items-center justify-center bg-primero text-segundo">
    Cargando...
  </div>
);

export default function RoutePage() {
  return (
    <Suspense fallback={<Cargando />}>
      <Page />
      <style>{scrollbarStyles.default}</style>
    </Suspense>
  );
}

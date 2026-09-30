"use client";
// src/app/info/publicar-anuncio/page.js — equivale a la ruta "/info/publicar-anuncio" de AppRouter.jsx (Vite).
import { Suspense } from "react";
import Page from "@/views/publicar-anuncio-info/InfoPublicarAnuncio.jsx";
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

"use client";
// src/app/info/publicar-anuncio/publicar/page.js — equivale a la ruta "/info/publicar-anuncio/publicar" de AppRouter.jsx (Vite).
import { Suspense } from "react";
import Page from "@/views/publicar-anuncio/PublicarAnuncio.jsx";
import { RutaPrivada } from "@/components/guards/Guards.jsx";
const Cargando = () => (
  <div className="flex min-h-screen items-center justify-center bg-primero text-segundo">
    Cargando...
  </div>
);

export default function RoutePage() {
  return (
    <Suspense fallback={<Cargando />}>
      <RutaPrivada><Page /></RutaPrivada>
    </Suspense>
  );
}

"use client";
// src/app/login/page.js — equivale a la ruta "/login" de AppRouter.jsx (Vite).
import { Suspense } from "react";
import Page from "@/views/login/Login.jsx";
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

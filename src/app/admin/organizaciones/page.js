"use client";
// src/app/admin/organizaciones/page.js — equivale a la ruta "/admin/organizaciones" de AppRouter.jsx (Vite).
import { Suspense } from "react";
import Page from "@/views/admin/organizaciones/AdminOrganizacionesPage.jsx";
import { RutaAdmin } from "@/components/guards/Guards.jsx";
const Cargando = () => (
  <div className="flex min-h-screen items-center justify-center bg-primero text-segundo">
    Cargando...
  </div>
);

export default function RoutePage() {
  return (
    <Suspense fallback={<Cargando />}>
      <RutaAdmin><Page /></RutaAdmin>
    </Suspense>
  );
}

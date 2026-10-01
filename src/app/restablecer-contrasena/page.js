"use client";
// src/app/restablecer-contrasena/page.js — equivale a la ruta "/restablecer-contrasena".
import { Suspense } from "react";
import Page from "@/views/restablecer-contrasena/RestablecerPassword.jsx";
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

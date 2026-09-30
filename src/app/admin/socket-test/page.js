"use client";
// src/app/admin/socket-test/page.js — prueba manual del socket-core (solo superadmin).
import { Suspense } from "react";
import Page from "@/views/admin/SocketTest.jsx";
import { RutaAdmin } from "@/components/guards/Guards.jsx";

const Cargando = () => (
  <div className="flex min-h-screen items-center justify-center bg-primero text-segundo">
    Cargando...
  </div>
);

export default function RoutePage() {
  return (
    <Suspense fallback={<Cargando />}>
      <RutaAdmin>
        <Page />
      </RutaAdmin>
    </Suspense>
  );
}

"use client";
// Guards de ruta (equivalen a router/guards.jsx de Vite).
// Esperan a `authListo` (sesión hidratada tras montar) antes de decidir:
// sin esto redirigirían con la sesión aún en null y patearían a /login
// a usuarios logueados en cada recarga.
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext.js";

const Cargando = ({ texto = "Cargando..." }) => (
  <div className="flex min-h-screen items-center justify-center bg-primero text-segundo">
    {texto}
  </div>
);

export const RutaPrivada = ({ children }) => {
  const { estaAutenticado, authListo } = useAppContext();
  const router = useRouter();
  useEffect(() => {
    if (!authListo) return;
    if (!estaAutenticado) router.replace("/login");
  }, [authListo, estaAutenticado, router]);
  if (!authListo || !estaAutenticado) return <Cargando />;
  return children;
};

export const RutaAdmin = ({ children }) => {
  const { estaAutenticado, esSuperAdmin, authListo } = useAppContext();
  const router = useRouter();
  useEffect(() => {
    if (!authListo) return;
    if (!estaAutenticado) router.replace("/login");
    else if (!esSuperAdmin) router.replace("/");
  }, [authListo, estaAutenticado, esSuperAdmin, router]);
  if (!authListo || !estaAutenticado || !esSuperAdmin) return <Cargando />;
  return children;
};

export const RutaPublica = ({ children }) => {
  const { estaAutenticado, authListo } = useAppContext();
  const router = useRouter();
  useEffect(() => {
    if (authListo && estaAutenticado) router.replace("/");
  }, [authListo, estaAutenticado, router]);
  if (!authListo || estaAutenticado) return <Cargando />;
  return children;
};

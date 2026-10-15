"use client";
// src/app/auth/google/callback/page.js — retorno del OAuth con Google.
// El backend redirige aquí con ?code= (un solo uso) que se canjea por la sesión.
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext.js";
import { apiBackend } from "@/actions/apiBackend.js";
import { leerNextActual } from "@/utils/authRedirect.js";

function CallbackContenido() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { guardarSesion } = useAppContext();
  const code = searchParams.get("code");
  const [error, setError] = useState(() => (code ? null : "Falta el código de autorización."));

  useEffect(() => {
    if (!code) return;
    let vivo = true;
    (async () => {
      const res = await apiBackend("/auth/oauth/google/canjear", "POST", { code });
      if (!vivo) return;
      if (res.success) {
        await guardarSesion(res.data.usuario, res.data.accessToken);
        router.replace(leerNextActual() ?? "/");
      } else {
        queueMicrotask(() => vivo && setError(res.error || "No se pudo completar el ingreso con Google."));
      }
    })();
    return () => {
      vivo = false;
    };
  }, [code, guardarSesion, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-primero text-segundo">
      {error ? (
        <div className="max-w-md p-8 text-center">
          <p className="mb-4 font-semibold">No se pudo ingresar con Google</p>
          <p className="mb-4 text-sm">{error}</p>
          <Link href="/login" className="text-sm underline">
            Volver al login
          </Link>
        </div>
      ) : (
        <p>Completando el ingreso con Google…</p>
      )}
    </div>
  );
}

export default function RoutePage() {
  return (
    <Suspense fallback={<p>Cargando…</p>}>
      <CallbackContenido />
    </Suspense>
  );
}

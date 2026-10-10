"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { bajaBusqueda, reactivarBusqueda } from "@/actions/busquedasGuardadas";

export default function BajaBusqueda() {
  const { token } = useParams();
  const [estado, setEstado] = useState("confirmar"); // confirmar | baja | reactivada | error
  const [nombre, setNombre] = useState("");
  const [cargando, setCargando] = useState(false);

  const ejecutar = async (fn, siguiente) => {
    setCargando(true);
    const r = await fn(token);
    setCargando(false);
    if (r?.success) { setNombre(r.data?.nombre || ""); setEstado(siguiente); }
    else setEstado("error");
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-neutral-100">
      <div className="bg-white rounded-xl p-8 max-w-md w-full text-center space-y-4">
        {estado === "confirmar" && (<>
          <h1 className="text-xl font-bold">¿Dejar de recibir esta alerta?</h1>
          <p className="text-neutral-600 text-sm">Pausaremos los avisos de esta búsqueda guardada.</p>
          <button disabled={cargando} onClick={() => ejecutar(bajaBusqueda, "baja")}
            className="w-full bg-black text-white font-bold rounded-lg py-3 disabled:opacity-50">Confirmar baja</button>
        </>)}
        {estado === "baja" && (<>
          <h1 className="text-xl font-bold">Listo, alerta pausada</h1>
          <p className="text-neutral-600 text-sm">Ya no recibirás avisos de &quot;{nombre}&quot;.</p>
          <button disabled={cargando} onClick={() => ejecutar(reactivarBusqueda, "reactivada")}
            className="w-full border rounded-lg py-3">Fue un error, reactivar</button>
          <Link href="/usuario/tus-datos/mis-busquedas" className="block text-sm underline">Administrar mis búsquedas</Link>
        </>)}
        {estado === "reactivada" && (<>
          <h1 className="text-xl font-bold">Alerta reactivada</h1>
          <p className="text-neutral-600 text-sm">Volverás a recibir avisos de &quot;{nombre}&quot;.</p>
        </>)}
        {estado === "error" && <p className="text-red-600">El enlace no es válido o la búsqueda ya no existe.</p>}
      </div>
    </main>
  );
}

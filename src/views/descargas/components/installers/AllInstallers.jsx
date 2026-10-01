import { descargas, ordenSO } from "@/data/descargas.jsx";
import { InstallerCard } from "./InstallerCard";

export function AllInstallers() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <h2 className="font-display text-2xl font-bold tracking-tight text-segundo sm:text-3xl">
          Todos los instaladores
        </h2>
        <p className="mt-3 text-segundo/60">
          Elige la versión que corresponde a tu equipo.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {ordenSO.map((key) => (
          <InstallerCard key={key} installer={descargas[key]} />
        ))}
      </div>
    </section>
  );
}

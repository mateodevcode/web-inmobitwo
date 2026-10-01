import { descargas, ordenSO } from "@/data/descargas";
import { RecommendedCard } from "./RecommendedCard";
import { TrustBadges } from "./TrustBadges";
import { OtherSystems } from "./OtherSystems";
import { useDetectarSO } from "../../hooks/useDetectarSO";

export function DownloadHero() {
  const so = useDetectarSO();

  const principal = descargas[so ?? "windows"];
  const otrosSistemas = ordenSO.filter((k) => k !== (so ?? "windows"));

  return (
    <section className="relative overflow-hidden font-poppins">
      <div
        className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-72 max-w-3xl rounded-full bg-tercero/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-4 pb-8 xl:pt-20 text-center sm:px-6 pt-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-tercero/20 bg-primero px-4 py-1.5 text-sm font-medium text-tercero">
          <span
            className="size-1.5 rounded-full bg-tercero"
            aria-hidden="true"
          />
          Aplicación de escritorio
        </span>

        <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-tight tracking-tight text-segundo sm:text-6xl">
          Descarga inmobitwo
          <br className="hidden sm:block" /> en tu ordenador
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-segundo/60">
          Publica, gestiona y responde a tus inmuebles desde una app rápida y
          nativa. Para personas que buscan casa y para empresas que gestionan
          carteras enteras.
        </p>

        <div className="mx-auto mt-10 max-w-xl">
          <RecommendedCard principal={principal} detected={!!so} />
          <TrustBadges />
          <OtherSystems otrosSistemas={otrosSistemas} />
        </div>
      </div>
    </section>
  );
}

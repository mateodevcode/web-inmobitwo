import { Download } from "lucide-react";

export function RecommendedCard({ principal, detected }) {
  const { Icon } = principal;

  return (
    <div className="rounded-3xl border border-segundo/10 bg-primero p-6 shadow-lg shadow-tercero/5 sm:p-8">
      <div className="flex items-center justify-center gap-3">
        <span className="flex size-14 items-center justify-center rounded-full bg-segundo/5 text-segundo">
          <Icon className="size-7" />
        </span>
        <div className="text-left text-montserrat">
          <p className="text-sm font-medium text-segundo/60">
            {detected
              ? `Detectamos que usas ${principal.nombre}`
              : "Tu descarga recomendada"}
          </p>
          <p className="font-display text-lg font-bold text-segundo">
            inmobitwo para {principal.nombre}
          </p>
        </div>
      </div>

      <a
        href={principal.url}
        download={principal.filename}
        className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-md bg-tercero px-6 py-4 text-base font-semibold text-primero shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-tercero/80"
      >
        <Download className="size-5 transition-transform group-hover:translate-y-0.5" />
        Descargar para {principal.nombre}
      </a>

      <p className="mt-3 text-sm text-segundo/60">
        {principal.detalle} · Archivo {principal.extension}
      </p>
    </div>
  );
}

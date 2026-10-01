import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function AudienceCard({ Icon, titulo, texto, cta, to }) {
  return (
    <div className="flex flex-col rounded-3xl border border-segundo/10 bg-primero p-8">
      <span className="flex size-12 items-center justify-center rounded-full bg-tercero text-primero">
        <Icon className="size-6" />
      </span>
      <h3 className="mt-5 font-display text-xl font-bold text-segundo">
        {titulo}
      </h3>
      <p className="mt-2 flex-1 leading-relaxed text-segundo/60">{texto}</p>
      <Link
        href={to}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-tercero underline-offset-4 hover:underline"
      >
        {cta}
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

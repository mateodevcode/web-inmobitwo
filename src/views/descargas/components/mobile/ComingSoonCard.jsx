import { Smartphone } from "lucide-react";

export function ComingSoonCard() {
  return (
    <div className="relative flex h-full items-center justify-center px-8 pt-8 lg:pt-0">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-4xl border-2 border-dashed border-tercero/30 bg-primero/60 px-6 py-14 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-primero text-tercero border-tercero/50 border">
          <Smartphone className="size-8" />
        </span>
        <p className="font-display text-lg font-bold text-segundo">
          App móvil próximamente
        </p>
        <p className="max-w-[16rem] text-sm leading-relaxed text-segundo/60">
          Mientras tanto, descarga la versión de escritorio y usa inmobitwo
          desde tu ordenador.
        </p>
      </div>
    </div>
  );
}

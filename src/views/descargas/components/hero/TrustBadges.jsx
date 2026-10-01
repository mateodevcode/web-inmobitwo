import { ShieldCheck, RefreshCw } from "lucide-react";

export function TrustBadges() {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-segundo/60">
      <span className="inline-flex items-center gap-1.5">
        <ShieldCheck className="size-5 text-tercero" /> Descarga segura y
        verificada
      </span>
      <span className="inline-flex items-center gap-1.5">
        <RefreshCw className="size-5 text-tercero" /> Actualizaciones
        automáticas
      </span>
    </div>
  );
}

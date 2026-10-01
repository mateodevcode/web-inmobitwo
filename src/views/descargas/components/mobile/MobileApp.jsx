import { Smartphone } from "lucide-react";
import { MobilePerks } from "./MobilePerks";
import { StoreButtons } from "./StoreButtons";
import { ComingSoonCard } from "./ComingSoonCard";

export function MobileApp() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 font-poppins">
      <div className="overflow-hidden rounded-4xl border border-segundo/10 bg-tercero/10">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="p-8 sm:p-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-primero px-4 py-1.5 text-sm font-medium text-tercero">
              <Smartphone className="size-4" />
              También en tu bolsillo
            </span>
            <h2 className="mt-5 text-balance font-display text-3xl font-extrabold tracking-tight text-segundo sm:text-4xl">
              Llévate inmobitwo en el móvil
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-segundo/60">
              Gestiona tus inmuebles y no pierdas ninguna oportunidad estés
              donde estés. Disponible para iOS y Android.
            </p>

            <MobilePerks />
            <StoreButtons />
          </div>

          <ComingSoonCard />
        </div>
      </div>
    </section>
  );
}

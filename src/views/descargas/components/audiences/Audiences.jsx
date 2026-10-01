import { AUDIENCIAS } from "./audiences.data";
import { AudienceCard } from "./AudienceCard";

export function Audiences() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6 font-poppins">
      <div className="grid gap-5 md:grid-cols-2">
        {AUDIENCIAS.map(({ id, ...card }) => (
          <AudienceCard key={id} {...card} />
        ))}
      </div>
    </section>
  );
}

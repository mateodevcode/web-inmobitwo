import { AdvantageColumn } from "./AdvantageColumn";
import { ADVANTAGES } from "./advantages.data";

export function AdvantagesSection() {
  return (
    <section className="md:py-10 py-8">
      <div className="w-10/12 md:w-9/12 mx-auto">
        <h2 className="mb-8 text-2xl md:text-3xl font-semibold text-segundo">
          Ventajas de publicar en inmobitwo
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {ADVANTAGES.map(({ id, title, description }) => (
            <AdvantageColumn key={id} title={title}>
              {description}
            </AdvantageColumn>
          ))}
        </div>
      </div>
    </section>
  );
}

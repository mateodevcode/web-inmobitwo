import { ServiceCard } from "./ServiceCard";
import { SERVICES } from "./services.data";

export function ServicesSection() {
  return (
    <section className="bg-slate-100 md:py-14 py-8">
      <div className="mx-auto md:w-9/12 w-10/12">
        <h2 className="mb-8 md:text-3xl text-2xl font-bold text-slate-900">
          Algunos servicios para facilitarte la venta o alquiler de tu inmueble
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {SERVICES.map(({ id, title, linkLabel, description }) => (
            <ServiceCard key={id} title={title} linkLabel={linkLabel}>
              {description}
            </ServiceCard>
          ))}
        </div>
      </div>
    </section>
  );
}

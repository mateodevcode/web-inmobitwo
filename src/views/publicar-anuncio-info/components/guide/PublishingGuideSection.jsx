import { NumberedStep } from "./NumberedStep";
import { GUIDE_STEPS } from "./guide-steps.data";

export function PublishingGuideSection() {
  return (
    <section className="md:py-14 py-8">
      <div className="w-10/12 md:w-9/12 mx-auto">
        <h2 className="mb-2 text-2xl md:text-3xl font-bold text-slate-900">
          ¿Qué pasos seguir para publicar tu anuncio como propietario
          particular?
        </h2>
        <p className="mb-8 text-base md:text-lg text-slate-900">
          Hay 4 puntos clave para vender o alquilar cuanto antes tu inmueble:
        </p>

        <div className="flex flex-col gap-9">
          {GUIDE_STEPS.map(({ id, number, title, body }) => (
            <NumberedStep key={id} number={number} title={title}>
              {body}
            </NumberedStep>
          ))}
        </div>
      </div>
    </section>
  );
}

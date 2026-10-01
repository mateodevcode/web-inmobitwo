import HeroBullets from "./HeroBullets";
import PublishCtaButton from "./PublishCtaButton";
import PhoneIllustration from "./PhoneIllustration";

export function HowToPublishHero() {
  return (
    <section className="bg-tercero/5 md:py-10 py-5">
      <div className="mx-auto w-11/12 md:w-8/12 lg:w-9/12 max-w-4xl flex flex-col gap-4 rounded-lg bg-primero md:p-10 p-7 lg:flex-row md:items-center md:justify-between md:gap-12 shadow-lg shadow-segundo/20">
        <div className="flex-1">
          <h1 className="mb-4 font-bold text-slate-900 md:text-3xl text-2xl">
            Cómo poner un anuncio en inmobitwo
          </h1>

          <HeroBullets />

          <p className="mb-4 text-sm text-slate-900">
            Para vender o alquilar más rápido{" "}
            <a href="#" className="text-blue-600 hover:underline">
              contacta con una agencia inmobiliaria
            </a>
          </p>

          <PublishCtaButton />

          <p className="mt-5 text-sm text-slate-900">
            ¿Eres profesional inmobiliario? Conoce nuestras{" "}
            <a href="#" className="text-blue-600 hover:underline">
              ventajas para profesionales
            </a>
          </p>
        </div>

        <PhoneIllustration />
      </div>
    </section>
  );
}

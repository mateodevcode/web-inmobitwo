import { descargas } from "@/data/descargas";

export function OtherSystems({ otrosSistemas }) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
      <span className="text-segundo/60">¿Otro sistema?</span>
      {otrosSistemas.map((k) => (
        <a
          key={k}
          href={descargas[k].url}
          download={descargas[k].filename}
          className="font-semibold text-tercero underline-offset-4 hover:underline"
        >
          {descargas[k].nombre}
        </a>
      ))}
    </div>
  );
}

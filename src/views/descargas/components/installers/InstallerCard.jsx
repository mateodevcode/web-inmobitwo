import { Download } from "lucide-react";

export function InstallerCard({ installer }) {
  const { Icon } = installer;

  return (
    <div className="flex flex-col rounded-3xl border border-segundo/10 bg-primero p-6 transition-colors hover:border-tercero/40">
      <span className="flex size-16 items-center justify-center rounded-full bg-segundo/5 text-segundo">
        <Icon className="size-8" />
      </span>
      <h3 className="mt-4 font-display text-lg font-bold text-segundo">
        {installer.nombre}
      </h3>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-segundo/60">
        {installer.detalle}
      </p>
      <a
        href={installer.url}
        download={installer.filename}
        className="group relative mt-5 inline-flex cursor-pointer select-none items-center justify-center gap-2 overflow-hidden rounded-md border border-segundo/10 bg-transparent px-4 py-2.5 text-sm font-semibold text-segundo before:absolute before:inset-0 before:z-0 before:w-0 before:bg-segundo before:transition-all before:duration-500 before:ease-in-out hover:before:w-full"
      >
        <Download className="relative z-10 size-4 text-tercero group-hover:text-tercero" />
        <span className="relative z-10 transition-colors duration-300 group-hover:text-primero">
          Descargar {installer.extension}
        </span>
      </a>
    </div>
  );
}

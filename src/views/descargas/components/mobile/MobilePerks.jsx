import { VENTAJAS_MOVIL } from "./mobile.data";

export function MobilePerks() {
  return (
    <ul className="mt-6 flex flex-col gap-3">
      {VENTAJAS_MOVIL.map(({ id, Icon, texto }) => (
        <li key={id} className="flex items-center gap-3">
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primero text-tercero">
            <Icon className="size-4" />
          </span>
          <span className="text-sm leading-relaxed text-segundo">{texto}</span>
        </li>
      ))}
    </ul>
  );
}

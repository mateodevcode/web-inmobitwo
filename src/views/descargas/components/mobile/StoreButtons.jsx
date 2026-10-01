import { TIENDAS } from "./mobile.data";

export function StoreButtons() {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {TIENDAS.map(({ id, Icon, topLine, store }) => (
        <a
          key={id}
          href="#"
          className="inline-flex items-center gap-3 rounded-md bg-segundo px-5 py-3 text-primero transition-transform hover:-translate-y-0.5"
        >
          <Icon className="size-6" />
          <span className="text-left leading-tight">
            <span className="block text-[0.65rem] uppercase tracking-wide opacity-70">
              {topLine}
            </span>
            <span className="block text-sm font-semibold">{store}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

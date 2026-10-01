import Link from "next/link";
import { rutasFrontend } from "@/data/mapaRutas.js";
import { RouteGroup } from "./RouteGroup";

export function FrontendRoutes() {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase text-black/60 mb-3">
        Frontend
      </h2>
      <div className="space-y-4">
        {rutasFrontend.map((grupo) => (
          <RouteGroup key={grupo.seccion} seccion={grupo.seccion}>
            {grupo.items.map((item) =>
              item.param ? (
                <div
                  key={item.path}
                  className="flex justify-between items-center px-2 py-1.5 rounded-lg text-sm text-black/40"
                  title="Requiere un parámetro real (id/slug), no se puede navegar directo"
                >
                  <span className="font-montserrat text-xs">{item.path}</span>
                  <span className="text-[11px]">
                    {item.nombre} · {item.auth}
                  </span>
                </div>
              ) : (
                <Link
                  key={item.path}
                  href={item.path}
                  className="flex justify-between items-center px-2 py-1.5 rounded-lg text-sm hover:bg-blue-50 transition"
                >
                  <span className="font-montserrat text-xs text-blue-700">
                    {item.path}
                  </span>
                  <span className="text-[11px] text-black/50">
                    {item.nombre} · {item.auth}
                  </span>
                </Link>
              ),
            )}
          </RouteGroup>
        ))}
      </div>
    </div>
  );
}

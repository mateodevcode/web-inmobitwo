import { rutasBackend } from "@/data/mapaRutas.js";
import { RouteGroup } from "./RouteGroup";

export function BackendRoutes() {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase text-black/60 mb-3">
        Backend
      </h2>
      <div className="space-y-4">
        {rutasBackend.map((grupo) => (
          <RouteGroup key={grupo.seccion} seccion={grupo.seccion}>
            {grupo.items.map((item) => (
              <div
                key={`${item.metodo}-${item.path}`}
                className={`flex justify-between items-center px-2 py-1.5 rounded-lg text-sm ${
                  item.advertencia ? "bg-red-50" : ""
                }`}
              >
                <span className="font-montserrat text-xs">
                  <span className="font-semibold text-black/70">
                    {item.metodo}
                  </span>{" "}
                  {item.path}
                </span>
                <span
                  className={`text-[11px] ${
                    item.advertencia
                      ? "text-red-600 font-medium"
                      : "text-black/50"
                  }`}
                >
                  {item.advertencia || item.auth}
                </span>
              </div>
            ))}
          </RouteGroup>
        ))}
      </div>
    </div>
  );
}

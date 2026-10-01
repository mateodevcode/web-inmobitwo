export function RouteGroup({ seccion, children }) {
  return (
    <div className="border rounded-xl p-3">
      <h3 className="text-xs font-semibold uppercase text-black/40 mb-2">
        {seccion}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

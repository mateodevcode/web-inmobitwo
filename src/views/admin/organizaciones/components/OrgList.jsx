import Loading from "@/views/organizacion/temas/loading/Loading";
import { OrgActions } from "./OrgActions";

export function OrgRow({ org, actions, onAction }) {
  return (
    <div className="border rounded-xl p-4 flex justify-between items-center gap-4">
      <div>
        <p className="font-semibold">{org.nombre}</p>
        <p className="text-xs text-gray-400">/inmobiliarias/{org.slug}</p>
        {org.custom_domain && (
          <p className="text-xs text-gray-400">
            Dominio: {org.custom_domain} ({org.dominio_estado})
          </p>
        )}
      </div>

      <OrgActions org={org} actions={actions} onAction={onAction} />
    </div>
  );
}

export function OrgList({ loading, organizaciones, actions, onAction }) {
  if (loading) {
    return <Loading logo="/logo/logo-hor.png" type="opcion2" />;
  }

  if (organizaciones.length === 0) {
    return (
      <p className="text-gray-400">No hay organizaciones en este estado.</p>
    );
  }

  return (
    <div className="space-y-3">
      {organizaciones.map((org) => (
        <OrgRow key={org.id} org={org} actions={actions} onAction={onAction} />
      ))}
    </div>
  );
}


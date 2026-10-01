const ActionButton = ({ onClick, color, children }) => (
  <button
    onClick={onClick}
    className={`text-sm px-3 py-1 rounded-lg text-white ${color}`}
  >
    {children}
  </button>
);

export function OrgActions({ org, actions, onAction }) {
  return (
    <div className="flex gap-2 shrink-0">
      {org.estado !== "aprobada" && (
        <ActionButton
          onClick={() =>
            onAction(
              actions.aprobarOrganizacion,
              org.id,
              "Organización aprobada",
            )
          }
          color="bg-green-600"
        >
          Aprobar
        </ActionButton>
      )}
      {org.estado !== "suspendida" && (
        <ActionButton
          onClick={() =>
            onAction(
              actions.suspenderOrganizacion,
              org.id,
              "Organización suspendida",
            )
          }
          color="bg-red-600"
        >
          Suspender
        </ActionButton>
      )}

      {/* Dominio pendiente de verificación DNS: activar o cancelar la solicitud */}
      {org.custom_domain && org.dominio_estado === "pendiente_dns" && (
        <>
          <ActionButton
            onClick={() =>
              onAction(
                actions.activarDominioPropio,
                org.id,
                "Dominio activado",
              )
            }
            color="bg-blue-600"
          >
            Activar dominio
          </ActionButton>
          <ActionButton
            onClick={() =>
              onAction(
                actions.quitarDominioPropio,
                org.id,
                "Solicitud de dominio cancelada",
              )
            }
            color="bg-gray-500"
          >
            Cancelar solicitud
          </ActionButton>
        </>
      )}

      {/* Dominio activo: pausar (mantiene el dato) o quitar (lo elimina) */}
      {org.custom_domain && org.dominio_estado === "activo" && (
        <>
          <ActionButton
            onClick={() =>
              onAction(
                actions.desactivarDominioPropio,
                org.id,
                "Dominio desactivado (pausado)",
              )
            }
            color="bg-yellow-600"
          >
            Pausar dominio
          </ActionButton>
          <button
            onClick={() => {
              if (
                window.confirm(
                  `¿Eliminar el dominio propio de "${org.nombre}"? Asegurate de haber corrido antes quitar-dominio.sh en el servidor.`,
                )
              ) {
                onAction(
                  actions.quitarDominioPropio,
                  org.id,
                  "Dominio eliminado",
                );
              }
            }}
            className="text-sm px-3 py-1 rounded-lg bg-red-500 text-white"
          >
            Quitar dominio
          </button>
        </>
      )}
    </div>
  );
}

import { COLOR_POR_TIPO, formatearHora } from "../lib/logFormat";

export function LogLine({ log }) {
  const hora = formatearHora(log.created_at);

  if (log.tipo === "sesion") {
    return (
      <div className={COLOR_POR_TIPO.sesion}>
        <span className="text-gray-500">[{hora}]</span> 🆕 {log.quien}{" "}
        {log.mensaje}
      </div>
    );
  }

  if (log.tipo === "evento") {
    return (
      <div className={COLOR_POR_TIPO.evento}>
        <span className="text-gray-500">[{hora}]</span> {log.emoji} {log.quien}{" "}
        {log.mensaje}
      </div>
    );
  }

  if (log.tipo === "lead") {
    return (
      <div className={COLOR_POR_TIPO.lead}>
        <span className="text-gray-500">[{hora}]</span> 🎯 {log.mensaje}
      </div>
    );
  }

  return null;
}

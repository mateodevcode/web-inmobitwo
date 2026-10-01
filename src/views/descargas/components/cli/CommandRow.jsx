import { Check, Copy } from "lucide-react";
import { useCopyClipboard } from "../../hooks/useCopyClipboard";

export function CommandRow({ command }) {
  const { copiado, copiar } = useCopyClipboard();

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-primero/80">
        {command.cliLabel}
      </p>
      <div className="flex items-center gap-2 rounded-md bg-cuarto p-1 pl-4">
        <code className="flex-1 overflow-x-auto whitespace-nowrap py-2 font-mono text-sm text-primero">
          <span className="mr-2 select-none text-tercero">$</span>
          {command.cli}
        </code>
        <button
          type="button"
          onClick={() => copiar(command.cli)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primero/10 px-3 py-2 text-xs font-semibold text-primero transition-colors hover:bg-primero/20"
          aria-label={`Copiar comando para ${command.cliLabel}`}
        >
          {copiado ? (
            <>
              <Check className="size-3.5" /> Copiado
            </>
          ) : (
            <>
              <Copy className="size-3.5" /> Copiar
            </>
          )}
        </button>
      </div>
    </div>
  );
}

import { Terminal } from "lucide-react";
import { cliCommands } from "@/data/descargas";
import { CommandRow } from "./CommandRow";

export function CliInstall() {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
      <div className="bg-segundo p-6 text-primero/80 shadow-xl sm:p-10">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-primero/10">
            <Terminal className="size-5" />
          </span>
          <div>
            <h2 className="font-display text-xl font-bold">
              Instalar desde la terminal
            </h2>
            <p className="text-sm text-primero/60">
              Para equipos técnicos y despliegues en empresas.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6">
          {cliCommands.map((cmd) => (
            <CommandRow key={cmd.cliLabel} command={cmd} />
          ))}
        </div>
      </div>
    </section>
  );
}

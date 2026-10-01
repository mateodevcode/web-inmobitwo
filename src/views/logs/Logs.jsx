import { useAppContext } from "@/context/AppContext";
import useLogsTracking from "@/hooks/useLogsTracking";
import { useLogsAutoRefresh } from "./hooks/useLogsAutoRefresh";
import { LogsHeader } from "./components/LogsHeader";
import { LogLine } from "./components/LogLine";

const Logs = () => {
  const { logsTracking, loadingLogsTracking } = useAppContext();
  const { cargarLogsTracking } = useLogsTracking();
  const { autoRefresh, setAutoRefresh } = useLogsAutoRefresh();

  return (
    <main className="w-full md:px-6 pb-10 pt-4">
      <LogsHeader
        autoRefresh={autoRefresh}
        onToggleRefresh={() => setAutoRefresh((prev) => !prev)}
        onRefresh={() => cargarLogsTracking()}
      />

      <div className="bg-[#0d1117] rounded-xl p-4 font-mono text-sm min-h-dvh overflow-y-auto flex flex-col-reverse gap-1.5">
        {/* flex-col-reverse: lo más reciente queda arriba visualmente, pero el orden lógico se mantiene */}
        {loadingLogsTracking ? (
          <div className="text-gray-400">Cargando actividad...</div>
        ) : logsTracking.length === 0 ? (
          <div className="text-gray-400">
            Aún no hay actividad registrada. Navega el sitio para generar
            eventos.
          </div>
        ) : (
          [...logsTracking]
            .reverse()
            .map((log) => <LogLine key={log.id} log={log} />)
        )}
      </div>
    </main>
  );
};

export default Logs;

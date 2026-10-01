import { Apple, Smartphone } from "lucide-react";

const STORE_BUTTONS = [
  {
    id: "app-store",
    icon: Apple,
    topLine: "Consíguelo en el",
    store: "App Store",
  },
  {
    id: "google-play",
    icon: Smartphone,
    topLine: "Disponible en",
    store: "Google Play",
  },
];

export function AppStoreButtons() {
  return (
    <div className="flex flex-col gap-2.5">
      {STORE_BUTTONS.map(({ id, icon: Icon, topLine, store }) => (
        <button
          key={id}
          className="flex items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-white"
        >
          <Icon className="h-6 w-6" />
          <span className="text-left text-xs leading-tight">
            {topLine}
            <br />
            <strong className="text-sm">{store}</strong>
          </span>
        </button>
      ))}
    </div>
  );
}

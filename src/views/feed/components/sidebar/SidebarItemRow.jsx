import { useRouter } from "next/navigation";
import { useChatStore } from "@/hooks/chatStore";

export function SidebarItemRow({ item, selected, onSelect }) {
  const router = useRouter();
  const noLeidos = useChatStore((s) => s.noLeidosTotal);
  const esChat = item.label === "mensajes";
  const destino = esChat ? "/usuario/chat" : item.url;

  return (
    <div
      className={`my-1 p-3 rounded-lg text-sm flex items-center gap-3 cursor-pointer select-none active:scale-95 transition-all duration-75 border text-black relative ${
        selected
          ? "bg-stone-100 border-black/10"
          : "border-transparent hover:bg-stone-100 hover:border-black/10"
      }`}
      onClick={() => {
        onSelect(item.label);
        router.push(destino);
      }}
    >
      <div className="text-xl">{item.icon}</div>
      {item.name}
      {esChat && noLeidos > 0 && (
        <div className="bg-[#FF1B1C] min-w-6 h-6 px-1 rounded-full flex items-center justify-center font-semibold text-white absolute right-3">
          {noLeidos > 9 ? "9+" : noLeidos}
        </div>
      )}
    </div>
  );
}

import { items_menu } from "@/data/items_menu";
import { usePathname, useRouter } from "next/navigation";
import { useChatStore } from "@/hooks/chatStore";

const UserNavLinks = () => {
  const router = useRouter();
  const pathname = usePathname();
  const segmento = pathname.split("/usuario/")[1];
  const noLeidos = useChatStore((s) => s.noLeidosTotal);

  return (
    <nav className="hidden md:flex items-center gap-6">
      {items_menu.slice(0, 3).map((item) => (
        <div
          className={`flex flex-col items-center cursor-pointer select-none font-montserrat hover:text-tercero active:scale-95 duration-75 transition ${item.id === segmento ? "font-bold text-tercero" : "text-segundo"}`}
          onClick={() => router.push(`/usuario/${item.id}`)}
          key={item.id}
        >
          <div className="relative">
            {item.icon}
            {item.id === "chat" && noLeidos > 0 && (
              <span className="absolute -top-1.5 -right-3 min-w-5 h-5 px-1 rounded-full bg-tercero text-primero text-[11px] font-bold flex items-center justify-center">
                {noLeidos > 9 ? "9+" : noLeidos}
              </span>
            )}
          </div>
          <div className="text-sm">{item.label}</div>
        </div>
      ))}
    </nav>
  );
};

export default UserNavLinks;

import { items_menu } from "@/data/items_menu";
import { usePathname, useRouter } from "next/navigation";

const UserNavLinks = () => {
  const router = useRouter();
  const pathname = usePathname();
  const segmento = pathname.split("/usuario/")[1];

  return (
    <nav className="hidden md:flex items-center gap-6">
      {items_menu.slice(0, 3).map((item) => (
        <div
          className={`flex flex-col items-center cursor-pointer select-none font-montserrat hover:text-tercero active:scale-95 duration-75 transition ${item.id === segmento ? "font-bold text-tercero" : "text-segundo"}`}
          onClick={() => router.push(`/usuario/${item.id}`)}
          key={item.id}
        >
          <div className="">{item.icon}</div>
          <div className="text-sm">{item.label}</div>
        </div>
      ))}
    </nav>
  );
};

export default UserNavLinks;

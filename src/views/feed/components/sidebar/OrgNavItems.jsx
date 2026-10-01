import { items_organizacion } from "@/data/items_sidebar";
import { useRouter } from "next/navigation";

export function OrgNavItems({ itemSelect, onSelect, organizacionActiva }) {
  const router = useRouter();

  return (
    <div className="px-2.5 pb-2.5">
      {items_organizacion.map((item, i) => (
        <div
          className={`my-1 p-3 rounded-lg text-sm flex items-center gap-3 cursor-pointer select-none active:scale-95 transition-all duration-75 border text-black ${
            itemSelect === item.label
              ? "bg-stone-100 border-black/10"
              : "border-transparent hover:bg-stone-100 hover:border-black/10"
          }`}
          key={i}
          onClick={() => {
            onSelect(item.label);
            // "estadisticas" trae un "id" placeholder literal en items_sidebar.js;
            // hay que resolverlo con el id real de la organización activa antes de navegar.
            const url =
              item.label === "estadisticas"
                ? item.url.replace("id", organizacionActiva.id)
                : item.url;
            router.push(url);
          }}
        >
          <div className="text-xl">{item.icon}</div>
          {item.name}
        </div>
      ))}
    </div>
  );
}

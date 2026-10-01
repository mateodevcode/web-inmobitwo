import { useRouter } from "next/navigation";

export function SidebarItemRow({ item, selected, onSelect }) {
  const router = useRouter();

  return (
    <div
      className={`my-1 p-3 rounded-lg text-sm flex items-center gap-3 cursor-pointer select-none active:scale-95 transition-all duration-75 border text-black relative ${
        selected
          ? "bg-stone-100 border-black/10"
          : "border-transparent hover:bg-stone-100 hover:border-black/10"
      }`}
      onClick={() => {
        onSelect(item.label);
        router.push(item.url);
      }}
    >
      <div className="text-xl">{item.icon}</div>
      {item.name}
      {item.label === "mensajes" && (
        <div className="bg-[#FF1B1C] w-6 h-6 rounded-full flex items-center justify-center font-semibold text-white absolute right-3">
          3
        </div>
      )}
    </div>
  );
}

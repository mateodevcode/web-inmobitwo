import { irArriba } from "@/utils/irArriba";
import { useRouter } from "next/navigation";

export function TabLink({ active, to, children }) {
  const router = useRouter();

  return (
    <div
      className={`relative cursor-pointer ${active ? 'after:content-[""] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-tercero after:rounded-md' : ""}`}
      onClick={() => {
        router.push(to);
        irArriba();
      }}
    >
      <p
        className={`${active ? "text-tercero" : "text-black/60"} select-none text-base`}
      >
        {children}
      </p>
    </div>
  );
}

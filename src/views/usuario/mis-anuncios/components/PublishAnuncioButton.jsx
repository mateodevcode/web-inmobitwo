import { useRouter } from "next/navigation";
import { irArriba } from "@/utils/irArriba";

const scrollTop = () => {
  document.getElementById("top-detalles")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export function PublishAnuncioButton({ hasAnuncios, fullWidth = false }) {
  const router = useRouter();

  const go = () => {
    scrollTop();
    router.push("/info/publicar-anuncio");
    if (fullWidth) irArriba();
  };

  return (
    <button
      type="button"
      onClick={go}
      className={`rounded-md bg-tercero px-6 py-2.5 text-sm font-semibold text-primero hover:bg-tercero/80 active:scale-[0.99] cursor-pointer select-none md:mt-0 mt-4 font-poppins ${
        fullWidth ? "w-full md:w-64" : ""
      }`}
    >
      {hasAnuncios ? "Poner otro anuncio" : "Pon un anuncio"}
    </button>
  );
}

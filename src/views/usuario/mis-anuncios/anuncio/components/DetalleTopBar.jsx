import { useRouter } from "next/navigation";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { irArriba } from "@/utils/irArriba";

const scrollTop = () => {
  document.getElementById("top-detalles")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export function DetalleTopBar() {
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex items-center justify-between mx-auto py-4 w-11/12 md:w-9/12">
        <button
          className="font-semibold text-decimo flex items-center gap-2 cursor-pointer select-none hover:text-decimo/80"
          onClick={() => {
            router.push("/usuario/mis-anuncios");
            irArriba();
          }}
        >
          <HiOutlineArrowNarrowLeft className="text-4xl" />
          <p className="text-xl md:flex hidden">Volver a tus anuncios</p>
        </button>
        <button
          type="button"
          onClick={() => {
            scrollTop();
            router.push("/info/publicar-anuncio");
          }}
          className="rounded-md bg-tercero px-6 py-2 text-lg md:text-lg font-semibold text-primero hover:bg-tercero/80 active:scale-[0.99] cursor-pointer select-none font-montserrat"
        >
          Poner otro anuncio
        </button>
      </div>
    </div>
  );
}

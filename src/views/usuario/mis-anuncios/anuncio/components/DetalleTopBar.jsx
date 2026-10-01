import { useRouter } from "next/navigation";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
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
      <div className="flex items-center justify-between mx-auto py-4 w-11/12 md:w-10/12">
        <button
          className="font-semibold text-blue-700 flex items-center gap-4 cursor-pointer select-none hover:text-blue-600"
          onClick={() => {
            router.push("/usuario/mis-anuncios");
            irArriba();
          }}
        >
          <MdOutlineKeyboardDoubleArrowLeft className="text-4xl" />
          <p className="text-xl md:flex hidden">Volver a tus anuncios</p>
        </button>
        <button
          type="button"
          onClick={() => {
            scrollTop();
            router.push("/info/publicar-anuncio");
          }}
          className="font-poppins rounded-md bg-rose-600 px-6 py-2 text-lg md:text-lg font-semibold text-white hover:bg-rose-500 active:scale-[0.99] cursor-pointer select-none"
        >
          Poner otro anuncio
        </button>
      </div>
    </div>
  );
}

import { irArriba } from "@/utils/irArriba";
import { useRouter } from "next/navigation";

const PublishCtaButton = () => {
  const router = useRouter();

  return (
    <button
      className="relative flex items-center justify-center gap-2 px-8 bg-black text-white h-11 cursor-pointer select-none overflow-hidden group before:absolute before:inset-0 before:bg-tercero before:w-0 hover:before:w-full before:transition-all before:duration-500 before:ease-in-out before:z-0 rounded-md w-full"
      type="button"
      onClick={() => {
        router.push("/info/publicar-anuncio/publicar");
        irArriba();
      }}
    >
      <p className="text-base relative z-10 group-hover:text-white transition-colors duration-300 font-semibold">
        Pon tu anuncio
      </p>
    </button>
  );
};

export default PublishCtaButton;

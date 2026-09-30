import { irArriba } from "../../utils/irArriba";
import { logo } from "@/data/logo";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Logo() {
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-2 select-none cursor-pointer"
      onClick={() => {
        router.push("/");
        irArriba();
      }}
    >
      <div className="w-7 h-7">
        <Image
          src={logo.src}
          alt={logo.alt}
          width={500}
          height={500}
          className="object-center w-full h-full"
        />
      </div>
      <span className="text-2xl tracking-tight text-black font-semibold font-poppins">
        inmobitwo
      </span>
    </div>
  );
}

export default Logo;

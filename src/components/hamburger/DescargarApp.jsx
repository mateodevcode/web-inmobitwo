"use client";

import { useAppContext } from "@/context/AppContext";
import { logo } from "@/data/logo";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DescargarApp = () => {
  const router = useRouter();
  const { setOpenModalUser } = useAppContext();

  return (
    <div
      className="w-full h-16 flex items-center gap-4 px-8 py-4 cursor-pointer"
      onClick={() => {
        setOpenModalUser(false);
        router.push("/descargas");
      }}
    >
      <div className="w-7 h-7">
        <Image
          src={logo.src}
          alt={logo.alt}
          width={500}
          height={500}
          className="w-full h-full"
        />
      </div>
      <h3 className="text-base font-semibold text-segundo hover:text-decimo transition-colors font-poppins hover:underline">
        Descarga la app de inmobitwo
      </h3>
    </div>
  );
};

export default DescargarApp;

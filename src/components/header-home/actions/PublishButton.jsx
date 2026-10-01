"use client";

import { useRouter } from "next/navigation";

const PublishButton = () => {
  const router = useRouter();

  return (
    <button
      className="relative hidden md:flex items-center gap-2 px-4 bg-transparent text-segundo h-9 rounded-md cursor-pointer select-none overflow-hidden group before:absolute before:inset-0 before:bg-segundo before:w-0 hover:before:w-full before:transition-all before:duration-500 before:ease-in-out before:z-0 border border-segundo/30"
      onClick={() => router.push("/info/publicar-anuncio")}
    >
      <p className="text-sm relative z-10 group-hover:text-primero transition-colors duration-300 font-semibold">
        Pon tu anuncio gratis
      </p>
    </button>
  );
};

export default PublishButton;

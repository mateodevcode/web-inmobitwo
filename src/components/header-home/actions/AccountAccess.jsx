"use client";

import { HiOutlineUser } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import BotonUsuario from "@/components/usuario/BotonUsuario";

const AccountAccess = () => {
  const { usuario, openModalUser, setOpenModalUser } = useAppContext();
  const router = useRouter();

  if (usuario) {
    return <BotonUsuario onClick={() => setOpenModalUser(!openModalUser)} />;
  }

  return (
    <button
      className="flex items-center gap-2 text-sm font-semibold text-segundo/80 hover:text-tercero"
      onClick={() => router.push("/login")}
    >
      <HiOutlineUser className="text-lg" />
      Acceder
    </button>
  );
};

export default AccountAccess;

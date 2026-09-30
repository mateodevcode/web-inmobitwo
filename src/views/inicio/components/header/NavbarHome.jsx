"use client";

import { HiOutlineUser } from "react-icons/hi2";
import { TbMenu4 } from "react-icons/tb";
import { useAppContext } from "@/context/AppContext";
import { MENUS } from "@/data/menus";
import Columna from "../components/Columna";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo/Logo";
import BotonUsuario from "@/components/usuario/BotonUsuario";
import EnlaceNav from "../modales/EnlaceNav";
import ModalHamburguesa from "../modal-hamburguesa/ModalHamburguesa";

const NavbarHome = () => {
  const {
    usuario,
    openModalUser,
    setOpenModalUser,
    openModalHamburguesa,
    setOpenModalHamburguesa,
  } = useAppContext();
  const router = useRouter();

  return (
    <div className="bg-primero w-full border-b border-segundo/5 font-poppins relative">
      <div className="mx-auto w-11/12 md:w-9/12 h-20 flex items-center justify-between">
        <div className="flex items-end gap-8">
          <Logo />
          <nav className="xl:flex items-center gap-8 h-full hidden">
            {Object.keys(MENUS).map((title) => (
              <EnlaceNav key={title} title={title}>
                {MENUS[title].map((col) => (
                  <Columna
                    key={col.heading}
                    heading={col.heading}
                    links={col.links}
                  />
                ))}
              </EnlaceNav>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <button
            className="relative hidden md:flex items-center gap-2 px-4 bg-transparent text-segundo h-9 rounded-md cursor-pointer select-none overflow-hidden group before:absolute before:inset-0 before:bg-segundo before:w-0 hover:before:w-full before:transition-all before:duration-500 before:ease-in-out before:z-0 border border-segundo/30"
            onClick={() => router.push("/info/publicar-anuncio")}
          >
            <p className="text-sm relative z-10 group-hover:text-primero transition-colors duration-300 font-semibold">
              Pon tu anuncio gratis
            </p>
          </button>

          {usuario ? (
            <BotonUsuario onClick={() => setOpenModalUser(!openModalUser)} />
          ) : (
            <button
              className="flex items-center gap-2 text-sm font-semibold text-segundo/80 hover:text-tercero"
              onClick={() => router.push("/login")}
            >
              <HiOutlineUser className="text-lg" />
              Acceder
            </button>
          )}
          <button
            className="border border-segundo/20 p-2 rounded-sm hover:bg-segundo/3 cursor-pointer select-none flex xl:hidden"
            onClick={() => setOpenModalHamburguesa(!openModalHamburguesa)}
          >
            <TbMenu4 className="text-2xl text-segundo" />
          </button>
        </div>
      </div>

      <ModalHamburguesa />
    </div>
  );
};

export default NavbarHome;

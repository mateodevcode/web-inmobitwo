import { useAppContext } from "@/context/AppContext";
import BotonUsuario from "@/components/usuario/BotonUsuario";
import ModalUser from "@/components/modales/ModalUser";
import Logo from "@/components/logo/Logo";
import ModalHamburguesa from "@/components/hamburger/ModalHamburguesa";
import UserNavLinks from "./UserNavLinks";
import HamburgerToggle from "./HamburgerToggle";

const HeaderInmobitwo = () => {
  const { setOpenModalUser } = useAppContext();

  return (
    <>
      <header className="bg-primero flex items-center w-full justify-between">
        <div className="flex items-center mx-auto w-11/12 md:w-9/12 h-20 justify-between">
          <div className="flex items-center gap-2 select-none py-5">
            <Logo />
          </div>
          <div className="items-center gap-2 md:gap-8 font-semibold flex">
            <UserNavLinks />

            <BotonUsuario onClick={() => setOpenModalUser(true)} />

            <HamburgerToggle />
          </div>
        </div>
      </header>
      <ModalUser />
      <ModalHamburguesa />
    </>
  );
};

export default HeaderInmobitwo;

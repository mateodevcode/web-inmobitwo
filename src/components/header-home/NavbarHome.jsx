"use client";

import Logo from "@/components/logo/Logo";
import NavLinks from "./nav/NavLinks";
import PublishButton from "./actions/PublishButton";
import AccountAccess from "./actions/AccountAccess";
import HamburgerButton from "./actions/HamburgerButton";
import ModalHamburguesa from "@/components/hamburger/ModalHamburguesa";

const NavbarHome = () => {
  return (
    <div className="bg-primero w-full border-b border-segundo/5 font-poppins relative">
      <div className="mx-auto w-11/12 md:w-9/12 h-20 flex items-center justify-between">
        <div className="flex items-end gap-8">
          <Logo />
          <NavLinks />
        </div>

        <div className="flex items-center gap-5">
          <PublishButton />
          <AccountAccess />
          <HamburgerButton />
        </div>
      </div>

      <ModalHamburguesa />
    </div>
  );
};

export default NavbarHome;

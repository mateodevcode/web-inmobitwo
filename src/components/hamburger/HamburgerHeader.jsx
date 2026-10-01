import { IoCloseOutline } from "react-icons/io5";
import Logo from "@/components/logo/Logo";

const HamburgerHeader = ({ onClose }) => (
  <div className="flex items-center w-11/12 justify-between mx-auto py-5 shrink-0 border-b border-gray-200">
    <div>
      <Logo />
    </div>

    <button
      className="hover:rotate-180 transition duration-300 cursor-pointer select-none text-black hover:bg-stone-100 rounded-full p-2"
      onClick={onClose}
    >
      <IoCloseOutline className="text-3xl" />
    </button>
  </div>
);

export default HamburgerHeader;

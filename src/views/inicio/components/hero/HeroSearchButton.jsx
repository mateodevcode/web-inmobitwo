"use client";

const HeroSearchButton = ({ disabled, onSearch }) => (
  <button
    onClick={onSearch}
    disabled={disabled}
    className={`relative flex items-center justify-center gap-2 px-8 h-11 select-none overflow-hidden group before:absolute before:inset-0 before:bg-tercero before:w-0 hover:before:w-full before:transition-all before:duration-500 before:ease-in-out before:z-0 w-28 ${
      disabled
        ? "bg-segundo text-primero/90"
        : "bg-segundo text-primero cursor-pointer"
    }`}
  >
    <p className="text-sm relative z-10 group-hover:text-primero transition-colors duration-300 font-semibold font-montserrat">
      Buscar
    </p>
  </button>
);

export default HeroSearchButton;

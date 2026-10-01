"use client";

import { TIPO_DEFAULT } from "../../constants";

const TAB_BUTTON_BASE =
  "px-5 h-11 text-sm font-semibold border transition-colors cursor-pointer font-montserrat";

const HeroTabs = ({ tab, setTab, setTipo }) => {
  const styleFor = (id) =>
    tab === id
      ? "bg-tercero/10 text-tercero border-tercero"
      : "bg-primero/60 text-segundo/70 border-segundo/10";

  const select = (id) => {
    setTab(id);
    setTipo(TIPO_DEFAULT);
  };

  return (
    <div className="flex">
      <button
        onClick={() => select("comprar")}
        className={`${TAB_BUTTON_BASE} ${styleFor("comprar")}`}
      >
        Comprar
      </button>
      <button
        onClick={() => select("alquilar")}
        className={`${TAB_BUTTON_BASE} ${styleFor("alquilar")}`}
      >
        Alquilar
      </button>
    </div>
  );
};

export default HeroTabs;

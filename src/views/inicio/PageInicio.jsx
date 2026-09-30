"use client";

import { useState } from "react";
import Hero from "./components/hero/Hero";
import InfoCards from "./components/cards/InfoCards";
import NavbarHome from "./components/header/NavbarHome";

const TIPO_DEFAULT = { label: "Casa", slug: "casa" };

const PageInicio = () => {
  const [tab, setTab] = useState("comprar");
  const [tipo, setTipo] = useState(TIPO_DEFAULT);

  return (
    <div>
      <NavbarHome />
      <Hero tab={tab} setTab={setTab} tipo={tipo} setTipo={setTipo} />
      <InfoCards tab={tab} tipo={tipo} />
    </div>
  );
};

export default PageInicio;

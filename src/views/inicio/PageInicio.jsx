"use client";

import Hero from "./components/hero/Hero";
import InfoCards from "./components/info-cards/InfoCards";
import NavbarHome from "@/components/header-home/NavbarHome";
import { useInicioSearch } from "./hooks/useInicioSearch";

const PageInicio = () => {
  const { tab, setTab, tipo, setTipo } = useInicioSearch();

  return (
    <div>
      <NavbarHome />
      <Hero tab={tab} setTab={setTab} tipo={tipo} setTipo={setTipo} />
      <InfoCards tab={tab} tipo={tipo} />
    </div>
  );
};

export default PageInicio;

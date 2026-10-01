"use client";

import { useEffect, useState } from "react";
import { FRASES } from "@/data/inicio/frases.hero";

export const useResponsiveFrases = () => {
  const [frases, setFrases] = useState(FRASES.desktop);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setFrases(mq.matches ? FRASES.mobile : FRASES.desktop);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return frases;
};

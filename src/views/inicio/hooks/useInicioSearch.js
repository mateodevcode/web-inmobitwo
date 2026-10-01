"use client";

import { useState } from "react";
import { TIPO_DEFAULT } from "../constants";

export const useInicioSearch = () => {
  const [tab, setTab] = useState("comprar");
  const [tipo, setTipo] = useState(TIPO_DEFAULT);

  return { tab, setTab, tipo, setTipo };
};

"use client";

import { useEffect, useState } from "react";
import usePropiedades from "@/hooks/usePropiedades";

export const useMisAnunciosCount = ({ usuarioId, openModalHamburguesa, openModalUser }) => {
  const { cargarCountMisAnuncios } = usePropiedades();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!usuarioId) return;
    (async () => {
      const next = await cargarCountMisAnuncios();
      setCount(next);
    })();
  }, [openModalHamburguesa, openModalUser, usuarioId, cargarCountMisAnuncios]);

  return count;
};

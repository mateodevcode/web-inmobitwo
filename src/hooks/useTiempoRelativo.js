// src/hooks/useTiempoRelativo.js
import { useState, useEffect } from "react";

const calcularTiempoRelativo = (fecha) => {
  const ahora = Date.now();
  const creado = new Date(fecha).getTime();
  const segundos = Math.floor((ahora - creado) / 1000);

  if (segundos < 60) return "Hace unos segundos";
  const minutos = Math.floor(segundos / 60);
  if (minutos < 60) return `Hace ${minutos} min`;
  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `Hace ${horas} h`;
  const dias = Math.floor(horas / 24);
  if (dias < 7) return `Hace ${dias} día${dias > 1 ? "s" : ""}`;
  const semanas = Math.floor(dias / 7);
  if (semanas < 4) return `Hace ${semanas} semana${semanas > 1 ? "s" : ""}`;
  const meses = Math.floor(dias / 30);
  if (meses < 12) return `Hace ${meses} mes${meses > 1 ? "es" : ""}`;
  const años = Math.floor(dias / 365);
  return `Hace ${años} año${años > 1 ? "s" : ""}`;
};

export const useTiempoRelativo = (fecha) => {
  const [texto, setTexto] = useState(() => calcularTiempoRelativo(fecha));

  // Recalcula si cambia la fecha (otra card) + ticker cada minuto.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- recálculo al cambiar fecha */
    setTexto(calcularTiempoRelativo(fecha));
    /* eslint-enable react-hooks/set-state-in-effect */

    const interval = setInterval(() => {
      setTexto(calcularTiempoRelativo(fecha));
    }, 60000);

    return () => clearInterval(interval);
  }, [fecha]);

  return texto;
};
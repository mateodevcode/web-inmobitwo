import { useEffect, useState } from "react";

const useTypingPlaceholder = (
  frases,
  { velocidadEscritura = 80, velocidadBorrado = 40, tiempoEspera = 2000 } = {},
) => {
  const [placeholderTexto, setPlaceholderTexto] = useState("");
  const [indiceTexto, setIndiceTexto] = useState(0);
  const [indiceFrase, setIndiceFrase] = useState(0);
  const [esBorrando, setEsBorrando] = useState(false);

  useEffect(() => {
    if (!frases?.length) return;

    let timeout;
    const fraseActual = frases[indiceFrase];

    if (!esBorrando) {
      if (indiceTexto < fraseActual.length) {
        timeout = setTimeout(() => {
          setPlaceholderTexto(fraseActual.slice(0, indiceTexto + 1));
          setIndiceTexto((prev) => prev + 1);
        }, velocidadEscritura);
      } else {
        timeout = setTimeout(() => setEsBorrando(true), tiempoEspera);
      }
    } else {
      if (indiceTexto > 0) {
        timeout = setTimeout(() => {
          setPlaceholderTexto(fraseActual.slice(0, indiceTexto - 1));
          setIndiceTexto((prev) => prev - 1);
        }, velocidadBorrado);
      } else {
        // Frase borrada del todo: pasar a la siguiente (transición de la
        // máquina de estados del typing).
        /* eslint-disable react-hooks/set-state-in-effect -- transición typing */
        setEsBorrando(false);
        setIndiceFrase((prev) => (prev + 1) % frases.length);
        /* eslint-enable react-hooks/set-state-in-effect */
      }
    }

    return () => clearTimeout(timeout);
  }, [
    indiceTexto,
    esBorrando,
    indiceFrase,
    frases,
    tiempoEspera,
    velocidadBorrado,
    velocidadEscritura,
  ]);

  return placeholderTexto;
};

export default useTypingPlaceholder;

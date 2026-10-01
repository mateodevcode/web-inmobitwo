import { useEffect, useRef, useState } from "react";

const RESET_MS = 2000;

export const useCopyClipboard = () => {
  const [copiado, setCopiado] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copiar = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiado(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopiado(false), RESET_MS);
    } catch {
      setCopiado(false);
    }
  };

  return { copiado, copiar };
};

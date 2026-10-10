import { useMemo } from "react";
import DOMPurify from "dompurify";

// Descripción HTML (Tiptap) de un anuncio: sanitizada + con estilos.
// Mismo patrón que FormatoDetail (publicar) e InfoCards (mis-anuncios).
// Seguro en SSR: las cards solo se renderizan con datos del fetch cliente,
// así que sanitize siempre corre con window disponible.
export function DescripcionAnuncio({ html, clampClass = "line-clamp-2" }) {
  const clean = useMemo(() => (html ? DOMPurify.sanitize(html) : ""), [html]);
  if (!clean) return null;
  return (
    <div
      className={`prose prose-sm max-w-none mt-2 min-w-0 overflow-hidden wrap-break-word ${clampClass}`}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}

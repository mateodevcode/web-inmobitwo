import Image from "next/image";
import { elegirTamano, construirSrcSet } from "../../utils/galeriaUtils";

/**
 * Renderiza una foto ya agrupada (ver agruparPorOrden), sirviendo el tamaño
 * correcto según el contexto y usando srcSet para que el navegador elija
 * automáticamente la mejor versión según pantalla/densidad de píxeles.
 *
 * Sin foto (anuncio sin imágenes): muestra el placeholder
 * `/propiedades/imagen_no_disponible.png` en vez de null, para no dejar
 * huecos vacíos/grises en listados, mapa, ficha y visores.
 *
 * @param {Object} foto - foto agrupada (de agruparPorOrden)
 * @param {'thumbnail'|'small'|'medium'|'large'|'xlarge'} tamañoBase - tamaño por defecto (fallback de src)
 * @param {string} sizes - atributo `sizes` de HTML (ver ejemplos de uso abajo)
 */
const PLACEHOLDER = "/propiedades/imagen_no_disponible.png";

export default function PropertyImage({
  foto,
  tamañoBase = "medium",
  sizes,
  alt = "",
  className,
  ...props
}) {
  const src = foto ? elegirTamano(foto, tamañoBase) : null;

  if (!src) {
    return (
      <Image
        width={1000}
        height={1000}
        src={PLACEHOLDER}
        alt="Imagen no disponible"
        className={className}
        loading="lazy"
        {...props}
      />
    );
  }

  const srcSet = construirSrcSet(foto);

  return (
    <Image
      width={1000}
      height={1000}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      loading="lazy"
      {...props}
    />
  );
}

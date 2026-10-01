export function InfoIntro() {
  return (
    <div className="md:p-8 p-6">
      <h2 className="text-xl font-bold">Información útil</h2>
      <p className="text-base mt-2">
        Ten las fotos a mano. Si no las tienes, podrás añadirlas más tarde.
        Sin fotos no tendrás resultados.
      </p>
      <br />
      <p className="text-base">
        Te regalamos tus primeros dos anuncios para que pruebes nuestro
        servicio. Puedes publicar gratis pisos, chalets, garajes, parcelas,
        locales, etc hasta que lo vendas o lo alquiles.
      </p>
      <br />
      <p className="text-base">
        Además, puedes publicar hasta 5 habitaciones gratis en piso
        compartido, no suman en el número de anuncios que te regalamos.
      </p>
      <br />
      <p className="text-base">
        Para poder mantener nuestra calidad de servicio necesitamos cobrar en
        estos casos:
      </p>
      <br />
      <ul className="list-disc mx-4 text-base">
        <li>anunciantes con más de dos inmuebles</li>
        <li>anuncios de inmuebles duplicados</li>
        <li>inmuebles en venta de más de 1.000.000 €</li>
        <li>inmuebles en alquiler de más de 3.000 €/mes</li>
      </ul>
      <br />
    </div>
  );
}

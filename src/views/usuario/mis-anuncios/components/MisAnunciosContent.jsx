import Loading from "@/views/organizacion/temas/loading/Loading";
import ListaAnuncios from "./ListaAnuncios";
import SinAnuncios from "./SinAnuncios";

export function MisAnunciosContent({ loading, propiedades }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[30svh] bg-tercero">
        <Loading type="opcion2" />
      </div>
    );
  }

  if (propiedades.length === 0) return <SinAnuncios />;

  return <ListaAnuncios propiedades={propiedades} />;
}

import {
  BUSCAS_INMUEBLE_LINKS,
  PROFESIONAL_LINKS,
  TIENES_INMUEBLE_LINKS,
} from "@/data/info-publicar";
import { LinkColumn } from "@/components/footer/LinkColumn";

const LINK_GROUPS = [
  { id: "buscas", title: "¿Buscas inmueble?", links: BUSCAS_INMUEBLE_LINKS },
  { id: "tienes", title: "¿Tienes un inmueble?", links: TIENES_INMUEBLE_LINKS },
  {
    id: "profesional",
    title: "¿Eres profesional inmobiliario?",
    links: PROFESIONAL_LINKS,
  },
];

export function LinksGridSection() {
  return (
    <section className="md:py-14 py-8">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 w-10/12 mx-auto">
        {LINK_GROUPS.map(({ id, title, links }) => (
          <LinkColumn key={id} title={title} links={links} />
        ))}
      </div>
    </section>
  );
}

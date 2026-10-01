import { MENUS } from "@/data/menus";
import EnlaceNav from "./EnlaceNav";
import Columna from "./Columna";

const NavLinks = () => (
  <nav className="xl:flex items-center gap-8 h-full hidden">
    {Object.keys(MENUS).map((title) => (
      <EnlaceNav key={title} title={title}>
        {MENUS[title].map((col) => (
          <Columna
            key={col.heading}
            heading={col.heading}
            links={col.links}
          />
        ))}
      </EnlaceNav>
    ))}
  </nav>
);

export default NavLinks;

import { User } from "lucide-react";
import Link from "next/link";
import { NAV_LINKS } from "./layout.data";
import { LogoLink } from "./LogoLink";

export function DesktopNav() {
  return (
    <>
      <LogoLink className="shrink-0" />

      <div className="hidden items-center gap-7 lg:flex">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.label}
            href={l.to}
            className="text-sm font-medium text-segundo/60 transition-colors hover:text-segundo"
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div className="hidden items-center gap-3 lg:flex">
        <Link
          href="/login"
          className="flex items-center gap-2 text-sm font-semibold text-segundo transition-colors hover:text-tercero"
        >
          <User className="size-4" aria-hidden="true" />
          Acceder
        </Link>
        <Link
          href="/info/publicar-anuncio"
          className="rounded-md bg-tercero px-5 py-2.5 text-sm font-semibold text-primero font-poppins shadow-sm transition-transform hover:-translate-y-0.5"
        >
          Pon tu anuncio gratis
        </Link>
      </div>
    </>
  );
}

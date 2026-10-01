import { User } from "lucide-react";
import Link from "next/link";
import { NAV_LINKS } from "./layout.data";

export function MobileMenu() {
  return (
    <div className="border-t border-segundo/10 bg-primero px-4 py-4 lg:hidden">
      <div className="flex flex-col gap-1">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.label}
            href={l.to}
            className="rounded-lg px-3 py-2.5 text-sm font-medium text-segundo hover:bg-segundo/5"
          >
            {l.label}
          </Link>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-2 border-t border-segundo/10 pt-4">
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 rounded-full border border-segundo/10 px-5 py-2.5 text-sm font-semibold text-segundo"
        >
          <User className="size-4" aria-hidden="true" />
          Acceder
        </Link>
        <Link
          href="/info/publicar-anuncio"
          className="rounded-full bg-tercero px-5 py-2.5 text-center text-sm font-semibold text-primero"
        >
          Pon tu anuncio gratis
        </Link>
      </div>
    </div>
  );
}

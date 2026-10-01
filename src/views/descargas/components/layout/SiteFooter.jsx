import { LogoLink } from "./LogoLink";
import { FooterColumn } from "./FooterColumn";
import { FOOTER_COLUMNAS } from "./layout.data";
import Link from "next/link";

const LEGALES = ["Privacidad", "Términos", "Cookies"];

export function SiteFooter() {
  return (
    <footer className="border-t border-segundo/10 bg-primero font-poppins">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <LogoLink />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-segundo/60">
              No vendemos casas. Conectamos personas.
            </p>
          </div>
          {FOOTER_COLUMNAS.map(({ id, ...col }) => (
            <FooterColumn key={id} {...col} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-segundo/10 pt-6 text-sm text-segundo/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} inmobitwo. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-5">
            {LEGALES.map((label) => (
              <Link
                key={label}
                href="/"
                className="transition-colors hover:text-segundo"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

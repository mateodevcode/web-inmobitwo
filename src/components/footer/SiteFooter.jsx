import { AYUDA_LINKS, PAISES_LINKS, SOBRE_LINKS } from "@/data/info-publicar";
import { LanguageSelect } from "./LanguageSelect";
import { FooterLinkColumns } from "./FooterLinkColumns";
import { AppStoreButtons } from "./AppStoreButtons";
import { SocialLinks } from "./SocialLinks";
import Logo from "@/components/logo/Logo";

const FOOTER_GROUPS = [
  { id: "sobre", title: "Sobre inmobitwo", links: SOBRE_LINKS },
  { id: "ayuda", title: "Ayuda", links: AYUDA_LINKS },
  { id: "paises", title: "Otros países", links: PAISES_LINKS },
];

export function SiteFooter() {
  return (
    <footer className="bg-tercero/5 md:py-12 py-8">
      <div className="mx-auto w-10/12">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="w-11/12">
            <Logo />
          </div>
          <LanguageSelect />
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <FooterLinkColumns groups={FOOTER_GROUPS} />

          <div>
            <h3 className="mb-4 text-xl font-semibold text-segundo">
              En tu móvil o tablet
            </h3>
            <AppStoreButtons />
            <SocialLinks />
          </div>
        </div>

        <p className="mt-10 text-base text-slate-500">
          <strong className="text-slate-900">inmobitwo</strong> Copyright ©
          2000-2026
        </p>
      </div>
    </footer>
  );
}

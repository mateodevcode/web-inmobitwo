import { SiteNav } from "./components/layout/SiteNav";
import { DownloadHero } from "./components/hero/DownloadHero";
import { AllInstallers } from "./components/installers/AllInstallers";
import { CliInstall } from "./components/cli/CliInstall";
import { Audiences } from "./components/audiences/Audiences";
import { MobileApp } from "./components/mobile/MobileApp";
import { SiteFooter } from "./components/layout/SiteFooter";
import { scrollbarStyles } from "@/data/data.styles.scrollbar.js";

export default function DescargarApp() {
  return (
    <div className="min-h-screen bg-primero">
      <SiteNav />
      <main>
        <DownloadHero />
        <AllInstallers />
        <CliInstall />
        <Audiences />
        <MobileApp />
      </main>
      <SiteFooter />

      <style>{scrollbarStyles.default}</style>
    </div>
  );
}

import { useState } from "react";
import { DesktopNav } from "./DesktopNav";
import { MenuToggle } from "./MenuToggle";
import { MobileMenu } from "./MobileMenu";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-segundo/10 bg-primero/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <DesktopNav />
        <MenuToggle open={open} onToggle={() => setOpen((v) => !v)} />
      </nav>

      {open && <MobileMenu />}
    </header>
  );
}

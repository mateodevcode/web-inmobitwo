
import Logo from "@/components/logo/Logo.jsx";
import Link from "next/link";

export function LogoLink({ className }) {
  return (
    <Link href="/" className={className} aria-label="Ir al inicio de inmobitwo">
      <Logo />
    </Link>
  );
}

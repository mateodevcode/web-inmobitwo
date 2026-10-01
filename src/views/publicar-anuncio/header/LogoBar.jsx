import Logo from "@/components/logo/Logo";
import { useRouter } from "next/navigation";

export function LogoBar() {
  const router = useRouter();

  return (
    <div
      className="bg-primero cursor-pointer select-none"
      id="top-detalles"
      onClick={() => router.push("/")}
    >
      <div className="w-full flex items-center justify-center">
        <div className="py-5 w-11/12">
          <Logo />
        </div>
      </div>
    </div>
  );
}

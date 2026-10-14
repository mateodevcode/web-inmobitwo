// src/pages/organizacion/temas/tema1/Layout.jsx
import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout = ({ organizacion, basePath, children }) => {
  const pathname = usePathname();
  const items = [
    { label: "Inicio", to: basePath || "/" },
    { label: "Sobre nosotros", to: `${basePath}/sobre-nosotros` },
    { label: "Contacto", to: `${basePath}/contacto` },
  ];

  return <div>{children}</div>;
};

export default Layout;

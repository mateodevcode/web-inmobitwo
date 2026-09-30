"use client";
// OrgShell: escaparate de una organización con su tema.
// Equivale a LayoutResolver/LayoutPublicoResolver + <Outlet context> de Vite,
// adaptado a App Router: la org llega por props y las páginas hijas por children.
// Las páginas hijas (slots y temas) consumen la org con useOutletContext()
// (shim en OrgOutletContext.jsx).
import { getTema } from "@/views/organizacion/temas/temaRegistry.js";
import { OrgOutletProvider } from "@/views/organizacion/paginas/OrgOutletContext.jsx";

export const OrgShell = ({ organizacion, basePath = "", children }) => {
  const { Layout } = getTema(organizacion?.tema);
  return (
    <OrgOutletProvider value={organizacion}>
      <Layout organizacion={organizacion} basePath={basePath}>
        {children}
      </Layout>
    </OrgOutletProvider>
  );
};

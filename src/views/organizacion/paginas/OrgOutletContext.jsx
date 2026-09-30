"use client";
// Shim temporal: replica el Outlet context de react-router con contexto React.
// Los layouts de organización (App Router) proveen la organización y las
// páginas hijas la consumen con useOrgOutlet() en vez de useOutletContext().
// TODO-NEXT: eliminar cuando los layouts pasen children + contexto propio.
import { createContext, useContext } from "react";

const OrgOutletContext = createContext(null);

export const OrgOutletProvider = OrgOutletContext.Provider;

export function useOrgOutlet() {
  return useContext(OrgOutletContext);
}

// Nombre legacy para que el codemod no rompa imports a medio migrar.
export const useOutletContext = useOrgOutlet;

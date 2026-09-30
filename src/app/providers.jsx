"use client";
// Envuelve la app con los providers globales (todo es cliente, como en Vite).
// Además monta los globales de UI (loader, consentimiento, modal lead) y el
// registro de sesión de tracking — lo que en Vite vivía en main.jsx/App.
import { useEffect, useRef } from "react";
import { AppProvider } from "@/context/AppProvider.jsx";
import { TenantProvider } from "@/context/TenantProvider.jsx";
import { useAppContext } from "@/context/AppContext.js";
import useTracking from "@/hooks/useTracking.js";
import LoaderGlobal from "@/components/loader/LoaderGlobal.jsx";
import ConsentimientoBanner from "@/components/consentimiento-banner/ConsentimientoBanner.jsx";
import ModalContactoLead from "@/components/modales/ModalContactoLead.jsx";
import ModalUser from "@/components/modales/ModalUser.jsx";

const TrackingInit = () => {
  const { consentimientoTracking } = useAppContext();
  const { registrarSesion } = useTracking();
  const sesionIniciada = useRef(false);

  useEffect(() => {
    if (sesionIniciada.current) return;
    if (consentimientoTracking === true) {
      sesionIniciada.current = true;
      registrarSesion();
    }
  }, [consentimientoTracking, registrarSesion]);

  return null;
};

export function Providers({ children }) {
  return (
    <AppProvider>
      <TenantProvider>
        <TrackingInit />
        {children}
        <LoaderGlobal />
        <ConsentimientoBanner />
        <ModalContactoLead />
        <ModalUser />
      </TenantProvider>
    </AppProvider>
  );
}

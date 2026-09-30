"use client";
// src/context/AppProvider.jsx
// Igual que en Vite, salvo: 'use client' + guards anti-SSR (localStorage no existe en prerender).
import { useCallback, useEffect, useRef, useState } from "react";
import { AppContext } from "@/context/AppContext.js";
import { apiBackend } from "@/actions/apiBackend.js";
import { getSessionId } from "@/utils/getSessionId.js";
import {
  FORM_DATA_PROPIEDAD_INICIAL,
  FORM_DATA_USUARIO_INICIAL,
} from "@/hooks/useResetForm";
import { feedActions } from "@/hooks/feedStore";
import { setFavoritosStore } from "@/hooks/favoritosStore";

const leerLocal = (clave) => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(clave);
  } catch {
    return null;
  }
};

export const AppProvider = ({ children }) => {
  // ─────────────────────────────────────────────
  // AUTH — inicia en null (igual que en el servidor) y se hidrata desde
  // localStorage tras montar. Sin esto, cada rama `usuario ? A : B`
  // diverge entre SSR y cliente y rompe la hidratación en toda la app.
  // Los guards esperan a `authListo` antes de decidir/redirigir.
  // ─────────────────────────────────────────────
  const [usuario, setUsuario] = useState(null);
  const [authListo, setAuthListo] = useState(false);

  useEffect(() => {
    try {
      const guardado = leerLocal("usuario");
      if (guardado) setUsuario(JSON.parse(guardado));
    } catch {
      /* storage corrupto: se queda sin sesión */
    }
    try {
      const consent = leerLocal("consentimiento_tracking");
      if (consent) setConsentimientoTracking(JSON.parse(consent));
    } catch {
      /* se queda en null = aún no ha decidido */
    }
    setAuthListo(true);
  }, []);

  const [loadingAuth, setLoadingAuth] = useState(false);

  const guardarSesion = async (usuarioData, accessToken) => {
    localStorage.setItem("usuario", JSON.stringify(usuarioData));
    localStorage.setItem("access_token", accessToken);
    setUsuario(usuarioData);

    if (consentimientoTracking === true) {
      try {
        const session_id = getSessionId();
        await apiBackend("/tracking/sesion", "POST", {
          session_id,
          consentimiento_dado: true,
        });
      } catch (error) {
        console.error(
          "❌ Error actualizando sesión de tracking post-login:",
          error,
        );
      }
    }
  };

  const cerrarSesion = async () => {
    await apiBackend("/auth/logout", "POST");
    localStorage.removeItem("usuario");
    localStorage.removeItem("access_token");
    setUsuario(null);
    feedActions.reset();
    setFavoritosStore([]);
  };

  const estaAutenticado = !!usuario;
  const esSuperAdmin = usuario?.rol === "superadmin";

  // ─────────────────────────────────────────────
  // FORMULARIO USUARIO (login / registro)
  // ─────────────────────────────────────────────
  const formDataUsuarioInicial = FORM_DATA_USUARIO_INICIAL;

  const [formDataUsuario, setFormDataUsuario] = useState(
    FORM_DATA_USUARIO_INICIAL,
  );

  const resetFormDataUsuario = () => setFormDataUsuario(formDataUsuarioInicial);

  // ─────────────────────────────────────────────
  // PROPIEDADES (el feed vive en hooks/feedStore; aquí solo lo CRUD de edición)
  // ─────────────────────────────────────────────
  const [propiedad, setPropiedad] = useState({});
  const [organizaciones, setOrganizaciones] = useState([]);
  const [search, setSearch] = useState("");
  const [openModalUser, setOpenModalUser] = useState(false);
  const [openModalAgregarPropiedad, setOpenModalAgregarPropiedad] =
    useState(false);
  const [
    openModalConfirmarEliminarPropiedad,
    setOpenModalConfirmarEliminarPropiedad,
  ] = useState(false);
  const [propiedadAEliminar, setPropiedadAEliminar] = useState(null);
  const [eliminandoPropiedad, setEliminandoPropiedad] = useState(false);

  const [cargandoGlobal, setCargandoGlobal] = useState(false);
  const contadorPeticiones = useRef(0);
  const [contentNumber, setContentNumber] = useState(0);
  const [featuresSel, setFeaturesSel] = useState([]);
  const [comprobarDireccion, setComprobarDireccion] = useState(false);
  const [confirmedLocation, setConfirmedLocation] = useState(null);
  const [openModalHamburguesa, setOpenModalHamburguesa] = useState(false);
  const [openModalCambiarPassword, setOpenModalCambiarPassword] =
    useState(false);
  const [openModalSidebar, setOpenModalSidebar] = useState(false);
  const [openModalActividades, setOpenModalActividades] = useState(false);
  const [openModalUserPropiedadId, setModalUserPropiedadId] = useState(false);

  const [formDataPropiedad, setFormDataPropiedad] = useState(
    FORM_DATA_PROPIEDAD_INICIAL,
  );

  const [leads, setLeads] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [logsTracking, setLogsTracking] = useState([]);
  const [loadingLogsTracking, setLoadingLogsTracking] = useState(false);
  const [openModalContactoLead, setOpenModalContactoLead] = useState(false);
  const [leadPendienteContacto, setLeadPendienteContacto] = useState(null);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState("todo");
  const [openModalInformativo, setOpenModalInformativo] = useState(false);

  // Se llama AL INICIO de cualquier petición
  const iniciarCarga = useCallback(() => {
    contadorPeticiones.current += 1;
    setCargandoGlobal(true);
  }, []);

  // Se llama AL FINAL (en el finally) de cualquier petición
  const terminarCarga = useCallback(() => {
    contadorPeticiones.current = Math.max(0, contadorPeticiones.current - 1);
    if (contadorPeticiones.current === 0) {
      setCargandoGlobal(false);
    }
  }, []);

  // ─────────────────────────────────────────────
  // TRACKING / CONSENTIMIENTO RGPD
  // ─────────────────────────────────────────────
  const [consentimientoTracking, setConsentimientoTracking] = useState(null); // null = aún no ha decidido

  const aceptarTracking = () => {
    localStorage.setItem("consentimiento_tracking", "true");
    setConsentimientoTracking(true);
  };

  const rechazarTracking = () => {
    localStorage.setItem("consentimiento_tracking", "false");
    setConsentimientoTracking(false);
  };

  // ─────────────────────────────────────────────
  // VALOR DEL CONTEXTO
  // ─────────────────────────────────────────────
  return (
    <AppContext.Provider
      value={{
        // Auth
        usuario,
        authListo,
        loadingAuth,
        setLoadingAuth,
        estaAutenticado,
        esSuperAdmin,
        guardarSesion,
        cerrarSesion,

        // Formulario usuario
        formDataUsuario,
        setFormDataUsuario,
        resetFormDataUsuario,

        // Propiedades
        formDataPropiedad,
        setFormDataPropiedad,
        propiedadAEliminar,
        setPropiedadAEliminar,
        eliminandoPropiedad,
        setEliminandoPropiedad,
        propiedad,
        setPropiedad,

        // Search
        search,
        setSearch,

        // modales
        openModalUser,
        setOpenModalUser,
        openModalAgregarPropiedad,
        setOpenModalAgregarPropiedad,
        openModalConfirmarEliminarPropiedad,
        setOpenModalConfirmarEliminarPropiedad,
        openModalHamburguesa,
        setOpenModalHamburguesa,
        openModalCambiarPassword,
        setOpenModalCambiarPassword,
        openModalSidebar,
        setOpenModalSidebar,
        openModalActividades,
        setOpenModalActividades,
        openModalContactoLead,
        setOpenModalContactoLead,
        openModalUserPropiedadId,
        setModalUserPropiedadId,
        openModalInformativo,
        setOpenModalInformativo,

        // Organizaciones
        organizaciones,
        setOrganizaciones,

        // Carga global
        cargandoGlobal,
        iniciarCarga,
        terminarCarga,

        // publicar anuncio
        contentNumber,
        setContentNumber,
        featuresSel,
        setFeaturesSel,
        comprobarDireccion,
        setComprobarDireccion,
        confirmedLocation,
        setConfirmedLocation,

        // Tracking / consentimiento
        consentimientoTracking,
        aceptarTracking,
        rechazarTracking,

        // Leads
        leads,
        setLeads,
        loadingLeads,
        setLoadingLeads,

        // Logs de tracking
        logsTracking,
        setLogsTracking,
        loadingLogsTracking,
        setLoadingLogsTracking,
        leadPendienteContacto,
        setLeadPendienteContacto,

        // Filtros
        filtroSeleccionado,
        setFiltroSeleccionado,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

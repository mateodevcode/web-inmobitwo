import { PiBuildingOfficeLight } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";

export const AUDIENCIAS = [
  {
    id: "personas",
    Icon: IoPersonOutline,
    titulo: "Para personas",
    texto:
      "Encuentra tu próxima casa, guarda favoritos y habla directamente con los propietarios. Tus 2 primeros anuncios son gratis.",
    cta: "Empezar a buscar",
    to: "/",
  },
  {
    id: "empresas",
    Icon: PiBuildingOfficeLight,
    titulo: "Para empresas",
    texto:
      "Gestiona carteras completas, coordina a tu equipo y publica en lote. Herramientas pensadas para agencias e inmobiliarias.",
    cta: "Ver planes para empresas",
    to: "/",
  },
];

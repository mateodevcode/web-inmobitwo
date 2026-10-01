import { Smartphone, Bell, MapPin } from "lucide-react";
import { BiLogoPlayStore } from "react-icons/bi";
import { RiAppleLine } from "react-icons/ri";

export const VENTAJAS_MOVIL = [
  {
    id: "avisos",
    Icon: Bell,
    texto: "Avisos al instante de nuevos inmuebles y mensajes",
  },
  {
    id: "mapa",
    Icon: MapPin,
    texto: "Busca por zonas dibujando directamente en el mapa",
  },
  {
    id: "publicar",
    Icon: Smartphone,
    texto: "Publica tu anuncio desde el móvil en minutos",
  },
];

export const TIENDAS = [
  {
    id: "app-store",
    Icon: RiAppleLine,
    topLine: "Descárgalo en",
    store: "App Store",
  },
  {
    id: "google-play",
    Icon: BiLogoPlayStore,
    topLine: "Disponible en",
    store: "Google Play",
  },
];

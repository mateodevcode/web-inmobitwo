import {
  Geist,
  Geist_Mono,
  Bangers,
  Anton,
  Londrina_Outline,
  Archivo_Black,
  Poppins,
  Montserrat,
} from "next/font/google";
import "./globals.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "@geoman-io/maplibre-geoman-free/dist/maplibre-geoman.css";
import { Toaster } from "sonner";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistPoppins = Poppins({
  variable: "--font-geist-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMontserrat = Montserrat({
  variable: "--font-geist-montserrat",
  subsets: ["latin"],
});

const geistBangers = Bangers({
  variable: "--font-geist-bangers",
  subsets: ["latin"],
  weight: ["400"],
});

const geistAnton = Anton({
  variable: "--font-geist-anton",
  subsets: ["latin"],
  weight: ["400"],
});

const geistLondrina = Londrina_Outline({
  variable: "--font-geist-londrina",
  subsets: ["latin"],
  weight: ["400"],
});

const geistArchivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Inmobitwo | Red social inmobiliaria",
  description:
    "Inmobitwo es la red social inmobiliaria donde encuentras apartamentos, casas, lotes y locales en venta o arriendo, y conectas directamente con propietarios e inmobiliarias en Colombia.",
  keywords:
    "Inmobitwo, inmuebles, propiedades, apartamentos en venta, casas en arriendo, lotes, locales comerciales, inmobiliarias, red social inmobiliaria, publicar anuncio inmueble, Colombia",
  authors: [
    {
      name: "Seventwo Technologies",
      url: "https://www.seventwo.tech",
    },
  ],
  creator: "Seventwo Technologies",
  publisher: "Seventwo Technologies",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  metadataBase: new URL("https://inmobitwo.seventwo.tech"),
  openGraph: {
    title: "Inmobitwo | Red social inmobiliaria",
    description:
      "Encuentra, publica y comparte inmuebles. Conecta con propietarios e inmobiliarias.",
    url: "https://inmobitwo.seventwo.tech",
    siteName: "Inmobitwo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Inmobitwo - Red social inmobiliaria",
      },
    ],
    locale: "es-CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inmobitwo | Red social inmobiliaria",
    description: "Encuentra, publica y comparte inmuebles en Colombia.",
    images: ["https://inmobitwo.seventwo.tech/og-image.png"],
    // creator: "@tuusuario", // opcional
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es-CO"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${geistMontserrat.variable} ${geistPoppins.variable} ${geistBangers.variable} ${geistAnton.variable} ${geistLondrina.variable} ${geistArchivoBlack.variable} antialiased `}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>

        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

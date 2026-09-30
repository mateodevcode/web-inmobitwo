"use client";
export const dynamic = "force-dynamic";
// /inmobiliarias/[slug] — vitrina pública. Equivale al index de /inmobiliarias/:slug en Vite.
import HomeTemaSlot from "@/views/organizacion/paginas/HomeTemaSlot.jsx";

export default function RoutePage() {
  return <HomeTemaSlot />;
}

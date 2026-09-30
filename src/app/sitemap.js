const BASE_URL = "https://inmobitwo.seventwo.tech";

export default function sitemap() {
  const rutas = [
    { path: "", priority: 1, changeFrequency: "daily" },
    { path: "/inmuebles", priority: 0.9, changeFrequency: "daily" },
    { path: "/mapa", priority: 0.7, changeFrequency: "weekly" },
    { path: "/info/publicar-anuncio", priority: 0.6, changeFrequency: "monthly" },
  ];

  return rutas.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

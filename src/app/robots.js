const BASE_URL = "https://inmobitwo.seventwo.tech";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/feed", "/login", "/registro", "/perfil", "/favoritos", "/leads"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

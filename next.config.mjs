/** @type {import('next').NextConfig} */
const nextConfig = {
  // Imagen autocontenida para Docker (solo lo necesario en runtime).
  output: "standalone",
};

export default nextConfig;

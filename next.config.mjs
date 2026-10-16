/** @type {import('next').NextConfig} */
const nextConfig = {
  // Imagen autocontenida para Docker (solo lo necesario en runtime).
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "seventwo.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
      {
        // Decorativas estáticas de los temas de org (avatares/testimonios).
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

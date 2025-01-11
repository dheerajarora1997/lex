import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Optional: Enable React Strict Mode
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")], // Correct Sass path configuration
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.cloud.google.com",
        pathname: "/lex_assets/**", // Pattern for Google Cloud Storage images
      },
    ],
  },
  // Additional configurations (optional)
  // i18n: {
  //   locales: ["en", "es"],
  //   defaultLocale: "en",
  // },
};

export default nextConfig;

const { migrateDB, once } = require("./src/db/migrate.js");
const withNextIntl = require("next-intl/plugin")();
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import("./src/env.mjs");
/** @type {import("next").NextConfig} */
const nextConfig = withNextIntl({
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
  },
  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   
  i18n: {
    locales: ["en","ar-tn","ar","fr"],
    defaultLocale: "ar-tn",
    localeDetection: false
  },*/
});

module.exports = once((/** @type {any} */ phase) => {
  if (
    phase === "phase-development-server" ||
    phase === "phase-production-build"
  ) {
    migrateDB();
  }

  console.log("Building phase:", phase);
  return nextConfig;
});

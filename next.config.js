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
});

module.exports = once((/** @type {any} */ phase) => {
  if (
    phase === "phase-development-server" &&
    phase === "phase-production-build"
  ) {
    migrateDB();
  }

  console.log("Building phase:", phase);
  return nextConfig;
});

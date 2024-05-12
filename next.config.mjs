import nextpwa from "@ducanh2912/next-pwa";
import createJiti from "jiti";
import { fileURLToPath } from "node:url";
const jiti = createJiti(fileURLToPath(import.meta.url));
jiti("./env");

const withPWA = nextpwa({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    disable: process.env.NODE_ENV === "development",
    workboxOptions: { disableDevLogs: true },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [],
    },

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};

export default withPWA(nextConfig);

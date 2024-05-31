import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: ["./component/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./type/**/*.{ts,tsx}"],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "slow-spin": "spin 2s linear infinite",
            },
            screens: {
                mouse: { raw: "(hover: hover)" },
            },
            colors: {
                stone: {
                    150: "#EEEDEC",
                },
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@savvywombat/tailwindcss-grid-areas"),
        require("@tailwindcss/typography"),
    ],
} satisfies Config;

export default config;

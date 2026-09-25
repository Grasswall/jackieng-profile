import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy:     "#0A1828",
        gold:     "#BFA181",
        offwhite: "#F5F5F0",
        charcoal: "#1A1A2E",
        slate:    "#6B7280",
        // Keep default shadcn-style CSS var colours so layout.tsx still works
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "serif"],
        body:    ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

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
        // Brand tokens (approved direction)
        cream:    "#F4F1EA",
        ink:      "#1C1A16",
        stone:    "#5A5448",
        deep:     "#0A1828",
        deep2:    "#0E2036",
        stage:    "#08131F",
        mist:     "#A9B6C8",
        signal:   "#22D3EE",
        sim:      "#F97316",
        clay:     "#A5460A",
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
        heading: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        body:    ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

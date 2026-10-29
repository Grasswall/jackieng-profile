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
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        field1: "var(--field-1)",
        "field1-ink": "var(--field-1-ink)",
        // Keep default shadcn-style CSS var colours so layout.tsx still works
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ['var(--font-display)', 'Erode', 'sans-serif'],
        text: ['var(--font-text)', 'Erode', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

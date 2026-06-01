import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f1f4f8",
          100: "#dde5ee",
          200: "#bccadd",
          500: "#1e3a5f",
          600: "#152d4a",
          700: "#10233a",
          900: "#0a1727",
        },
        gold: {
          400: "#d4a849",
          500: "#b88a2c",
          600: "#9a7320",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

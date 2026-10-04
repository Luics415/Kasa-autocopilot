/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Nuevo esquema automotriz industrial: Modern Diagnostic Hub
        workshop: {
          bg: "#0a0f1d",       // Azul grafito profundo
          card: "#131c31",     // Tarjeta sólida contrastada
          cardHover: "#1c2844",
          border: "#233356",   // Bordes visibles y definidos
          borderActive: "#38bdf8",
          dark: "#060913"
        },
        turbo: {
          blue: "#0284c7",
          cyan: "#38bdf8",
          glow: "rgba(56, 189, 248, 0.2)",
        },
        mechanic: {
          amber: "#f59e0b",
          orange: "#ea580c",
          red: "#ef4444",
          green: "#10b981",
        },
        bedrock: {
          purple: "#9333ea",
          violet: "#a855f7",
          badge: "#581c87",
        }
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};

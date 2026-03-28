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
        "lions-navy": "#003366",
        "lions-gold": "#C8A951",
        "lions-light-gold": "#F5E6B8",
        "lions-white": "#FFFFFF",
        "lions-light-gray": "#F8F9FA",
        "lions-dark-text": "#1a1a2e",
      },
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
        serif: ["'Playfair Display'", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "lions-gradient": "linear-gradient(135deg, #003366 0%, #C8A951 100%)",
        "lions-hero": "linear-gradient(135deg, #003366 0%, #1a4d7a 50%, #003366 100%)",
      },
      boxShadow: {
        "lions": "0 10px 30px rgba(0, 51, 102, 0.15)",
        "lions-lg": "0 20px 40px rgba(0, 51, 102, 0.2)",
        "lions-glow": "0 0 24px rgba(200, 169, 81, 0.2)",
        "lions-float": "0 12px 32px rgba(200, 169, 81, 0.25)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "slide-in-left": "slideInLeft 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "slide-in-right": "slideInRight 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "scale-in-up": "scaleInUp 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "scroll-arrow": "scrollArrow 2.5s cubic-bezier(0.77, 0, 0.175, 1) infinite",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        scaleInUp: {
          from: { opacity: "0", transform: "scale(0.95) translateY(12px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        scrollArrow: {
          "0%, 100%": { opacity: "0.6", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(8px)" },
        },
      },
      transitionTimingFunction: {
        "ease-out": "cubic-bezier(0.23, 1, 0.32, 1)",
        "ease-in-out": "cubic-bezier(0.77, 0, 0.175, 1)",
        "ease-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
export default config;

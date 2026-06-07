import type { Config } from "tailwindcss";

// Ported verbatim from the original Lovable project so components match exactly.
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["Outfit", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        serif: ["Fraunces", "Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          light: "hsl(var(--accent-light))",
          "light-dark": "hsl(var(--accent-light-dark))",
          peach: "hsl(var(--accent-peach))",
          "peach-dark": "hsl(var(--accent-peach-dark))",
          coral: "hsl(var(--accent-coral))",
          "coral-dark": "hsl(var(--accent-coral-dark))",
          blue: "hsl(var(--accent-blue))",
          "blue-dark": "hsl(var(--accent-blue-dark))",
          sage: "hsl(var(--accent-sage))",
          "sage-dark": "hsl(var(--accent-sage-dark))",
          terracotta: "hsl(var(--accent-terracotta))",
          "terracotta-dark": "hsl(var(--accent-terracotta-dark))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          light: "hsl(var(--success-light))",
        },
        highlighter: {
          DEFAULT: "hsl(var(--highlighter))",
          foreground: "hsl(var(--highlighter-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-soft": "var(--gradient-soft)",
        "gradient-hero": "var(--gradient-hero)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        accent: "var(--shadow-accent)",
        glow: "var(--shadow-glow)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-in": { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "fade-in-up": { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "scale-in": { "0%": { opacity: "0", transform: "scale(0.95)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        jiggle: { "0%, 85%, 100%": { transform: "rotate(0deg)" }, "87%": { transform: "rotate(-2deg)" }, "89%": { transform: "rotate(2deg)" }, "91%": { transform: "rotate(-2deg)" } },
        marquee: { "0%": { transform: "translateX(0%)" }, "100%": { transform: "translateX(-33.333%)" } },
        "slide-in-right": { "0%": { opacity: "0", transform: "translateX(100px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        "slide-up-fade": { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        wave: { "0%, 100%": { transform: "translateY(0)" }, "25%": { transform: "translateY(-10px)" }, "75%": { transform: "translateY(10px)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "jiggle-slow": "jiggle 10s ease-in-out infinite",
        marquee: "marquee 7.5s linear infinite",
        "slide-in-right": "slide-in-right 0.4s ease-out",
        "slide-up-fade": "slide-up-fade 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        wave: "wave 1.3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

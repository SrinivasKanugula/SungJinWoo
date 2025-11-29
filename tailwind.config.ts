import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "glow-pulse": {
          "0%, 100%": {
            opacity: "1",
            textShadow: "0 0 20px rgb(167 139 250 / 0.5)",
            boxShadow:
              "0 0 20px rgb(167 139 250 / 0.3), inset 0 0 20px rgb(167 139 250 / 0.1)",
          },
          "50%": {
            opacity: "0.9",
            textShadow: "0 0 40px rgb(196 181 253 / 0.8)",
            boxShadow:
              "0 0 40px rgb(167 139 250 / 0.5), inset 0 0 30px rgb(196 181 253 / 0.15)",
          },
        },
        "purple-glow": {
          "0%, 100%": {
            boxShadow:
              "0 0 10px rgb(167 139 250 / 0.3), inset 0 0 10px rgb(167 139 250 / 0.05)",
          },
          "50%": {
            boxShadow:
              "0 0 25px rgb(167 139 250 / 0.5), inset 0 0 15px rgb(167 139 250 / 0.1)",
          },
        },
        "magenta-glow": {
          "0%, 100%": {
            boxShadow:
              "0 0 10px rgb(217 70 239 / 0.3), inset 0 0 10px rgb(217 70 239 / 0.05)",
          },
          "50%": {
            boxShadow:
              "0 0 25px rgb(217 70 239 / 0.5), inset 0 0 15px rgb(217 70 239 / 0.1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow-pulse": "glow-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "purple-glow": "purple-glow 3s ease-in-out infinite",
        "magenta-glow": "magenta-glow 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-to-br-dark":
          "linear-gradient(135deg, #1a0f3f 0%, #2d1a5c 100%)",
        "gradient-purple": "linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)",
        "gradient-tech":
          "linear-gradient(135deg, #9333ea 0%, #d946ef 50%, #a78bfa 100%)",
        "gradient-vibrant":
          "linear-gradient(135deg, #7e22ce 0%, #9333ea 50%, #d946ef 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

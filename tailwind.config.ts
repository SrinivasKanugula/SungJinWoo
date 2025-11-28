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
            textShadow: "0 0 20px rgb(0 255 255 / 0.5)",
            boxShadow: "0 0 20px rgb(0 255 255 / 0.3), inset 0 0 20px rgb(0 255 255 / 0.1)",
          },
          "50%": {
            opacity: "0.8",
            textShadow: "0 0 40px rgb(0 255 255 / 0.8)",
            boxShadow: "0 0 40px rgb(0 255 255 / 0.5), inset 0 0 30px rgb(0 255 255 / 0.15)",
          },
        },
        "cyan-glow": {
          "0%, 100%": {
            boxShadow: "0 0 10px rgb(0 255 255 / 0.3), inset 0 0 10px rgb(0 255 255 / 0.05)",
          },
          "50%": {
            boxShadow: "0 0 25px rgb(0 255 255 / 0.5), inset 0 0 15px rgb(0 255 255 / 0.1)",
          },
        },
        "blue-glow": {
          "0%, 100%": {
            boxShadow: "0 0 10px rgb(0 150 255 / 0.3), inset 0 0 10px rgb(0 150 255 / 0.05)",
          },
          "50%": {
            boxShadow: "0 0 25px rgb(0 150 255 / 0.5), inset 0 0 15px rgb(0 150 255 / 0.1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow-pulse": "glow-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "cyan-glow": "cyan-glow 3s ease-in-out infinite",
        "blue-glow": "blue-glow 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-to-br-dark": "linear-gradient(135deg, #0a1628 0%, #0f1f3f 100%)",
        "gradient-cool": "linear-gradient(135deg, #00d4ff 0%, #0096ff 100%)",
        "gradient-cyan": "linear-gradient(135deg, #00ffff 0%, #00a8ff 50%, #6366f1 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

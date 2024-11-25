const GLOBAL_SPACING = {
  "almost-same": "0.25rem",
  close: "0.5rem",
  "same-level": "1.25rem",
  "other-level": "2rem",
  "other-level-large": "2.25rem",
  same: "unset"
}

/** @type {import('tailwindcss').Config} */
export const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modals/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        icon: ["Material Symbols Rounded"]
      },
      width: {
        "gap-1/12": `calc(100% * 1 / 12 - (12 - 1) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-2/12": `calc(100% * 2 / 12 - (12 - 2) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-3/12": `calc(100% * 3 / 12 - (12 - 3) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-4/12": `calc(100% * 4 / 12 - (12 - 4) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-5/12": `calc(100% * 5 / 12 - (12 - 5) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-6/12": `calc(100% * 6 / 12 - (12 - 6) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-7/12": `calc(100% * 7 / 12 - (12 - 7) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-8/12": `calc(100% * 8 / 12 - (12 - 8) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-9/12": `calc(100% * 9 / 12 - (12 - 9) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-10/12": `calc(100% * 10 / 12 - (12 - 10) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-11/12": `calc(100% * 11 / 12 - (12 - 11) * (${GLOBAL_SPACING["same-level"]} / 12))`
      },
      gap: {
        ...GLOBAL_SPACING
      },
      margin: {
        ...GLOBAL_SPACING,
        "gap-1/12": `calc(100% * 1 / 12 - (12 - 1) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-2/12": `calc(100% * 2 / 12 - (12 - 2) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-3/12": `calc(100% * 3 / 12 - (12 - 3) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-4/12": `calc(100% * 4 / 12 - (12 - 4) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-5/12": `calc(100% * 5 / 12 - (12 - 5) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-6/12": `calc(100% * 6 / 12 - (12 - 6) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-7/12": `calc(100% * 7 / 12 - (12 - 7) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-8/12": `calc(100% * 8 / 12 - (12 - 8) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-9/12": `calc(100% * 9 / 12 - (12 - 9) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-10/12": `calc(100% * 10 / 12 - (12 - 10) * (${GLOBAL_SPACING["same-level"]} / 12))`,
        "gap-11/12": `calc(100% * 11 / 12 - (12 - 11) * (${GLOBAL_SPACING["same-level"]} / 12))`
      },
      colors: {
        page: "#231915",
        primary: {
          main: "#bb9457",
          hover: "#d4a96b",
          pressed: "#a37e4d",
          text: "#bb9457",
          transparent: "#a37e4d17"
        },
        secondary: {
          main: "#5e503f",
          hover: "#6f5c4a",
          pressed: "#8f7a5f",
          text: "#5e503f"
        },
        success: {
          main: "#656d4a",
          hover: "#7b8a5f",
          pressed: "#4d5639",
          text: "#2e3222"
        },
        cancel: {
          main: "#b6ad90",
          hover: "#c1b8a0",
          pressed: "#a49b7e",
          text: "#615c4c"
        },
        remove: {
          main: "#d04a47",
          hover: "#e05a57",
          pressed: "#b63a37",
          text: "#3c0e0d"
        },
        block: {
          100: "#decac3",
          200: "#af9c95",
          300: "#817069",
          400: "#574641",
          500: "#2f211c",
          600: "#261a16",
          700: "#1c1411",
          800: "#130d0b",
          900: "#090706"
        },
        menu: "#1c1815",
        form: {
          main: "#141414",
          disabled: "#272626",
          border: "#e5e7eb"
        },
        mask: "#212d42"
      },
      zIndex: {
        under: { mask: 100 },
        popup: { mask: 900 },
        select: 1000,
        modal: 1050,
        snackbar: 1100,
        top: 2000
      }
    }
  },
  plugins: []
}

export default config

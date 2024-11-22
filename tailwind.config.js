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
        page: "#0b1111",
        primary: {
          main: "#14b8a4",
          hover: "#28ccb8",
          pressed: "#00a490",
          text: "#14b8a4",
          transparent: "#14b8a421"
        },
        secondary: {
          main: "#255cc0",
          hover: "#3970d4",
          pressed: "#1148ac",
          text: "#255cc0"
        },
        success: {
          main: "#7ed7cc",
          hover: "#92ebe0",
          pressed: "#6ac3b8",
          text: "#247d72"
        },
        cancel: {
          main: "#ffd995",
          hover: "#ffeda9",
          pressed: "#d7c581",
          text: "#a57f3b"
        },
        remove: {
          main: "#ffc195",
          hover: "#ffd5a9",
          pressed: "#d7ad81",
          text: "#a5673b"
        },
        block: {
          100: "#d3d5d7",
          200: "#a7abaf",
          300: "#7a8287",
          400: "#4e585f",
          500: "#222e37",
          600: "#1b252c",
          700: "#141c21",
          800: "#0e1216",
          900: "#07090b"
        },
        menu: "#11151d",
        form: "#1b252c",
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

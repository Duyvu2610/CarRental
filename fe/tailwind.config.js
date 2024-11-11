/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#22c55e",
        footer: "#45595b",
        bg: "#f6f6f6",
      },
      maxWidth: {
        "width-page": "1240px",
      },
      boxShadow: {
        custom: "0 2px 12px rgba(0,0,0,0.19), 0 3px 6px rgba(0,0,0,0.23)",
      },
      keyframes: {
        loader: {
          "0%": {
            width: "2px",
            height: "2px",
            borderRadius: "1px",
          },
          "100%": {
            width: "20px",
            height: "20px",
            borderRadius: "10px",
          },
        },
      },
      animation: {
        dot1: "loader 1s infinite alternate 0.2s",
        dot2: "loader 1s infinite alternate 0.4s",
        dot3: "loader 1s infinite alternate 0.6s",
        dot4: "loader 1s infinite alternate 0.8s",
        dot5: "loader 1s infinite alternate 1s",
      },
      backgroundImage: {
        "gradient-backdrop": "linear-gradient(45deg, #6200ea, #d500f9)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#22c55e",

          secondary: "#ff00ff",

          accent: "#00ffff",

          neutral: "#ff00ff",

          "base-100": "#ffffff",

          info: "#0000ff",

          success: "#00ff00",

          warning: "#00ff00",

          error: "#ff0000",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};

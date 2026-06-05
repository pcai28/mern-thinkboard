import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // 扫描根目录的 index.html
    "./src/**/*.{js,ts,jsx,tsx}", // 扫描 src 目录下所有 JS/TS/JSX/TSX 文件
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["forest"],
  },
};

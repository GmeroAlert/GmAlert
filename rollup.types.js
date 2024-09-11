import { dts } from "rollup-plugin-dts";

const config = [
  // …
  {
    input: "./src/main.ts",
    output: [{ file: "dist/gmalert.esm.d.ts", format: "es" }],
    plugins: [dts()],
  },
  {
    input: "./src/index.ts",
    output: [{ file: "dist/gmalert.min.d.ts", format: "es" }],
    plugins: [dts()],
  }
];

export default config;

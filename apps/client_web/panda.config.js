import { defineGlobalStyles } from "@pandacss/dev";
import { defineConfig } from "@pandacss/dev";

const globalCss = defineGlobalStyles({
  'body' : {
    fontFamily: "var(--font-nato-sans) , sans-serif",
    fontWeight: 400,
    bacckgroundColor: "#FFFFFF",
}
});

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{ts,tsx,js,jsx}", "./pages/**/*.{ts,tsx,js,jsx}"],
  exclude: [],
  outdir: "styled-system",
  globalCss: globalCss,
  theme: {
    tokens: {
      colors: {
        sageLight: { value : "hsl(155, 30.0%, 98.8%)"},
        sage: { value : "hsl(150, 14.3%, 97.3%)"},
        grassA3: { value : "hsla(120, 98.0%, 35.5%, 0.079)"},
        grassA4: { value : "hsla(120, 98.7%, 31.5%, 0.126)"},
        grassA5: { value : "hsla(122, 98.5%, 29.9%, 0.193)"},
        grassA6: { value : "hsla(125, 99.2%, 27.9%, 0.283)"},
        grassA7: { value : "hsla(125, 99.9%, 27.0%, 0.408)"},
        grassA8: { value : "hsla(131, 100%, 27.6%, 0.604)"},
        grassA9: { value : "hsla(131, 99.7%, 26.3%, 0.726)"},
        grassA10: { value : "hsla(132, 99.9%, 24.0%, 0.761)"},
        grassA11: { value : "hsla(133, 99.5%, 19.5%, 0.840)"},
        grassA12: { value : "hsla(131, 99.1%, 6.3%, 0.875)",}
      },
      fonts: {
        alegre: { value: "var(--font-alegre-sans), sans-serif" },
      },
    },
  },
});

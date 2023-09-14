const tokens = {
  "colors.sageLight": {
    "value": "hsl(155, 30.0%, 98.8%)",
    "variable": "var(--colors-sage-light)"
  },
  "colors.sage": {
    "value": "hsl(150, 14.3%, 97.3%)",
    "variable": "var(--colors-sage)"
  },
  "colors.grassA3": {
    "value": "hsla(120, 98.0%, 35.5%, 0.079)",
    "variable": "var(--colors-grass-a3)"
  },
  "colors.grassA4": {
    "value": "hsla(120, 98.7%, 31.5%, 0.126)",
    "variable": "var(--colors-grass-a4)"
  },
  "colors.grassA5": {
    "value": "hsla(122, 98.5%, 29.9%, 0.193)",
    "variable": "var(--colors-grass-a5)"
  },
  "colors.grassA6": {
    "value": "hsla(125, 99.2%, 27.9%, 0.283)",
    "variable": "var(--colors-grass-a6)"
  },
  "colors.grassA7": {
    "value": "hsla(125, 99.9%, 27.0%, 0.408)",
    "variable": "var(--colors-grass-a7)"
  },
  "colors.grassA8": {
    "value": "hsla(131, 100%, 27.6%, 0.604)",
    "variable": "var(--colors-grass-a8)"
  },
  "colors.grassA9": {
    "value": "hsla(131, 99.7%, 26.3%, 0.726)",
    "variable": "var(--colors-grass-a9)"
  },
  "colors.grassA10": {
    "value": "hsla(132, 99.9%, 24.0%, 0.761)",
    "variable": "var(--colors-grass-a10)"
  },
  "colors.grassA11": {
    "value": "hsla(133, 99.5%, 19.5%, 0.840)",
    "variable": "var(--colors-grass-a11)"
  },
  "colors.grassA12": {
    "value": "hsla(131, 99.1%, 6.3%, 0.875)",
    "variable": "var(--colors-grass-a12)"
  },
  "fonts.alegre": {
    "value": "var(--font-alegre-sans), sans-serif",
    "variable": "var(--fonts-alegre)"
  },
  "breakpoints.sm": {
    "value": "640px",
    "variable": "var(--breakpoints-sm)"
  },
  "breakpoints.md": {
    "value": "768px",
    "variable": "var(--breakpoints-md)"
  },
  "breakpoints.lg": {
    "value": "1024px",
    "variable": "var(--breakpoints-lg)"
  },
  "breakpoints.xl": {
    "value": "1280px",
    "variable": "var(--breakpoints-xl)"
  },
  "breakpoints.2xl": {
    "value": "1536px",
    "variable": "var(--breakpoints-2xl)"
  },
  "sizes.breakpoint-sm": {
    "value": "640px",
    "variable": "var(--sizes-breakpoint-sm)"
  },
  "sizes.breakpoint-md": {
    "value": "768px",
    "variable": "var(--sizes-breakpoint-md)"
  },
  "sizes.breakpoint-lg": {
    "value": "1024px",
    "variable": "var(--sizes-breakpoint-lg)"
  },
  "sizes.breakpoint-xl": {
    "value": "1280px",
    "variable": "var(--sizes-breakpoint-xl)"
  },
  "sizes.breakpoint-2xl": {
    "value": "1536px",
    "variable": "var(--sizes-breakpoint-2xl)"
  }
}

export function token(path, fallback) {
  return tokens[path]?.value || fallback
}

function tokenVar(path, fallback) {
  return tokens[path]?.variable || fallback
}

token.var = tokenVar
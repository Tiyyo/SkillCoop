/* eslint-disable */
export type Token = "colors.sageLight" | "colors.sage" | "colors.grassA3" | "colors.grassA4" | "colors.grassA5" | "colors.grassA6" | "colors.grassA7" | "colors.grassA8" | "colors.grassA9" | "colors.grassA10" | "colors.grassA11" | "colors.grassA12" | "fonts.alegre" | "breakpoints.sm" | "breakpoints.md" | "breakpoints.lg" | "breakpoints.xl" | "breakpoints.2xl" | "sizes.breakpoint-sm" | "sizes.breakpoint-md" | "sizes.breakpoint-lg" | "sizes.breakpoint-xl" | "sizes.breakpoint-2xl"

export type ColorToken = "sageLight" | "sage" | "grassA3" | "grassA4" | "grassA5" | "grassA6" | "grassA7" | "grassA8" | "grassA9" | "grassA10" | "grassA11" | "grassA12"

export type FontToken = "alegre"

export type BreakpointToken = "sm" | "md" | "lg" | "xl" | "2xl"

export type SizeToken = "breakpoint-sm" | "breakpoint-md" | "breakpoint-lg" | "breakpoint-xl" | "breakpoint-2xl"

export type AnimationName = "spin" | "ping" | "pulse" | "bounce"

export type Tokens = {
		colors: ColorToken
		fonts: FontToken
		breakpoints: BreakpointToken
		sizes: SizeToken
		animationName: AnimationName
} & { [token: string]: never }

export type TokenCategory = "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "shadows" | "spacing" | "radii" | "borders" | "durations" | "easings" | "animations" | "blurs" | "gradients" | "breakpoints" | "assets"
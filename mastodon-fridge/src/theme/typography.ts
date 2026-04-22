/**
 * Typography scale from DESIGN.md
 *
 * Font families:
 *   - United Sans Cond (headings H1, H2, overline)
 *   - Acumin Pro (H3, body, caption, buttons)
 *
 * We load these via expo-font. Until loaded, the system falls back
 * to platform defaults (System on iOS, Roboto on Android).
 */

export const fontFamilies = {
  heading: 'UnitedSansCond-Bold',
  headingMedium: 'UnitedSansCond-Medium',
  body: 'AcuminPro-Regular',
  bodySemibold: 'AcuminPro-Semibold',
  bodyMedium: 'AcuminPro-Medium',
} as const;

/** Fallback families used before custom fonts finish loading */
export const fallbackFamilies = {
  heading: undefined, // uses system default
  headingMedium: undefined,
  body: undefined,
  bodySemibold: undefined,
  bodyMedium: undefined,
} as const;

export const typography = {
  h1: {
    fontFamily: fontFamilies.heading,
    fontSize: 28,
    fontWeight: '700' as const,
  },
  h2: {
    fontFamily: fontFamilies.headingMedium,
    fontSize: 22,
    fontWeight: '500' as const,
  },
  h3: {
    fontFamily: fontFamilies.bodySemibold,
    fontSize: 18,
    fontWeight: '600' as const,
  },
  body: {
    fontFamily: fontFamilies.body,
    fontSize: 16,
    fontWeight: '400' as const,
  },
  caption: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 12,
    fontWeight: '500' as const,
  },
  overline: {
    fontFamily: fontFamilies.headingMedium,
    fontSize: 11,
    fontWeight: '500' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },
  button: {
    fontFamily: fontFamilies.bodySemibold,
    fontSize: 14,
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
  },
} as const;

export type TypographyTokens = typeof typography;

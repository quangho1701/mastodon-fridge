/**
 * Spacing system from DESIGN.md — 4px base unit.
 */

const BASE = 4;

export const spacing = {
  /** 4px */
  xs: BASE,
  /** 8px */
  sm: BASE * 2,
  /** 12px — card gap */
  md: BASE * 3,
  /** 16px — screen margins, internal card padding */
  lg: BASE * 4,
  /** 20px */
  xl: BASE * 5,
  /** 24px — section breaks */
  xxl: BASE * 6,
  /** 32px */
  xxxl: BASE * 8,
} as const;

export const layout = {
  screenMarginHorizontal: spacing.lg,
  cardGap: spacing.md,
  cardPadding: spacing.lg,
  sectionBreak: spacing.xxl,
  touchTargetMin: 44,
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
} as const;

export type SpacingTokens = typeof spacing;

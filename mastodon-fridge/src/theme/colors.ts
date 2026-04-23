/**
 * Color tokens from DESIGN.md
 * Summit Gold (#DAAA00) = action/interactive color
 * Golden (#CFB991) = brand identity moments only
 */

export const lightColors = {
  background: '#FFFFFF',
  surface: '#F8F6F2',
  primary: '#CFB991',
  action: '#DAAA00',
  textPrimary: '#000000',
  textSecondary: '#4A4A4A',
  border: '#C8C9C7',
  cardBorder: '#E5E3DF',
  white: '#FFFFFF',
  black: '#000000',
  error: '#D32F2F',
  ivorySurface: '#F8F6F2',
  ivorySurfaceWarm: '#F0EBE0',
  shelfGold: '#DAAA00',
  shelfGoldShade: '#9C7A00',
} as const;

export const darkColors = {
  background: '#0D0D0D',
  surface: '#1A1A1A',
  primary: '#CFB991',
  action: '#DAAA00',
  textPrimary: '#F0EDE7',
  textSecondary: '#A0A0A0',
  border: '#333333',
  cardBorder: '#333333',
  white: '#FFFFFF',
  black: '#000000',
  error: '#EF5350',
  ivorySurface: '#1A1713',
  ivorySurfaceWarm: '#221D16',
  shelfGold: '#B08A00',
  shelfGoldShade: '#6E5600',
} as const;

export type ColorTokens = {
  [K in keyof typeof lightColors]: string;
};

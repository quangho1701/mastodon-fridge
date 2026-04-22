import { Platform, ViewStyle } from 'react-native';

/**
 * Shadow system from DESIGN.md:
 *   - Light mode: soft realistic drop shadows
 *   - Dark mode: border only (no shadows)
 *
 * Fridge-surface shadows use a cool shadow color (#0A1620) rather than
 * pure black so they read correctly against stainless steel.
 */

const COOL_SHADOW = '#0A1620';

export function cardShadow(isDark: boolean): ViewStyle {
  if (isDark) {
    return {
      borderWidth: 1,
      borderColor: '#333333',
    };
  }

  return Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 3,
    },
    android: {
      elevation: 2,
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 3,
    },
  }) as ViewStyle;
}

export function magnetShadow(isDark: boolean): ViewStyle {
  if (isDark) {
    return {
      borderWidth: 1,
      borderColor: '#333333',
    };
  }

  return Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    android: {
      elevation: 4,
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
  }) as ViewStyle;
}

export function polaroidShadow(isDark: boolean): ViewStyle {
  if (isDark) {
    return { borderWidth: 1, borderColor: '#333333' };
  }
  return Platform.select({
    ios: {
      shadowColor: COOL_SHADOW,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.22,
      shadowRadius: 10,
    },
    android: { elevation: 8 },
    default: {
      shadowColor: COOL_SHADOW,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.22,
      shadowRadius: 10,
    },
  }) as ViewStyle;
}

export function noteShadow(isDark: boolean): ViewStyle {
  if (isDark) {
    return { borderWidth: 1, borderColor: '#333333' };
  }
  return Platform.select({
    ios: {
      shadowColor: COOL_SHADOW,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.18,
      shadowRadius: 5,
    },
    android: { elevation: 5 },
    default: {
      shadowColor: COOL_SHADOW,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.18,
      shadowRadius: 5,
    },
  }) as ViewStyle;
}

export function stickerShadow(isDark: boolean): ViewStyle {
  if (isDark) {
    return {};
  }
  return Platform.select({
    ios: {
      shadowColor: COOL_SHADOW,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.18,
      shadowRadius: 3,
    },
    android: { elevation: 3 },
    default: {
      shadowColor: COOL_SHADOW,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.18,
      shadowRadius: 3,
    },
  }) as ViewStyle;
}

export function flyerPinnedShadow(isDark: boolean): ViewStyle {
  if (isDark) {
    return { borderWidth: 1, borderColor: '#333333' };
  }
  return Platform.select({
    ios: {
      shadowColor: COOL_SHADOW,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    android: { elevation: 7 },
    default: {
      shadowColor: COOL_SHADOW,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
  }) as ViewStyle;
}

export function magnetShadowSmall(isDark: boolean): ViewStyle {
  if (isDark) {
    return {};
  }
  return Platform.select({
    ios: {
      shadowColor: COOL_SHADOW,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.22,
      shadowRadius: 3,
    },
    android: { elevation: 4 },
    default: {
      shadowColor: COOL_SHADOW,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.22,
      shadowRadius: 3,
    },
  }) as ViewStyle;
}

import { Platform, ViewStyle } from 'react-native';

/**
 * Shadow system from DESIGN.md:
 *   - Light mode: soft realistic drop shadows
 *   - Dark mode: border only (no shadows)
 */

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

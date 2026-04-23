import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

interface ShelfDividerProps {
  variant?: 'gold' | 'hairline';
  inset?: number;
  style?: ViewStyle;
}

/**
 * Horizontal fridge shelf. 'gold' is a chunky Summit-Gold bar with a
 * highlight stripe and undershadow, evoking a metal rail. 'hairline'
 * is a 1px neutral rule for lighter section breaks.
 */
export default function ShelfDivider({
  variant = 'gold',
  inset = 0,
  style,
}: ShelfDividerProps) {
  const { theme } = useTheme();

  if (variant === 'hairline') {
    return (
      <View
        style={[
          styles.hairline,
          { backgroundColor: theme.colors.border, marginHorizontal: inset },
          style,
        ]}
      />
    );
  }

  const gold = theme.colors.shelfGold;
  const goldShade = theme.colors.shelfGoldShade;

  return (
    <View
      style={[styles.wrap, { marginHorizontal: inset }, style]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View style={[styles.bar, { backgroundColor: gold }]}>
        <View style={styles.highlight} />
        <View style={[styles.shade, { backgroundColor: goldShade }]} />
      </View>
      <View style={styles.undershadow} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginVertical: 8,
  },
  bar: {
    height: 8,
    borderRadius: 2,
    overflow: 'hidden',
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
  shade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    opacity: 0.55,
  },
  undershadow: {
    height: 6,
    marginTop: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    opacity: 0.6,
  },
  hairline: {
    height: 1,
    marginVertical: 10,
  },
});

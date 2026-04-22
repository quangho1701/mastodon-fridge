import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

interface StickyNoteProps {
  text: string;
  color?: string;
  rotation?: number;
  style?: ViewStyle;
}

const STICKY_YELLOW = '#FFF9C4';

/**
 * Sticky note from DESIGN.md:
 * Yellow background, slight bottom-edge curl effect,
 * handwritten-style text. Used on the fridge surface.
 */
export default function StickyNote({
  text,
  color = STICKY_YELLOW,
  rotation = 0,
  style,
}: StickyNoteProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.note,
        {
          backgroundColor: color,
          transform: [{ rotate: `${rotation}deg` }],
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: theme.colors.black }]}>
        {text}
      </Text>
      {/* Bottom curl accent */}
      <View
        style={[
          styles.curl,
          { backgroundColor: darken(color, 0.08) },
        ]}
      />
    </View>
  );
}

/** Simple hex darkener for the curl effect */
function darken(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, ((num >> 16) & 0xff) - Math.round(255 * amount));
  const g = Math.max(0, ((num >> 8) & 0xff) - Math.round(255 * amount));
  const b = Math.max(0, (num & 0xff) - Math.round(255 * amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

const styles = StyleSheet.create({
  note: {
    width: 120,
    minHeight: 100,
    padding: 12,
    borderRadius: 2,
    position: 'relative',
  },
  text: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  curl: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 6,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 12,
  },
});

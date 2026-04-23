import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

interface LetterMagnetProps {
  letter: string;
  color: string;
  size?: number;
}

/**
 * Chunky colored letter magnet (think alphabet fridge magnets).
 * Single glyph on a rounded tile with a top highlight and bottom shade
 * for cheap 3D. Wrap in `PinnedItem shadowVariant="magnetSmall"` for
 * rotation + drop shadow; this component is the visual body only.
 */
export default function LetterMagnet({
  letter,
  color,
  size = 40,
}: LetterMagnetProps) {
  const tile = {
    width: size,
    height: size,
    borderRadius: Math.round(size * 0.22),
    backgroundColor: color,
  };
  const fontSize = Math.round(size * 0.72);

  return (
    <View style={[styles.tile, tile]} accessible accessibilityLabel={letter}>
      <View style={styles.highlight} pointerEvents="none" />
      <View style={styles.shade} pointerEvents="none" />
      <Text style={[styles.letter, { fontSize }]}>{letter.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
    backgroundColor: 'rgba(255,255,255,0.30)',
  },
  shade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '35%',
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
  letter: {
    color: '#FFFFFF',
    fontWeight: '900',
    ...Platform.select({
      ios: { fontFamily: 'Arial Rounded MT Bold' },
      android: { fontFamily: 'sans-serif-black' },
      default: {},
    }),
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
    includeFontPadding: false,
  },
});

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StickerProps {
  icon: keyof typeof Ionicons.glyphMap;
  fillColor: string;
  iconColor?: string;
  shape?: 'round' | 'rounded';
  size?: number;
}

/**
 * Cut-out sticker: a colored disk or rounded-square with an Ionicon on
 * top. Thin inset border + top-left highlight strip imply printed paper.
 */
export default function Sticker({
  icon,
  fillColor,
  iconColor = '#FFFFFF',
  shape = 'round',
  size = 56,
}: StickerProps) {
  const radius = shape === 'round' ? size / 2 : 10;
  const iconSize = Math.round(size * 0.56);

  return (
    <View
      style={[
        styles.body,
        {
          width: size,
          height: size,
          borderRadius: radius,
          backgroundColor: fillColor,
        },
      ]}
    >
      <Ionicons name={icon} size={iconSize} color={iconColor} />
      <View
        pointerEvents="none"
        style={[
          styles.highlight,
          {
            top: size * 0.12,
            left: size * 0.18,
            width: size * 0.35,
            borderRadius: 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  highlight: {
    position: 'absolute',
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
});

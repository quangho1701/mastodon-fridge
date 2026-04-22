import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { useTheme } from '../theme';

interface BrushedBackdropProps {
  style?: ViewStyle;
}

/**
 * Full-bleed "minimalist white fridge finish": a base surface color
 * with a faint vertical brushed-metal grain overlay. Non-interactive.
 */
export default function BrushedBackdrop({ style }: BrushedBackdropProps) {
  const { theme } = useTheme();
  const baseColor = theme.dark ? theme.colors.background : theme.colors.surface;
  const strokeColor = theme.dark ? '#FFFFFF' : '#000000';
  const strokeOpacity = theme.dark ? 0.035 : 0.04;

  const strokeCount = 36;

  return (
    <View
      pointerEvents="none"
      style={[styles.fill, { backgroundColor: baseColor }, style]}
    >
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {Array.from({ length: strokeCount }).map((_, i) => {
          const x = (i + 0.5) * (100 / strokeCount);
          return (
            <Line
              key={i}
              x1={x}
              y1={0}
              x2={x}
              y2={100}
              stroke={strokeColor}
              strokeOpacity={strokeOpacity}
              strokeWidth={0.25}
            />
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    ...StyleSheet.absoluteFillObject,
  },
});

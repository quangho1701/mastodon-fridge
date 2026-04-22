import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import BrushedBackdrop from './BrushedBackdrop';
import { useTheme } from '../theme';

interface FridgeSurfaceProps {
  style?: ViewStyle;
}

/**
 * Full-bleed stainless steel fridge door: cool-steel base tint, the
 * existing BrushedBackdrop vertical grain, a top-light highlight, and
 * a bottom vignette. Non-interactive — consumer renders content on top.
 */
export default function FridgeSurface({ style }: FridgeSurfaceProps) {
  const { theme } = useTheme();
  const baseColor = theme.dark ? '#1F2124' : '#C9CCCE';
  const highlightOpacity = theme.dark ? 0.04 : 0.12;
  const vignetteOpacity = theme.dark ? 0.35 : 0.12;

  return (
    <View
      pointerEvents="none"
      style={[styles.fill, { backgroundColor: baseColor }, style]}
    >
      <BrushedBackdrop style={{ backgroundColor: 'transparent' }} />
      <Svg
        style={StyleSheet.absoluteFill}
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <Defs>
          <LinearGradient id="topGlow" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity={highlightOpacity} />
            <Stop offset="0.35" stopColor="#FFFFFF" stopOpacity={0} />
          </LinearGradient>
          <LinearGradient id="bottomVignette" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0.65" stopColor="#000000" stopOpacity={0} />
            <Stop offset="1" stopColor="#000000" stopOpacity={vignetteOpacity} />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={100} height={100} fill="url(#topGlow)" />
        <Rect x={0} y={0} width={100} height={100} fill="url(#bottomVignette)" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    ...StyleSheet.absoluteFillObject,
  },
});

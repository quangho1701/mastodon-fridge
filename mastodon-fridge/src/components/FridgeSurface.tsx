import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import BrushedBackdrop from './BrushedBackdrop';
import { useTheme } from '../theme';

export type FridgeSurfaceTone = 'steel' | 'ivory';

interface FridgeSurfaceProps {
  style?: ViewStyle;
  tone?: FridgeSurfaceTone;
}

/**
 * Full-bleed fridge door background. Two tones:
 *   - 'steel'  → brushed stainless with cool vignette (default)
 *   - 'ivory'  → warm ivory gradient, softer highlight, no brushed grain
 */
export default function FridgeSurface({ style, tone = 'steel' }: FridgeSurfaceProps) {
  const { theme } = useTheme();

  if (tone === 'ivory') {
    return <IvorySurface style={style} isDark={theme.dark} />;
  }
  return <SteelSurface style={style} isDark={theme.dark} />;
}

function SteelSurface({ style, isDark }: { style?: ViewStyle; isDark: boolean }) {
  const baseColor = isDark ? '#1F2124' : '#C9CCCE';
  const highlightOpacity = isDark ? 0.04 : 0.12;
  const vignetteOpacity = isDark ? 0.35 : 0.12;

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

function IvorySurface({ style, isDark }: { style?: ViewStyle; isDark: boolean }) {
  // Warm ivory in light, warm charcoal in dark. Subtle vertical gradient
  // gives "Indiana morning" warmth without the stainless-steel grain.
  const topColor = isDark ? '#221D16' : '#FBF8F3';
  const midColor = isDark ? '#1A1713' : '#F5EFE4';
  const bottomColor = isDark ? '#14110D' : '#EEE6D6';
  const highlightOpacity = isDark ? 0.03 : 0.5;
  const vignetteOpacity = isDark ? 0.4 : 0.08;

  return (
    <View
      pointerEvents="none"
      style={[styles.fill, { backgroundColor: midColor }, style]}
    >
      <Svg
        style={StyleSheet.absoluteFill}
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <Defs>
          <LinearGradient id="ivoryBase" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={topColor} stopOpacity={1} />
            <Stop offset="0.5" stopColor={midColor} stopOpacity={1} />
            <Stop offset="1" stopColor={bottomColor} stopOpacity={1} />
          </LinearGradient>
          <LinearGradient id="ivoryTop" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity={highlightOpacity} />
            <Stop offset="0.25" stopColor="#FFFFFF" stopOpacity={0} />
          </LinearGradient>
          <LinearGradient id="ivoryBottom" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0.7" stopColor="#000000" stopOpacity={0} />
            <Stop offset="1" stopColor="#000000" stopOpacity={vignetteOpacity} />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={100} height={100} fill="url(#ivoryBase)" />
        <Rect x={0} y={0} width={100} height={100} fill="url(#ivoryTop)" />
        <Rect x={0} y={0} width={100} height={100} fill="url(#ivoryBottom)" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    ...StyleSheet.absoluteFillObject,
  },
});

import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, Stop } from 'react-native-svg';
import { useTheme } from '../theme';
import { magnetShadowSmall } from '../theme/shadows';

interface MagnetProps {
  variant: 'heart' | 'gold';
  size?: number;
  style?: ViewStyle;
}

/**
 * Small 3D magnet for pinning items to the fridge. Distinct from
 * MastodonMagnet (which is the hero logo on EntryScreen).
 */
export default function Magnet({ variant, size = 28, style }: MagnetProps) {
  const { theme } = useTheme();

  return (
    <View style={[{ width: size, height: size }, magnetShadowSmall(theme.dark), style]}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Defs>
          <LinearGradient id={`${variant}-disc`} x1="0" y1="0" x2="0" y2="1">
            <Stop
              offset="0"
              stopColor={variant === 'heart' ? '#EF5350' : '#E8C53E'}
            />
            <Stop
              offset="1"
              stopColor={variant === 'heart' ? '#B71C1C' : '#B8900A'}
            />
          </LinearGradient>
        </Defs>

        <Circle cx={50} cy={50} r={48} fill={`url(#${variant}-disc)`} />

        {variant === 'heart' && (
          <Path
            d="M50 72 C 30 58, 24 44, 34 34 C 42 26, 50 34, 50 40 C 50 34, 58 26, 66 34 C 76 44, 70 58, 50 72 Z"
            fill="#FFFFFF"
          />
        )}

        <Ellipse cx={36} cy={30} rx={18} ry={8} fill="#FFFFFF" opacity={0.28} />
      </Svg>
    </View>
  );
}

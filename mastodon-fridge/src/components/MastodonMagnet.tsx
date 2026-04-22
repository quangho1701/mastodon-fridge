import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';
import { useTheme } from '../theme';
import { magnetShadow } from '../theme/shadows';

interface MastodonMagnetProps {
  size?: number;
  style?: ViewStyle;
}

/**
 * Hero logo for the Entry screen: a 3D-style circular magnet
 * with a black mastodon silhouette. Summit Gold disc, Golden bezel,
 * top-left highlight for tactile sheen.
 */
export default function MastodonMagnet({
  size = 160,
  style,
}: MastodonMagnetProps) {
  const { theme } = useTheme();
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2;
  const bezelR = outerR * 0.88;
  const innerR = outerR * 0.72;

  return (
    <View style={[{ width: size, height: size }, magnetShadow(theme.dark), style]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <LinearGradient id="discGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#E8C53E" />
            <Stop offset="1" stopColor="#B8900A" />
          </LinearGradient>
          <LinearGradient id="bezelGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#DCC9A1" />
            <Stop offset="1" stopColor="#A8926A" />
          </LinearGradient>
        </Defs>

        <Circle cx={cx} cy={cy} r={outerR} fill="url(#discGrad)" />
        <Circle cx={cx} cy={cy} r={bezelR} fill="url(#bezelGrad)" />
        <Circle cx={cx} cy={cy} r={innerR} fill="#0D0D0D" />

        <MastodonSilhouette cx={cx} cy={cy} r={innerR} />

        <Ellipse
          cx={cx - outerR * 0.28}
          cy={cy - outerR * 0.42}
          rx={outerR * 0.38}
          ry={outerR * 0.18}
          fill="#FFFFFF"
          opacity={0.22}
        />
      </Svg>
    </View>
  );
}

/**
 * Stylized mastodon profile, facing right. Drawn as a single filled
 * path scaled to fit inside a circle of radius `r` centered at (cx, cy).
 * The silhouette reads as: dome head → forward-curving trunk → tusk →
 * rounded back/body.
 */
function MastodonSilhouette({
  cx,
  cy,
  r,
}: {
  cx: number;
  cy: number;
  r: number;
}) {
  const s = r * 0.78;
  const baseX = cx - s * 0.55;
  const baseY = cy + s * 0.35;

  const p = (dx: number, dy: number) => `${baseX + dx * s},${baseY - dy * s}`;

  const body = [
    `M ${p(0.05, 0.0)}`,
    `C ${p(0.0, 0.15)} ${p(0.05, 0.45)} ${p(0.18, 0.6)}`,
    `C ${p(0.22, 0.78)} ${p(0.35, 0.92)} ${p(0.55, 0.92)}`,
    `C ${p(0.75, 0.92)} ${p(0.88, 0.78)} ${p(0.92, 0.6)}`,
    `C ${p(1.0, 0.45)} ${p(1.05, 0.2)} ${p(1.0, 0.05)}`,
    `L ${p(0.9, 0.0)}`,
    `L ${p(0.86, 0.15)}`,
    `C ${p(0.8, 0.35)} ${p(0.78, 0.45)} ${p(0.72, 0.4)}`,
    `C ${p(0.7, 0.32)} ${p(0.72, 0.2)} ${p(0.62, 0.15)}`,
    `L ${p(0.5, 0.1)}`,
    `C ${p(0.42, 0.08)} ${p(0.4, 0.12)} ${p(0.38, 0.2)}`,
    `C ${p(0.34, 0.3)} ${p(0.28, 0.3)} ${p(0.22, 0.22)}`,
    `L ${p(0.12, 0.08)}`,
    `Z`,
  ].join(' ');

  const tusk = [
    `M ${p(0.42, 0.08)}`,
    `C ${p(0.36, 0.02)} ${p(0.34, -0.04)} ${p(0.32, -0.08)}`,
    `L ${p(0.38, -0.06)}`,
    `C ${p(0.42, -0.02)} ${p(0.44, 0.02)} ${p(0.46, 0.06)}`,
    `Z`,
  ].join(' ');

  return (
    <>
      <Path d={body} fill="#F0EDE7" />
      <Path d={tusk} fill="#FFFFFF" />
      <Circle cx={baseX + 0.78 * s} cy={baseY - 0.55 * s} r={s * 0.04} fill="#0D0D0D" />
    </>
  );
}

import React, { useEffect, useMemo, useState } from 'react';
import {
  AccessibilityInfo,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme';
import {
  flyerPinnedShadow,
  noteShadow,
  polaroidShadow,
  stickerShadow,
  magnetShadowSmall,
} from '../theme/shadows';
import Magnet from './Magnet';

export type ShadowVariant =
  | 'polaroid'
  | 'note'
  | 'sticker'
  | 'flyer'
  | 'magnetSmall';

interface PinnedItemProps {
  rotation?: number;
  shadowVariant: ShadowVariant;
  topMagnet?: 'heart' | 'gold' | 'none';
  magnetSize?: number;
  magnetOffsetY?: number;
  onPress?: () => void;
  accessibilityLabel?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

/**
 * Universal wrapper for anything pinned to the fridge. Applies a
 * rotation, a shadow variant, and an optional small magnet that
 * overlaps the top of the child. If `onPress` is set, wraps in a
 * Pressable with a rotate-preserving press scale.
 */
export default function PinnedItem({
  rotation = 0,
  shadowVariant,
  topMagnet = 'none',
  magnetSize = 28,
  magnetOffsetY = -14,
  onPress,
  accessibilityLabel,
  children,
  style,
}: PinnedItemProps) {
  const { theme } = useTheme();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (!cancelled) setReduceMotion(enabled);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const shadowStyle = useMemo<ViewStyle>(() => {
    const isDark = theme.dark;
    switch (shadowVariant) {
      case 'polaroid':
        return polaroidShadow(isDark);
      case 'note':
        return noteShadow(isDark);
      case 'sticker':
        return stickerShadow(isDark);
      case 'flyer':
        return flyerPinnedShadow(isDark);
      case 'magnetSmall':
        return magnetShadowSmall(isDark);
    }
  }, [theme.dark, shadowVariant]);

  const baseTransform: ViewStyle['transform'] = [{ rotate: `${rotation}deg` }];

  const content = (
    <View style={styles.inner}>
      {children}
      {topMagnet !== 'none' && (
        <View
          pointerEvents="none"
          style={[
            styles.magnet,
            {
              top: magnetOffsetY,
              width: magnetSize,
              marginLeft: -magnetSize / 2,
            },
          ]}
        >
          <Magnet variant={topMagnet} size={magnetSize} />
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={({ pressed }) => [
          styles.wrapper,
          shadowStyle,
          {
            transform:
              pressed && !reduceMotion
                ? [{ rotate: `${rotation}deg` }, { scale: 0.97 }]
                : baseTransform,
          },
          style,
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      style={[styles.wrapper, shadowStyle, { transform: baseTransform }, style]}
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'visible',
  },
  inner: {
    overflow: 'visible',
  },
  magnet: {
    position: 'absolute',
    left: '50%',
  },
});

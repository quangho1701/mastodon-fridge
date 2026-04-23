import React, { useEffect, useRef } from 'react';
import { AccessibilityInfo, Animated, StyleSheet, Text } from 'react-native';
import { useTheme, cardShadow } from '../../theme';
import { TAB_BAR_CLEARANCE } from '../../navigation/CustomTabBar';

interface MarketToastProps {
  visible: boolean;
  message: string;
  onHide: () => void;
}

const HOLD_MS = 1800;
const FADE_MS = 300;

export default function MarketToast({
  visible,
  message,
  onHide,
}: MarketToastProps) {
  const { theme } = useTheme();
  const translateY = useRef(new Animated.Value(40)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then(v => {
      if (mounted) reduceMotion.current = v;
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    if (hideTimer.current) clearTimeout(hideTimer.current);

    const reduced = reduceMotion.current;
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: reduced ? 120 : FADE_MS,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: reduced ? 0 : FADE_MS,
        useNativeDriver: true,
      }),
    ]).start();

    hideTimer.current = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: reduced ? 120 : FADE_MS,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: reduced ? 0 : 40,
          duration: reduced ? 0 : FADE_MS,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide();
      });
    }, HOLD_MS);

    return () => {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
    };
  }, [visible, message, opacity, translateY, onHide]);

  if (!visible) return null;

  return (
    <Animated.View
      pointerEvents="none"
      accessibilityLiveRegion="polite"
      style={[
        styles.container,
        cardShadow(theme.dark),
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.action,
          opacity,
          transform: [{ translateY }],
          bottom: TAB_BAR_CLEARANCE + 16,
        },
      ]}
    >
      <Text
        selectable={false}
        style={[
          theme.typography.body,
          { color: theme.colors.textPrimary, textAlign: 'center' },
        ]}
      >
        {message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 24,
    right: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
});

import React, { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme';

export const SCANNER_FRAME_WIDTH = 280;
export const SCANNER_FRAME_HEIGHT = 380;

const BRACKET_ARM = 28;
const BRACKET_THICKNESS = 3;

export default function ScannerFrame() {
  const { theme } = useTheme();
  const pulse = useRef(new Animated.Value(1)).current;
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

  useEffect(() => {
    if (reduceMotion) {
      pulse.setValue(1);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.6,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse, reduceMotion]);

  const gold = theme.colors.action;

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.frame, { opacity: pulse }]}
    >
      <View style={[styles.corner, styles.topLeft, cornerStyles(gold).horizontal]} />
      <View style={[styles.corner, styles.topLeft, cornerStyles(gold).vertical]} />
      <View style={[styles.corner, styles.topRight, cornerStyles(gold).horizontalRight]} />
      <View style={[styles.corner, styles.topRight, cornerStyles(gold).vertical]} />
      <View style={[styles.corner, styles.bottomLeft, cornerStyles(gold).horizontal]} />
      <View style={[styles.corner, styles.bottomLeft, cornerStyles(gold).verticalBottom]} />
      <View style={[styles.corner, styles.bottomRight, cornerStyles(gold).horizontalRight]} />
      <View style={[styles.corner, styles.bottomRight, cornerStyles(gold).verticalBottom]} />
    </Animated.View>
  );
}

const cornerStyles = (color: string) => ({
  horizontal: {
    width: BRACKET_ARM,
    height: BRACKET_THICKNESS,
    backgroundColor: color,
  },
  horizontalRight: {
    width: BRACKET_ARM,
    height: BRACKET_THICKNESS,
    backgroundColor: color,
    right: 0,
  },
  vertical: {
    width: BRACKET_THICKNESS,
    height: BRACKET_ARM,
    backgroundColor: color,
  },
  verticalBottom: {
    width: BRACKET_THICKNESS,
    height: BRACKET_ARM,
    backgroundColor: color,
    bottom: 0,
  },
});

const styles = StyleSheet.create({
  frame: {
    width: SCANNER_FRAME_WIDTH,
    height: SCANNER_FRAME_HEIGHT,
  },
  corner: {
    position: 'absolute',
  },
  topLeft: {
    top: 0,
    left: 0,
  },
  topRight: {
    top: 0,
    right: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
  },
});

import React, { useEffect, useRef } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Magnet from '../Magnet';

interface QuickPinButtonProps {
  pinned: boolean;
  title: string;
  onPress: () => void;
}

export default function QuickPinButton({
  pinned,
  title,
  onPress,
}: QuickPinButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(pinned ? 1 : 0.7)).current;
  const reduceMotion = useRef(false);
  const prevPinned = useRef(pinned);

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
    if (prevPinned.current === pinned) return;
    prevPinned.current = pinned;

    if (reduceMotion.current) {
      Animated.timing(opacity, {
        toValue: pinned ? 1 : 0.7,
        duration: 150,
        useNativeDriver: true,
      }).start();
      return;
    }

    Animated.parallel([
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.18,
          duration: 180,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          speed: 18,
          bounciness: 8,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(opacity, {
        toValue: pinned ? 1 : 0.7,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [pinned, scale, opacity]);

  const onPressIn = () => {
    if (reduceMotion.current) return;
    Animated.spring(scale, {
      toValue: 0.92,
      speed: 24,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    if (reduceMotion.current) return;
    Animated.spring(scale, {
      toValue: 1,
      speed: 20,
      bounciness: 6,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessibilityRole="button"
        accessibilityLabel={
          pinned ? `Unpin ${title}` : `Pin ${title} to your fridge`
        }
        accessibilityState={{ selected: pinned }}
        style={styles.pressable}
      >
        <Animated.View style={{ transform: [{ scale }], opacity }}>
          <Magnet variant="gold" size={28} />
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 5,
  },
  pressable: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

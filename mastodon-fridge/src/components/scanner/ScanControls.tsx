import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';

interface ScanControlsProps {
  flashOn: boolean;
  onGallery: () => void;
  onShutter: () => void;
  onFlashToggle: () => void;
  disabled?: boolean;
}

export default function ScanControls({
  flashOn,
  onGallery,
  onShutter,
  onFlashToggle,
  disabled = false,
}: ScanControlsProps) {
  const { theme } = useTheme();
  const shutterScale = useRef(new Animated.Value(1)).current;

  const pressInShutter = () => {
    Animated.spring(shutterScale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 40,
    }).start();
  };
  const pressOutShutter = () => {
    Animated.spring(shutterScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
    }).start();
  };

  const pillBg = 'rgba(255, 255, 255, 0.18)';
  const pillBorder = 'rgba(255, 255, 255, 0.35)';

  return (
    <View style={styles.row}>
      <Pressable
        onPress={onGallery}
        disabled={disabled}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Upload flyer from gallery"
        style={({ pressed }) => [
          styles.pill,
          {
            backgroundColor: pillBg,
            borderColor: pillBorder,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <Ionicons name="images" size={24} color={theme.colors.white} />
      </Pressable>

      <Pressable
        onPress={onShutter}
        onPressIn={pressInShutter}
        onPressOut={pressOutShutter}
        disabled={disabled}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Scan flyer"
        style={styles.shutterWrapper}
      >
        <Animated.View
          style={[
            styles.shutterRing,
            {
              borderColor: theme.colors.action,
              transform: [{ scale: shutterScale }],
            },
          ]}
        >
          <View
            style={[
              styles.shutterInner,
              { backgroundColor: theme.colors.white },
            ]}
          />
        </Animated.View>
      </Pressable>

      <Pressable
        onPress={onFlashToggle}
        disabled={disabled}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={flashOn ? 'Turn flash off' : 'Turn flash on'}
        accessibilityState={{ selected: flashOn }}
        style={({ pressed }) => [
          styles.pill,
          {
            backgroundColor: flashOn ? theme.colors.action : pillBg,
            borderColor: flashOn ? theme.colors.action : pillBorder,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <Ionicons
          name={flashOn ? 'flash' : 'flash-off'}
          size={22}
          color={flashOn ? theme.colors.black : theme.colors.white}
        />
      </Pressable>
    </View>
  );
}

const PILL_SIZE = 56;
const SHUTTER_SIZE = 72;
const SHUTTER_INNER = 60;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  pill: {
    width: PILL_SIZE,
    height: PILL_SIZE,
    borderRadius: PILL_SIZE / 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterWrapper: {
    width: SHUTTER_SIZE,
    height: SHUTTER_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterRing: {
    width: SHUTTER_SIZE,
    height: SHUTTER_SIZE,
    borderRadius: SHUTTER_SIZE / 2,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: SHUTTER_INNER,
    height: SHUTTER_INNER,
    borderRadius: SHUTTER_INNER / 2,
  },
});

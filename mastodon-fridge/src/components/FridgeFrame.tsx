import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import FridgeSurface from './FridgeSurface';
import { useTheme } from '../theme';

const ROOM_MARGIN = 10;
const FRAME_BORDER = 5;
const FRAME_RADIUS = 18;

interface FridgeFrameProps {
  children: React.ReactNode;
}

/**
 * Shared room/wall + steel-bordered fridge door + ivory surface wrapper.
 * Used by FridgeScreen (personal fridge) and EventGalleryScreen (per-event fridge)
 * so both screens read as the same physical fridge object.
 */
export default function FridgeFrame({ children }: FridgeFrameProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const roomColor = theme.dark ? '#111010' : '#C2B9AE';
  const borderColor = theme.dark ? '#4A4A4A' : '#9EA0A2';

  return (
    <View style={[styles.room, { backgroundColor: roomColor }]}>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />

      <View
        style={[
          styles.fridgeFrame,
          { marginTop: insets.top, borderColor },
        ]}
      >
        <FridgeSurface tone="ivory" />

        <View style={styles.frameHighlight} pointerEvents="none" />

        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  room: {
    flex: 1,
  },
  fridgeFrame: {
    flex: 1,
    marginHorizontal: ROOM_MARGIN,
    borderWidth: FRAME_BORDER,
    borderRadius: FRAME_RADIUS,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 10,
  },
  frameHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.35)',
    zIndex: 99,
  },
});

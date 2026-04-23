import React from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { FridgeShelves, FridgeSurface } from '../components';
import { TAB_BAR_CLEARANCE } from '../navigation/CustomTabBar';
import { fridgeLayout } from '../data/fridgeSeed';
import { useTheme } from '../theme';

/** Horizontal room margin — how much wall shows on each side. */
const ROOM_MARGIN = 10;
/** Fridge door border width. */
const FRAME_BORDER = 5;
/** Fridge door corner radius. */
const FRAME_RADIUS = 18;

export default function FridgeScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const handleItemPress = (id: string) => {
    Alert.alert(
      'Event',
      `Would open event ${id} (Screen 6 — not built yet).`,
    );
  };

  // Room/wall color — warm concrete, contrasts with the ivory fridge door
  const roomColor = theme.dark ? '#111010' : '#C2B9AE';
  // Steel border — cool gray edge that reads as a metal fridge body
  const borderColor = theme.dark ? '#4A4A4A' : '#9EA0A2';

  return (
    <View style={[styles.room, { backgroundColor: roomColor }]}>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />

      {/* Fridge door frame — inset from screen edges */}
      <View
        style={[
          styles.fridgeFrame,
          {
            marginTop: insets.top,
            marginBottom: 0,
            borderColor,
          },
        ]}
      >
        {/* Ivory surface fills inside the frame */}
        <FridgeSurface tone="ivory" />

        {/* Steel top-edge highlight strip */}
        <View
          style={styles.frameHighlight}
          pointerEvents="none"
        />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: TAB_BAR_CLEARANCE + 8 },
          ]}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
        >
          <FridgeShelves layout={fridgeLayout} onItemPress={handleItemPress} />
        </ScrollView>
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
    // Subtle top-facing shadow so the door looks lifted off the wall
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
});

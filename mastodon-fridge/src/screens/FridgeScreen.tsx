import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { FridgeFrame, FridgeShelves } from '../components';
import {
  DraggableSticker,
  FridgeStickerLayer,
  PlacementBar,
} from '../components/fridge';
import { TAB_BAR_CLEARANCE } from '../navigation/CustomTabBar';
import { fridgeLayout } from '../data/fridgeSeed';
import { STICKER_SIZE, useFridge } from '../context/FridgeContext';

export default function FridgeScreen() {
  const { placed, draft, commitPlacement, cancelPlacement } = useFridge();
  const [door, setDoor] = useState({ width: 0, height: 0 });
  // Latest ghost position (door fractions); updated by DraggableSticker without
  // triggering re-renders, then read when the user taps "Pin it here".
  const draftPos = useRef({ xPct: 0.5, yPct: 0.5 });
  // Current vertical scroll offset, used to convert a viewport drop point into
  // an absolute content position so the pin stays glued to the fridge.
  const scrollY = useRef(0);

  const isPlacing = draft !== null && door.width > 0 && door.height > 0;

  const handleItemPress = (id: string) => {
    Alert.alert(
      'Event',
      `Would open event ${id} (Screen 6 — not built yet).`,
    );
  };

  const handleDoorLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width !== door.width || height !== door.height) {
      setDoor({ width, height });
    }
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.current = e.nativeEvent.contentOffset.y;
  };

  const handlePositionChange = useCallback((xPct: number, yPct: number) => {
    draftPos.current = { xPct, yPct };
  }, []);

  const handlePin = useCallback(() => {
    // Bake the current scroll offset into the Y so the sticker anchors to the
    // content (the fridge surface), not to the viewport.
    const y = draftPos.current.yPct * door.height + scrollY.current;
    commitPlacement(draftPos.current.xPct, y);
  }, [commitPlacement, door.height]);

  return (
    <FridgeFrame>
      <View style={styles.door} onLayout={handleDoorLayout}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ paddingBottom: TAB_BAR_CLEARANCE + 8 }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={!isPlacing}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          removeClippedSubviews
        >
          <View style={styles.content}>
            <View style={styles.shelvesWrap}>
              <FridgeShelves
                layout={fridgeLayout}
                onItemPress={handleItemPress}
              />
            </View>

            <FridgeStickerLayer items={placed} width={door.width} />
          </View>
        </ScrollView>

        {isPlacing && draft && (
          <>
            <DraggableSticker
              key={draft.sourceTitle + placed.length}
              selection={draft.selection}
              size={STICKER_SIZE}
              doorWidth={door.width}
              doorHeight={door.height}
              onPositionChange={handlePositionChange}
            />

            <View
              style={[styles.placementBar, { bottom: TAB_BAR_CLEARANCE + 8 }]}
              pointerEvents="box-none"
            >
              <PlacementBar
                title={draft.sourceTitle}
                onPin={handlePin}
                onCancel={cancelPlacement}
              />
            </View>
          </>
        )}
      </View>
    </FridgeFrame>
  );
}

const styles = StyleSheet.create({
  door: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    position: 'relative',
  },
  shelvesWrap: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  placementBar: {
    position: 'absolute',
    left: 12,
    right: 12,
  },
});

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  PlacementControls,
} from '../components/fridge';
import { TAB_BAR_CLEARANCE } from '../navigation/CustomTabBar';
import { fridgeLayout } from '../data/fridgeSeed';
import {
  STICKER_SIZE,
  useFridge,
  type PlacedSticker,
} from '../context/FridgeContext';

export default function FridgeScreen() {
  const { placed, draft, commitPlacement, cancelPlacement, beginReposition } =
    useFridge();
  const [door, setDoor] = useState({ width: 0, height: 0 });
  // Latest ghost position (door fractions); updated by DraggableSticker without
  // triggering re-renders, then read when the user taps the confirm control.
  const draftPos = useRef({ xPct: 0.5, yPct: 0.5 });
  // Current vertical scroll offset, used to convert a viewport drop point into
  // an absolute content position so the pin stays glued to the fridge.
  const scrollY = useRef(0);

  const itemBeingMoved = useMemo((): PlacedSticker | undefined => {
    if (!draft?.repositionOfId) return undefined;
    return placed.find((p) => p.id === draft.repositionOfId);
  }, [draft?.repositionOfId, placed]);

  const ghostInitialTopLeft = useMemo(() => {
    if (!itemBeingMoved || door.width <= 0 || door.height <= 0) return undefined;
    const sz = itemBeingMoved.size;
    const maxX = Math.max(0, door.width - sz);
    const maxY = Math.max(0, door.height - sz);
    const left = itemBeingMoved.xPct * door.width - sz / 2;
    const top = itemBeingMoved.y - scrollY.current - sz / 2;
    return {
      x: Math.min(Math.max(0, left), maxX),
      y: Math.min(Math.max(0, top), maxY),
    };
  }, [itemBeingMoved, door.width, door.height]);

  useEffect(() => {
    if (!draft?.repositionOfId || door.height <= 0) return;
    const p = placed.find((x) => x.id === draft.repositionOfId);
    if (!p) return;
    draftPos.current = {
      xPct: p.xPct,
      yPct: Math.max(
        0,
        Math.min(1, (p.y - scrollY.current) / door.height),
      ),
    };
  }, [draft?.repositionOfId, placed, door.height]);

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

            <FridgeStickerLayer
              items={placed}
              width={door.width}
              hiddenItemId={draft?.repositionOfId ?? null}
              onStickerDoubleTap={
                draft ? undefined : (item) => beginReposition(item)
              }
            />
          </View>
        </ScrollView>

        {isPlacing && draft && (
          <>
            <DraggableSticker
              key={
                draft.repositionOfId
                  ? `repo-${draft.repositionOfId}`
                  : `new-${draft.sourceTitle}-${placed.length}`
              }
              selection={draft.selection}
              size={STICKER_SIZE}
              doorWidth={door.width}
              doorHeight={door.height}
              onPositionChange={handlePositionChange}
              initialTopLeft={ghostInitialTopLeft}
            />

            <View
              style={[
                styles.placementOverlay,
                {
                  top: 8,
                  bottom: TAB_BAR_CLEARANCE + 8,
                  left: 0,
                  right: 0,
                },
              ]}
              pointerEvents="box-none"
            >
              <PlacementControls
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
  placementOverlay: {
    position: 'absolute',
  },
});

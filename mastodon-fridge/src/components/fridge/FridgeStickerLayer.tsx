import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import type { PlacedSticker } from '../../context/FridgeContext';
import StickerVisual from './StickerVisual';

const DOUBLE_TAP_MS = 280;

interface FridgeStickerLayerProps {
  items: PlacedSticker[];
  /** Measured fridge door width, used to turn xPct into pixels. */
  width: number;
  /** While dragging this id as a ghost, hide the committed copy (no duplicate). */
  hiddenItemId?: string | null;
  /** Personal fridge only: double-tap a pin to move it. */
  onStickerDoubleTap?: (item: PlacedSticker) => void;
}

interface PlacedStickerHitProps {
  item: PlacedSticker;
  width: number;
  reduceMotion: boolean;
  hidden: boolean;
  onDoubleTap?: (item: PlacedSticker) => void;
}

function PlacedStickerHit({
  item,
  width,
  reduceMotion,
  hidden,
  onDoubleTap,
}: PlacedStickerHitProps) {
  const lastTap = useRef(0);

  const handlePress = useCallback(() => {
    if (!onDoubleTap) return;
    const now = Date.now();
    if (now - lastTap.current < DOUBLE_TAP_MS) {
      lastTap.current = 0;
      onDoubleTap(item);
    } else {
      lastTap.current = now;
    }
  }, [item, onDoubleTap]);

  if (hidden) return null;

  const left = item.xPct * width - item.size / 2;
  const top = item.y - item.size / 2;
  const rotation = reduceMotion ? 0 : item.rotation;

  const layoutStyle = [
    styles.item,
    {
      left,
      top,
      width: item.size,
      height: item.size,
      transform: [{ rotate: `${rotation}deg` }],
    },
  ];

  if (!onDoubleTap) {
    return (
      <View style={layoutStyle}>
        <StickerVisual selection={item.selection} size={item.size} />
      </View>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${item.sourceTitle} pin. Double tap to move.`}
      style={layoutStyle}
    >
      <StickerVisual selection={item.selection} size={item.size} />
    </Pressable>
  );
}

/**
 * Absolute overlay of the user's pinned stickers on the PERSONAL fridge.
 * Rendered INSIDE the scroll content so stickers scroll with the fridge:
 * X comes from xPct of the door width, Y is an absolute content pixel.
 * Double-tap a pin to reposition it (handled by parent via FridgeContext).
 */
export default function FridgeStickerLayer({
  items,
  width,
  hiddenItemId,
  onStickerDoubleTap,
}: FridgeStickerLayerProps) {
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

  if (width <= 0 || items.length === 0) return null;

  return (
    <View
      style={[StyleSheet.absoluteFill, styles.layer]}
      pointerEvents="box-none"
    >
      {items.map((item) => (
        <PlacedStickerHit
          key={item.id}
          item={item}
          width={width}
          reduceMotion={reduceMotion}
          hidden={hiddenItemId === item.id}
          onDoubleTap={onStickerDoubleTap}
        />
      ))}
    </View>
  );
}

/** Above all shelf items (max shelf elevation is 8 on Android). */
const PIN_Z = 999;

const styles = StyleSheet.create({
  layer: {
    zIndex: PIN_Z,
    elevation: PIN_Z,
  },
  item: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: PIN_Z,
    elevation: PIN_Z,
  },
});

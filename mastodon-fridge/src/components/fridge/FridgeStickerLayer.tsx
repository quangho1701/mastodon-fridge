import React, { useEffect, useState } from 'react';
import { AccessibilityInfo, StyleSheet, View } from 'react-native';
import type { PlacedSticker } from '../../context/FridgeContext';
import StickerVisual from './StickerVisual';

interface FridgeStickerLayerProps {
  items: PlacedSticker[];
  /** Measured fridge door width, used to turn xPct into pixels. */
  width: number;
}

/**
 * Absolute overlay of the user's pinned stickers on the PERSONAL fridge.
 * Rendered INSIDE the scroll content so stickers scroll with the fridge:
 * X comes from xPct of the door width, Y is an absolute content pixel.
 * Non-interactive (pointerEvents none) so it never blocks fridge scrolling;
 * tap-to-remove can be layered on later.
 */
export default function FridgeStickerLayer({
  items,
  width,
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
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {items.map((item) => {
        const left = item.xPct * width - item.size / 2;
        const top = item.y - item.size / 2;
        const rotation = reduceMotion ? 0 : item.rotation;
        return (
          <View
            key={item.id}
            style={[
              styles.item,
              {
                left,
                top,
                width: item.size,
                height: item.size,
                transform: [{ rotate: `${rotation}deg` }],
              },
            ]}
          >
            <StickerVisual selection={item.selection} size={item.size} />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

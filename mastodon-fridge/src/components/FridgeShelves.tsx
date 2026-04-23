import React, { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import FridgeCollage, { renderFridgeItem } from './FridgeCollage';
import ShelfDivider from './ShelfDivider';
import type {
  CuratedPlacement,
  FridgeShelf,
} from '../data/fridgeSeed';

interface FridgeShelvesProps {
  layout: FridgeShelf[];
  onItemPress?: (id: string) => void;
}

/**
 * Top-level layout orchestrator for Screen 2. Iterates the shelf list
 * and routes each entry to the right renderer:
 *   - 'curated' → absolute-positioned children inside a measured View
 *   - 'collage' → existing masonry via FridgeCollage
 *   - 'divider' → ShelfDivider
 */
export default function FridgeShelves({
  layout,
  onItemPress,
}: FridgeShelvesProps) {
  return (
    <View style={styles.root}>
      {layout.map((shelf) => {
        switch (shelf.kind) {
          case 'curated':
            return (
              <CuratedShelf
                key={shelf.id}
                minHeight={shelf.minHeight}
                placements={shelf.placements}
                onItemPress={onItemPress}
              />
            );
          case 'collage':
            return (
              <View key={shelf.id} style={styles.collageWrap}>
                <FridgeCollage items={shelf.items} onMagnetPress={onItemPress} />
              </View>
            );
          case 'divider':
            return (
              <ShelfDivider
                key={shelf.id}
                variant={shelf.variant ?? 'gold'}
              />
            );
        }
      })}
    </View>
  );
}

interface CuratedShelfProps {
  minHeight: number;
  placements: CuratedPlacement[];
  onItemPress?: (id: string) => void;
}

function CuratedShelf({
  minHeight,
  placements,
  onItemPress,
}: CuratedShelfProps) {
  const [width, setWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    const next = e.nativeEvent.layout.width;
    if (next && next !== width) setWidth(next);
  };

  return (
    <View
      style={[styles.curated, { minHeight }]}
      onLayout={onLayout}
    >
      {width > 0 &&
        placements.map((p, i) => {
          const left = (p.xPct ?? 0) * width + (p.offsetX ?? 0);
          const top = p.y ?? 0;
          const z = p.z ?? i;
          return (
            <View
              key={p.item.id}
              style={[
                styles.placement,
                { left, top, zIndex: z },
              ]}
            >
              {renderFridgeItem(p.item, onItemPress)}
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 0,
  },
  curated: {
    position: 'relative',
    width: '100%',
    overflow: 'visible',
  },
  placement: {
    position: 'absolute',
  },
  collageWrap: {
    marginTop: 8,
  },
});

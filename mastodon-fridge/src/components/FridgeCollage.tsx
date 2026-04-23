import React from 'react';
import { StyleSheet, View } from 'react-native';
import CrumpledNote from './CrumpledNote';
import FlyerCard from './FlyerCard';
import LetterMagnet from './LetterMagnet';
import PhotoCard from './PhotoCard';
import PinnedItem from './PinnedItem';
import Polaroid from './Polaroid';
import Sticker from './Sticker';
import StickyNote from './StickyNote';
import type { FridgeItem } from '../data/fridgeSeed';

interface FridgeCollageProps {
  items: FridgeItem[];
  onMagnetPress?: (id: string) => void;
}

const COL_COUNT = 3;

/**
 * Distributes items into three columns using per-item columnHint when
 * present, otherwise the shortest column by item count. Per-item
 * rotation + a middle-column top offset create the messy-collage feel.
 */
function distribute(items: FridgeItem[]): FridgeItem[][] {
  const cols: FridgeItem[][] = Array.from({ length: COL_COUNT }, () => []);
  for (const item of items) {
    const hint = 'columnHint' in item ? item.columnHint : undefined;
    const target = hint != null ? hint : shortestColIndex(cols);
    cols[target].push(item);
  }
  return cols;
}

function shortestColIndex(cols: FridgeItem[][]): number {
  let idx = 0;
  for (let i = 1; i < cols.length; i += 1) {
    if (cols[i].length < cols[idx].length) idx = i;
  }
  return idx;
}

export function renderFridgeItem(
  item: FridgeItem,
  onMagnetPress?: (id: string) => void,
): React.ReactNode {
  switch (item.kind) {
    case 'polaroid': {
      const onPress = item.tappable
        ? () => onMagnetPress?.(item.id)
        : undefined;
      return (
        <PinnedItem
          key={item.id}
          rotation={item.rotation}
          shadowVariant="polaroid"
          topMagnet={item.topMagnet ?? 'none'}
          onPress={onPress}
          accessibilityLabel={item.accessibilityLabel}
        >
          <Polaroid
            imageSource={item.imageSource}
            caption={item.caption}
            size={item.size}
          />
        </PinnedItem>
      );
    }
    case 'flyer':
      return (
        <PinnedItem
          key={item.id}
          rotation={item.rotation}
          shadowVariant="flyer"
          topMagnet={item.topMagnet ?? 'none'}
          onPress={() => onMagnetPress?.(item.id)}
          accessibilityLabel={item.title}
        >
          <FlyerCard title={item.title} date={item.date} featured={item.featured} />
        </PinnedItem>
      );
    case 'note':
      return (
        <PinnedItem
          key={item.id}
          rotation={item.rotation}
          shadowVariant="note"
        >
          <StickyNote text={item.text} color={item.color} />
        </PinnedItem>
      );
    case 'sticker':
      return (
        <PinnedItem
          key={item.id}
          rotation={item.rotation}
          shadowVariant="sticker"
          style={styles.stickerAlign}
        >
          <Sticker
            icon={item.icon}
            fillColor={item.fillColor}
            size={item.size}
            shape={item.shape}
          />
        </PinnedItem>
      );
    case 'photoCard': {
      const onPress = item.tappable
        ? () => onMagnetPress?.(item.id)
        : undefined;
      return (
        <PinnedItem
          key={item.id}
          rotation={item.rotation}
          shadowVariant="polaroid"
          onPress={onPress}
          accessibilityLabel={item.accessibilityLabel}
        >
          <PhotoCard
            imageSource={item.imageSource}
            avatar={item.avatar}
            width={item.width}
            height={item.height}
            aspect={item.aspect}
          />
        </PinnedItem>
      );
    }
    case 'letterMagnet':
      return (
        <PinnedItem
          key={item.id}
          rotation={item.rotation}
          shadowVariant="magnetSmall"
        >
          <LetterMagnet
            letter={item.letter}
            color={item.color}
            size={item.size}
          />
        </PinnedItem>
      );
    case 'crumpledNote':
      return (
        <PinnedItem
          key={item.id}
          rotation={item.rotation}
          shadowVariant="note"
        >
          <CrumpledNote
            lines={item.lines}
            width={item.width}
            height={item.height}
          />
        </PinnedItem>
      );
  }
}

function renderItem(
  item: FridgeItem,
  onMagnetPress?: (id: string) => void,
): React.ReactNode {
  return renderFridgeItem(item, onMagnetPress);
}

export default function FridgeCollage({
  items,
  onMagnetPress,
}: FridgeCollageProps) {
  const cols = distribute(items);

  return (
    <View style={styles.row}>
      {cols.map((colItems, colIdx) => (
        <View
          key={colIdx}
          style={[
            styles.column,
            colIdx === 1 && styles.columnMiddle,
            colIdx === 0 && styles.columnNudgeRight,
            colIdx === 2 && styles.columnNudgeLeft,
          ]}
        >
          {colItems.map((item) => (
            <View
              key={item.id}
              style={[styles.cell, cellNudge(colIdx, item.id)]}
            >
              {renderItem(item, onMagnetPress)}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

/** Small deterministic horizontal nudge so items don't line up vertically. */
function cellNudge(colIdx: number, id: string) {
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const direction = colIdx === 2 ? -1 : 1;
  const offset = ((hash % 5) - 2) * direction;
  return { marginLeft: offset, marginRight: -offset };
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  column: {
    flex: 1,
    gap: 28,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  columnMiddle: {
    marginTop: 20,
  },
  columnNudgeRight: {
    paddingLeft: 4,
  },
  columnNudgeLeft: {
    paddingRight: 4,
  },
  cell: {
    alignItems: 'center',
  },
  stickerAlign: {
    alignSelf: 'center',
  },
});

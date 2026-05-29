import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { StickerSelection } from '../StickerPickerModal';
import Magnet from '../Magnet';
import Sticker from '../Sticker';

interface StickerVisualProps {
  selection: StickerSelection;
  size: number;
}

/**
 * Renders the chosen magnet / sticker / emoji at a given size. Shared by
 * FridgeStickerLayer (committed items) and DraggableSticker (the ghost being
 * positioned) so both always look identical.
 */
export default function StickerVisual({ selection, size }: StickerVisualProps) {
  if (selection.kind === 'magnet') {
    return (
      <Magnet
        variant={selection.variant === 'heart' ? 'heart' : 'gold'}
        size={size}
      />
    );
  }

  if (selection.kind === 'sticker' && selection.icon) {
    return (
      <Sticker
        icon={selection.icon as keyof typeof Ionicons.glyphMap}
        fillColor={selection.fillColor || '#DAAA00'}
        size={size}
        shape="rounded"
      />
    );
  }

  return <Text style={[styles.emoji, { fontSize: size * 0.8 }]}>{selection.emoji}</Text>;
}

const styles = StyleSheet.create({
  emoji: {
    textAlign: 'center',
  },
});

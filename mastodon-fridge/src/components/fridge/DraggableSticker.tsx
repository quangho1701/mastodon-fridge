import React, { useEffect, useRef } from 'react';
import { Animated, PanResponder, Platform, StyleSheet } from 'react-native';
import type { StickerSelection } from '../StickerPickerModal';
import StickerVisual from './StickerVisual';

interface DraggableStickerProps {
  selection: StickerSelection;
  size: number;
  /** Measured fridge door bounds the sticker is constrained to. */
  doorWidth: number;
  doorHeight: number;
  /** Reports the sticker center as 0..1 fractions of the door. */
  onPositionChange: (xPct: number, yPct: number) => void;
  /** Top-left of sticker in door coordinates; defaults to centered. */
  initialTopLeft?: { x: number; y: number };
}

function clamp(value: number, max: number): number {
  return Math.min(Math.max(value, 0), max);
}

/**
 * The translucent "ghost" the user drags around the personal fridge to choose
 * where to pin a sticker. Uses PanResponder + Animated (no extra native deps).
 * Position is reported up as door fractions so the parent can commit it.
 */
export default function DraggableSticker({
  selection,
  size,
  doorWidth,
  doorHeight,
  onPositionChange,
  initialTopLeft,
}: DraggableStickerProps) {
  const maxX = Math.max(0, doorWidth - size);
  const maxY = Math.max(0, doorHeight - size);
  const startX =
    initialTopLeft !== undefined
      ? clamp(initialTopLeft.x, maxX)
      : maxX / 2;
  const startY =
    initialTopLeft !== undefined
      ? clamp(initialTopLeft.y, maxY)
      : maxY / 2;

  const pan = useRef(new Animated.ValueXY({ x: startX, y: startY })).current;
  const scale = useRef(new Animated.Value(1)).current;
  const pos = useRef({ x: startX, y: startY });
  const reportRef = useRef(onPositionChange);
  reportRef.current = onPositionChange;

  const report = (x: number, y: number) => {
    reportRef.current((x + size / 2) / doorWidth, (y + size / 2) / doorHeight);
  };

  useEffect(() => {
    const ix = initialTopLeft !== undefined ? clamp(initialTopLeft.x, maxX) : maxX / 2;
    const iy = initialTopLeft !== undefined ? clamp(initialTopLeft.y, maxY) : maxY / 2;
    pos.current = { x: ix, y: iy };
    pan.setValue({ x: ix, y: iy });
    report(ix, iy);
  }, [
    doorWidth,
    doorHeight,
    maxX,
    maxY,
    initialTopLeft?.x,
    initialTopLeft?.y,
    pan,
    size,
  ]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pos.current.x, y: pos.current.y });
        pan.setValue({ x: 0, y: 0 });
        Animated.spring(scale, {
          toValue: 1.08,
          friction: 7,
          tension: 80,
          useNativeDriver: true,
        }).start();
      },
      onPanResponderMove: (_, g) => {
        const nx = clamp(pos.current.x + g.dx, maxX);
        const ny = clamp(pos.current.y + g.dy, maxY);
        pan.setValue({ x: nx - pos.current.x, y: ny - pos.current.y });
      },
      onPanResponderRelease: (_, g) => {
        const nx = clamp(pos.current.x + g.dx, maxX);
        const ny = clamp(pos.current.y + g.dy, maxY);
        pan.flattenOffset();
        pan.setValue({ x: nx, y: ny });
        pos.current = { x: nx, y: ny };
        report(nx, ny);
        Animated.spring(scale, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.ghost,
        {
          width: size,
          height: size,
          transform: [...pan.getTranslateTransform(), { scale }],
        },
      ]}
    >
      <StickerVisual selection={selection} size={size} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  ghost: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.62,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: { elevation: 12 },
    }),
  },
});

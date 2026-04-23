import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CrumpledNoteProps {
  lines?: string[];
  width?: number;
  height?: number;
}

/**
 * Small lined-notebook scrap (crumpled). Off-white paper with a red
 * left-margin rule, repeating horizontal lines, a subtle tint overlay
 * for the crumpled feel, and a folded-corner triangle in the bottom
 * right. Wrap in `PinnedItem shadowVariant="note"` to pin + rotate.
 */
export default function CrumpledNote({
  lines,
  width = 72,
  height = 96,
}: CrumpledNoteProps) {
  const ruleCount = Math.max(0, Math.floor((height - 14) / 12));

  return (
    <View style={[styles.paper, { width, height }]}>
      <View style={styles.marginLine} pointerEvents="none" />

      {Array.from({ length: ruleCount }).map((_, i) => (
        <View
          key={i}
          pointerEvents="none"
          style={[styles.rule, { top: 14 + i * 12 }]}
        />
      ))}

      {/* Crumple tint — a soft diagonal gradient fake via two overlays */}
      <View pointerEvents="none" style={styles.crumpleTopLeft} />
      <View pointerEvents="none" style={styles.crumpleBottomRight} />

      {/* Folded corner */}
      <View pointerEvents="none" style={styles.foldShadow} />
      <View pointerEvents="none" style={styles.fold} />

      {lines && lines.length > 0 ? (
        <View style={styles.textWrap}>
          {lines.map((line, i) => (
            <Text key={i} style={styles.text} numberOfLines={1}>
              {line}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  paper: {
    backgroundColor: '#F4EEE0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  marginLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 10,
    width: 1,
    backgroundColor: 'rgba(223, 74, 74, 0.55)',
  },
  rule: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(120,130,150,0.25)',
  },
  crumpleTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.035)',
  },
  crumpleBottomRight: {
    position: 'absolute',
    top: '55%',
    left: '35%',
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  fold: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 14,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderBottomColor: '#D9CFB6',
  },
  foldShadow: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 16,
    height: 16,
    backgroundColor: 'rgba(0,0,0,0.10)',
  },
  textWrap: {
    paddingLeft: 16,
    paddingRight: 6,
    paddingTop: 4,
  },
  text: {
    fontSize: 10,
    lineHeight: 12,
    color: '#4A4740',
    fontStyle: 'italic',
  },
});

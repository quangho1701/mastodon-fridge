import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import Magnet from './Magnet';
import Sticker from './Sticker';
import MagnetButton from './MagnetButton';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export type StickerSelection = {
  kind: 'magnet' | 'sticker' | 'emoji';
  variant?: string;
  icon?: string;
  fillColor?: string;
  emoji?: string;
  label: string;
};

interface Props {
  visible: boolean;
  flyerTitle: string;
  onConfirm: (selection: StickerSelection) => void;
  onDismiss: () => void;
}

const MAGNETS: StickerSelection[] = [
  { kind: 'magnet', variant: 'heart', label: 'Heart' },
  { kind: 'magnet', variant: 'gold', label: 'Gold' },
];

const STICKERS: StickerSelection[] = [
  { kind: 'sticker', icon: 'restaurant', fillColor: '#FF6B35', label: 'Food' },
  { kind: 'sticker', icon: 'laptop', fillColor: '#1565C0', label: 'Tech' },
  {
    kind: 'sticker',
    icon: 'musical-notes',
    fillColor: '#6A1B9A',
    label: 'Arts',
  },
  {
    kind: 'sticker',
    icon: 'basketball',
    fillColor: '#E65100',
    label: 'Sports',
  },
  { kind: 'sticker', icon: 'book', fillColor: '#2E7D32', label: 'Study' },
  {
    kind: 'sticker',
    icon: 'color-palette',
    fillColor: '#AD1457',
    label: 'Art',
  },
  {
    kind: 'sticker',
    icon: 'star',
    fillColor: '#DAAA00',
    label: 'Featured',
  },
  {
    kind: 'sticker',
    icon: 'game-controller',
    fillColor: '#283593',
    label: 'Gaming',
  },
];

const EMOJIS: StickerSelection[] = [
  { kind: 'emoji', emoji: '🎉', label: 'Party' },
  { kind: 'emoji', emoji: '🔥', label: 'Hot' },
  { kind: 'emoji', emoji: '💡', label: 'Idea' },
  { kind: 'emoji', emoji: '🎭', label: 'Theater' },
  { kind: 'emoji', emoji: '📚', label: 'Book' },
  { kind: 'emoji', emoji: '🏆', label: 'Trophy' },
  { kind: 'emoji', emoji: '🎨', label: 'Paint' },
  { kind: 'emoji', emoji: '🎵', label: 'Music' },
];

export default function StickerPickerModal({
  visible,
  flyerTitle,
  onConfirm,
  onDismiss,
}: Props) {
  const { theme } = useTheme();
  const [selected, setSelected] = useState<StickerSelection | null>(null);
  const slideAnim = useRef(new Animated.Value(200)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      setSelected(null);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 40,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 200,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, slideAnim]);

  const handleSelect = (item: StickerSelection) => {
    setSelected(item);
    scaleAnim.setValue(0.8);
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 40,
      friction: 7,
      useNativeDriver: true,
    }).start();
  };

  const handleConfirm = () => {
    if (selected) {
      onConfirm(selected);
      onDismiss();
    }
  };

  const categoryProps = {
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onDismiss}>
      <BlurView intensity={60} tint={theme.dark ? 'dark' : 'light'} style={styles.blur}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onDismiss} />

        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              maxWidth: screenWidth - theme.spacing.lg * 2,
            },
          ]}
        >
          {/* Pill handle */}
          <View
            style={[
              styles.pill,
              { backgroundColor: theme.colors.border },
            ]}
          />

          {/* Header */}
          <Text
            style={[
              theme.typography.h2,
              {
                color: theme.colors.textPrimary,
                marginBottom: theme.spacing.sm,
                marginTop: theme.spacing.md,
              },
            ]}
          >
            Choose your sticker?
          </Text>

          {/* Live Preview Panel */}
          <View
            style={[
              styles.previewPanel,
              {
                backgroundColor: theme.colors.ivorySurface,
                borderRadius: theme.layout.borderRadius.lg,
                marginBottom: theme.spacing.lg,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={styles.previewLeft}>
              <Text
                numberOfLines={1}
                style={[
                  theme.typography.caption,
                  { color: theme.colors.textPrimary, flex: 1 },
                ]}
              >
                {flyerTitle}
              </Text>
            </View>

            <View style={styles.previewRight}>
              {selected ? (
                <Animated.View
                  style={{ transform: [{ scale: scaleAnim }] }}
                >
                  {selected.kind === 'magnet' && (
                    <Magnet
                      variant={selected.variant === 'heart' ? 'heart' : 'gold'}
                      size={64}
                    />
                  )}
                  {selected.kind === 'sticker' && selected.icon && (
                    <Sticker
                      icon={selected.icon as any}
                      fillColor={selected.fillColor || '#DAAA00'}
                      size={64}
                      shape="rounded"
                    />
                  )}
                  {selected.kind === 'emoji' && (
                    <Text style={styles.emojiPreview}>
                      {selected.emoji}
                    </Text>
                  )}
                </Animated.View>
              ) : (
                <Text
                  style={[
                    theme.typography.caption,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Tap below to preview
                </Text>
              )}
            </View>
          </View>

          {/* Scrollable Categories */}
          <FlatList
            scrollEnabled
            nestedScrollEnabled
            maxToRenderPerBatch={30}
            data={[
              { title: 'MAGNETS', items: MAGNETS },
              { title: 'STICKERS', items: STICKERS },
              { title: 'EMOJIS', items: EMOJIS },
            ]}
            keyExtractor={(_, idx) => `cat-${idx}`}
            renderItem={({ item: category }) => (
              <View style={categoryProps}>
                <Text
                  style={[
                    theme.typography.overline,
                    {
                      color: theme.colors.textSecondary,
                      marginBottom: theme.spacing.md,
                    },
                  ]}
                >
                  {category.title}
                </Text>

                <FlatList
                  scrollEnabled={false}
                  numColumns={4}
                  columnWrapperStyle={{
                    gap: theme.spacing.md,
                    marginBottom: theme.spacing.md,
                  }}
                  data={category.items}
                  keyExtractor={(item) => item.label}
                  renderItem={({ item }) => (
                    <StickerTile
                      item={item}
                      isSelected={
                        selected?.label === item.label &&
                        selected?.kind === item.kind
                      }
                      onPress={() => handleSelect(item)}
                      theme={theme}
                    />
                  )}
                />
              </View>
            )}
            contentContainerStyle={{
              paddingHorizontal: 0,
              paddingBottom: theme.spacing.lg,
            }}
            scrollEventThrottle={16}
          />

          {/* Action Button */}
          <MagnetButton
            title="ADD TO FRIDGE"
            onPress={handleConfirm}
            disabled={!selected}
            style={{ marginTop: theme.spacing.md }}
          />
        </Animated.View>
      </BlurView>
    </Modal>
  );
}

interface StickerTileProps {
  item: StickerSelection;
  isSelected: boolean;
  onPress: () => void;
  theme: ReturnType<typeof useTheme>['theme'];
}

function StickerTile({
  item,
  isSelected,
  onPress,
  theme,
}: StickerTileProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      tension: 40,
      friction: 7,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 40,
      friction: 7,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  const tileSize = (screenWidth - theme.spacing.lg * 2 - theme.spacing.md * 3) / 4;

  return (
    <Animated.View
      style={[
        styles.tile,
        {
          width: tileSize,
          height: tileSize,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.tileButton,
          {
            borderRadius: theme.layout.borderRadius.lg,
            backgroundColor: theme.colors.surface,
            borderWidth: isSelected ? 2 : 1,
            borderColor: isSelected ? theme.colors.action : theme.colors.border,
          },
        ]}
      >
        {item.kind === 'magnet' && (
          <Magnet
            variant={item.variant === 'heart' ? 'heart' : 'gold'}
            size={40}
          />
        )}
        {item.kind === 'sticker' && item.icon && (
          <Sticker
            icon={item.icon as any}
            fillColor={item.fillColor || '#DAAA00'}
            size={48}
            shape="rounded"
          />
        )}
        {item.kind === 'emoji' && (
          <Text style={styles.tileEmoji}>{item.emoji}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  blur: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    width: screenWidth - 32,
    maxHeight: screenHeight * 0.78,
    borderRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderWidth: 1,
    marginBottom: 24,
  },
  pill: {
    alignSelf: 'center',
    width: 32,
    height: 4,
    borderRadius: 2,
    marginBottom: 16,
  },
  previewPanel: {
    flexDirection: 'row',
    height: 120,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  previewLeft: {
    flex: 1,
    paddingRight: 16,
  },
  previewRight: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
  },
  emojiPreview: {
    fontSize: 48,
  },
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileEmoji: {
    fontSize: 36,
  },
});

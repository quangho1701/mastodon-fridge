import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme, cardShadow } from '../../theme';
import { MarketFlyer } from '../../data/marketSeed';
import QuickPinButton from './QuickPinButton';

interface MarketFlyerCardProps {
  flyer: MarketFlyer;
  width: number;
  isPinned: boolean;
  onPin: (id: string) => void;
  onPress?: (id: string) => void;
}

export default function MarketFlyerCard({
  flyer,
  width,
  isPinned,
  onPin,
  onPress,
}: MarketFlyerCardProps) {
  const { theme } = useTheme();
  const shadow = cardShadow(theme.dark);

  const imageHeight = width / flyer.aspectRatio;

  return (
    <Pressable
      onPress={onPress ? () => onPress(flyer.id) : undefined}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${flyer.category}. ${flyer.title}. ${flyer.club}. ${flyer.date} at ${flyer.location}.`}
      style={({ pressed }) => [
        styles.card,
        {
          width,
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.cardBorder,
          opacity: pressed && onPress ? 0.92 : 1,
        },
        shadow,
        flyer.featured && {
          borderTopWidth: 3,
          borderTopColor: theme.colors.action,
        },
      ]}
    >
      <View style={{ width, height: imageHeight, backgroundColor: flyer.placeholderColor }}>
        {flyer.imageSource && (
          <Image
            source={flyer.imageSource}
            resizeMode="cover"
            style={StyleSheet.absoluteFillObject}
          />
        )}
      </View>

      <QuickPinButton
        pinned={isPinned}
        title={flyer.title}
        onPress={() => onPin(flyer.id)}
      />

      <View style={styles.content}>
        <Text
          selectable={false}
          style={[
            theme.typography.overline,
            { color: theme.colors.action, marginBottom: 6 },
          ]}
        >
          {flyer.category}
        </Text>
        <Text
          selectable={false}
          numberOfLines={2}
          style={[theme.typography.h3, { color: theme.colors.textPrimary }]}
        >
          {flyer.title}
        </Text>
        <Text
          selectable={false}
          numberOfLines={1}
          style={[
            theme.typography.caption,
            { color: theme.colors.textSecondary, marginTop: 6 },
          ]}
        >
          {flyer.club} · {flyer.date}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  content: {
    padding: 12,
  },
});

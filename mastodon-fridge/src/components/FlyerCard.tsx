import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { useTheme, cardShadow } from '../theme';

interface FlyerCardProps {
  title: string;
  date?: string;
  imageSource?: ImageSourcePropType;
  featured?: boolean;
  onPress?: () => void;
}

/**
 * Flyer card from DESIGN.md:
 * 12px rounded corners, 1px border, Level 1 shadow in light mode.
 * Featured state: 3px top border in Summit Gold.
 */
export default function FlyerCard({
  title,
  date,
  imageSource,
  featured = false,
  onPress,
}: FlyerCardProps) {
  const { theme } = useTheme();
  const shadow = cardShadow(theme.dark);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      disabled={!onPress}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.cardBorder,
        },
        shadow,
        featured && {
          borderTopWidth: 3,
          borderTopColor: theme.colors.action,
        },
      ]}
    >
      {imageSource && (
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      )}
      <View style={styles.content}>
        <Text
          style={[theme.typography.h3, { color: theme.colors.textPrimary }]}
          numberOfLines={2}
        >
          {title}
        </Text>
        {date && (
          <Text
            style={[
              theme.typography.caption,
              { color: theme.colors.textSecondary, marginTop: 4 },
            ]}
          >
            {date}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 16,
  },
});

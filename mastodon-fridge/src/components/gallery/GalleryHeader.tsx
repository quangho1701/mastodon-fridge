import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { MarketFlyer } from '../../data/marketSeed';
import { getOrganization } from '../../data/organizations';

interface GalleryHeaderProps {
  flyer?: MarketFlyer;
  onBack: () => void;
}

export default function GalleryHeader({ flyer, onBack }: GalleryHeaderProps) {
  const { theme } = useTheme();
  const org = flyer ? getOrganization(flyer.organizationId) : null;

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: theme.colors.background,
          borderBottomColor: theme.colors.border,
        },
      ]}
    >
      <Pressable
        onPress={onBack}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        style={({ pressed }) => [
          styles.back,
          { opacity: pressed ? 0.5 : 1 },
        ]}
      >
        <Ionicons
          name="chevron-back"
          size={28}
          color={theme.colors.textPrimary}
        />
      </Pressable>

      <View style={styles.titleBlock}>
        <Text
          numberOfLines={1}
          style={[theme.typography.h2, { color: theme.colors.textPrimary }]}
        >
          {flyer?.title ?? 'Gallery'}
        </Text>
        {flyer && (
          <Text
            numberOfLines={1}
            style={[
              theme.typography.overline,
              { color: theme.colors.textSecondary, marginTop: 2 },
            ]}
          >
            {flyer.category.toUpperCase()} · {flyer.date}
            {org ? ` · ${org.name}` : ''}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  back: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
    marginLeft: -8,
  },
  titleBlock: {
    flex: 1,
    minWidth: 0,
  },
});

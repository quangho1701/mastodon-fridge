import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme';
import { MarketFilter, MARKET_CATEGORIES } from '../../data/marketSeed';

interface CategoryChipRowProps {
  selected: MarketFilter;
  onSelect: (c: MarketFilter) => void;
}

export default function CategoryChipRow({
  selected,
  onSelect,
}: CategoryChipRowProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.wrapper}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {MARKET_CATEGORIES.map(cat => {
        const isSelected = cat === selected;
        return (
          <Pressable
            key={cat}
            onPress={() => onSelect(cat)}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            style={({ pressed }) => [
              styles.chip,
              {
                backgroundColor: isSelected
                  ? theme.colors.action
                  : theme.colors.surface,
                borderColor: isSelected
                  ? theme.colors.action
                  : theme.colors.cardBorder,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Text
              selectable={false}
              style={[
                theme.typography.overline,
                {
                  color: isSelected
                    ? theme.colors.black
                    : theme.colors.textSecondary,
                },
              ]}
            >
              {cat}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
  },
  content: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    minHeight: 36,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

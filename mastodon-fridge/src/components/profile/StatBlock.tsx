import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/theme';
import { cardShadow } from '@/theme/shadows';

interface StatBlockProps {
  value: string | number;
  label: string;
  variant?: 'card' | 'inline';
}

export default function StatBlock({
  value,
  label,
  variant = 'card',
}: StatBlockProps) {
  const { theme } = useTheme();
  const isInline = variant === 'inline';

  return (
    <View
      style={[
        styles.tile,
        isInline ? styles.tileInline : styles.tileCard,
        !isInline && {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.cardBorder,
          borderRadius: theme.layout.borderRadius.lg,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.sm,
        },
        !isInline && cardShadow(theme.dark),
      ]}
    >
      <Text
        style={[
          styles.value,
          {
            color: theme.colors.textPrimary,
            fontFamily: theme.typography.h1.fontFamily,
          },
        ]}
        numberOfLines={1}
      >
        {value}
      </Text>
      <Text
        style={[
          theme.typography.caption,
          styles.label,
          {
            color: theme.colors.textSecondary,
            marginTop: theme.spacing.xs,
          },
        ]}
        numberOfLines={2}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 76,
  },
  tileCard: {
    borderWidth: 1,
  },
  tileInline: {
    paddingHorizontal: 8,
  },
  value: {
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 30,
  },
  label: {
    lineHeight: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme';
import { cardShadow } from '../../theme/shadows';

interface StatBlockProps {
  value: string | number;
  label: string;
}

export default function StatBlock({ value, label }: StatBlockProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.tile,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.cardBorder,
          borderRadius: theme.layout.borderRadius.lg,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.sm,
        },
        cardShadow(theme.dark),
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
          theme.typography.overline,
          {
            color: theme.colors.textSecondary,
            marginTop: theme.spacing.xs,
            textAlign: 'center',
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
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 76,
  },
  value: {
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 30,
  },
});

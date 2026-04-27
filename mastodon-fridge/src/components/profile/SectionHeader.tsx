import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/theme';

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  const { theme } = useTheme();
  return (
    <View style={styles.wrap}>
      <View
        style={[
          styles.accent,
          { backgroundColor: theme.colors.action },
        ]}
      />
      <Text
        style={[
          theme.typography.overline,
          { color: theme.colors.textSecondary },
        ]}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  accent: {
    width: 18,
    height: 2,
    borderRadius: 1,
  },
});

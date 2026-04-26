import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme';

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  const { theme } = useTheme();
  return (
    <View style={styles.wrap}>
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
    paddingHorizontal: 4,
    marginBottom: 8,
  },
});

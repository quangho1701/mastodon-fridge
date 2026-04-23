import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';

interface ScanHeaderProps {
  onClose: () => void;
}

const HIT_SIZE = 44;

export default function ScanHeader({ onClose }: ScanHeaderProps) {
  const { theme } = useTheme();
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onClose}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Close scanner"
        style={({ pressed }) => [
          styles.iconButton,
          { opacity: pressed ? 0.6 : 1 },
        ]}
      >
        <Ionicons name="close" size={28} color={theme.colors.white} />
      </Pressable>

      <Text
        style={[
          theme.typography.h2,
          styles.title,
          { color: theme.colors.white },
        ]}
      >
        Magic Lens
      </Text>

      <View style={styles.iconButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  iconButton: {
    width: HIT_SIZE,
    height: HIT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
});

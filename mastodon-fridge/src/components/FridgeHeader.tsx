import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';

interface FridgeHeaderProps {
  name?: string;
  onSettingsPress?: () => void;
}

/**
 * Minimalist header over the fridge surface: white name on the left,
 * settings gear on the right. Text-shadow in light mode aids legibility
 * on the steel texture.
 */
export default function FridgeHeader({
  name = 'Quang',
  onSettingsPress,
}: FridgeHeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text
        accessibilityRole="header"
        style={[
          theme.typography.h1,
          styles.title,
          !theme.dark && styles.titleShadow,
        ]}
      >
        {name}&apos;s Fridge
      </Text>
      <Pressable
        onPress={onSettingsPress}
        accessibilityRole="button"
        accessibilityLabel="Settings"
        hitSlop={12}
        style={({ pressed }) => [styles.gear, pressed && { opacity: 0.6 }]}
      >
        <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#FFFFFF',
  },
  titleShadow: {
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  gear: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

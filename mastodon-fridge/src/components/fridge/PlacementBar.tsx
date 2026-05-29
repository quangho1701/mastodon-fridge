import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import MagnetButton from '../MagnetButton';

interface PlacementBarProps {
  title: string;
  onPin: () => void;
  onCancel: () => void;
}

/**
 * Floating action bar shown while positioning a sticker on the personal
 * fridge. "Pin it here" commits at the current spot; "Cancel" discards.
 */
export default function PlacementBar({
  title,
  onPin,
  onCancel,
}: PlacementBarProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.hintRow}>
        <Ionicons
          name="move"
          size={16}
          color={theme.colors.textSecondary}
        />
        <Text
          numberOfLines={1}
          style={[
            theme.typography.caption,
            { color: theme.colors.textSecondary, flex: 1 },
          ]}
        >
          Drag “{title}” anywhere, then pin it
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={onCancel}
          accessibilityRole="button"
          accessibilityLabel="Cancel placement"
          style={({ pressed }) => [
            styles.cancel,
            {
              borderColor: theme.colors.border,
              opacity: pressed ? 0.6 : 1,
            },
          ]}
        >
          <Text
            style={[
              theme.typography.body,
              { color: theme.colors.textPrimary, fontWeight: '600' },
            ]}
          >
            Cancel
          </Text>
        </Pressable>

        <MagnetButton
          title="PIN IT HERE"
          onPress={onPin}
          style={styles.pin}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 10,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cancel: {
    minHeight: 48,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pin: {
    flex: 1,
    minHeight: 48,
  },
});

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, layout } from '../../theme';

interface PlacementControlsProps {
  title: string;
  onPin: () => void;
  onCancel: () => void;
}

const CONTROL_SIZE = Math.max(layout.touchTargetMin, 48);

/**
 * Compact floating controls while positioning a sticker: a short hint pill at
 * the top and circular cancel / confirm actions in the bottom-right corner.
 */
export default function PlacementControls({
  title,
  onPin,
  onCancel,
}: PlacementControlsProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.fill} pointerEvents="box-none">
      <View
        style={[
          styles.hintPill,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            ...theme.dark
              ? {}
              : {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.12,
                  shadowRadius: 8,
                  elevation: 4,
                },
          },
        ]}
      >
        <Text
          accessibilityRole="text"
          accessibilityLabel={`Drag ${title} to choose a spot, then tap confirm to pin.`}
          numberOfLines={2}
          style={[
            theme.typography.caption,
            { color: theme.colors.textSecondary, textAlign: 'center' },
          ]}
        >
          Drag “{title}”, then tap{' '}
          <Text style={{ color: theme.colors.textPrimary, fontWeight: '600' }}>
            check
          </Text>{' '}
          to pin
        </Text>
      </View>

      <View style={styles.actions} pointerEvents="box-none">
        <Pressable
          onPress={onCancel}
          accessibilityRole="button"
          accessibilityLabel="Cancel placement"
          style={({ pressed }) => [
            styles.circleButton,
            {
              width: CONTROL_SIZE,
              height: CONTROL_SIZE,
              borderRadius: CONTROL_SIZE / 2,
              borderWidth: 1,
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.surface,
              opacity: pressed ? 0.75 : 1,
            },
          ]}
        >
          <Ionicons
            name="close"
            size={26}
            color={theme.colors.textPrimary}
          />
        </Pressable>

        <Pressable
          onPress={onPin}
          accessibilityRole="button"
          accessibilityLabel="Pin sticker here"
          style={({ pressed }) => [
            styles.circleButton,
            {
              width: CONTROL_SIZE,
              height: CONTROL_SIZE,
              borderRadius: CONTROL_SIZE / 2,
              borderWidth: 0,
              backgroundColor: theme.colors.action,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <Ionicons name="checkmark" size={28} color={theme.colors.black} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  hintPill: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    marginHorizontal: 16,
    maxWidth: '92%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  actions: {
    position: 'absolute',
    right: 12,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  circleButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

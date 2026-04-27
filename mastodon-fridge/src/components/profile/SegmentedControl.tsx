import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/theme';

interface SegmentOption<T extends string> {
  label: string;
  value: T;
}

interface SegmentedControlProps<T extends string> {
  options: [SegmentOption<T>, SegmentOption<T>];
  value: T;
  onChange: (value: T) => void;
  /** When true, segments stretch to fill the parent width. */
  full?: boolean;
}

export default function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  full = false,
}: SegmentedControlProps<T>) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        full && styles.containerFull,
        {
          backgroundColor: theme.dark
            ? theme.colors.background
            : theme.colors.white,
          borderColor: theme.colors.border,
          borderRadius: theme.layout.borderRadius.md,
        },
      ]}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            style={({ pressed }) => [
              styles.segment,
              full && styles.segmentFull,
              {
                backgroundColor: selected
                  ? theme.colors.action
                  : 'transparent',
                borderRadius: theme.layout.borderRadius.md - 2,
                opacity: pressed && !selected ? 0.7 : 1,
              },
            ]}
          >
            <Text
              style={[
                theme.typography.button,
                {
                  fontSize: 12,
                  color: selected ? theme.colors.black : theme.colors.textSecondary,
                },
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.78}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 3,
    alignSelf: 'flex-start',
  },
  containerFull: {
    alignSelf: 'stretch',
  },
  segment: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentFull: {
    flex: 1,
  },
});

import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../../theme';

interface PreferenceRowProps {
  label: string;
  description?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  /** Stack the right element underneath the label instead of inline. Useful for wide segmented controls. */
  stacked?: boolean;
}

export default function PreferenceRow({
  label,
  description,
  right,
  onPress,
  stacked = false,
}: PreferenceRowProps) {
  const { theme } = useTheme();

  const content = (
    <View
      style={[
        styles.row,
        stacked && styles.rowStacked,
        { minHeight: theme.layout.touchTargetMin },
      ]}
    >
      <View style={styles.textCol}>
        <Text
          style={[theme.typography.body, { color: theme.colors.textPrimary }]}
        >
          {label}
        </Text>
        {description ? (
          <Text
            style={[
              theme.typography.caption,
              { color: theme.colors.textSecondary, marginTop: 2 },
            ]}
          >
            {description}
          </Text>
        ) : null}
      </View>
      {right !== undefined ? (
        <View style={stacked ? styles.rightStacked : styles.rightInline}>
          {right}
        </View>
      ) : null}
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: theme.colors.border }}
      style={({ pressed }) => [pressed && { opacity: 0.6 }]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  rowStacked: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 10,
  },
  textCol: {
    flex: 1,
  },
  rightInline: {
    flexShrink: 0,
  },
  rightStacked: {
    width: '100%',
  },
});

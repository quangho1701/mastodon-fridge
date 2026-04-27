import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';

interface PreferenceRowProps {
  label: string;
  description?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  right?: React.ReactNode;
  onPress?: () => void;
  /** Stack the right element underneath the label instead of inline. Useful for wide segmented controls. */
  stacked?: boolean;
}

export default function PreferenceRow({
  label,
  description,
  icon,
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
      <View style={styles.primaryLine}>
        {icon ? (
          <View
            style={[
              styles.iconWrap,
              {
                backgroundColor: theme.dark
                  ? theme.colors.ivorySurfaceWarm
                  : theme.colors.background,
                borderColor: theme.colors.cardBorder,
              },
            ]}
          >
            <Ionicons name={icon} size={18} color={theme.colors.action} />
          </View>
        ) : null}

        <View style={styles.textCol}>
          <Text
            style={[
              theme.typography.body,
              {
                color: theme.colors.textPrimary,
                fontFamily: theme.typography.h3.fontFamily,
                fontWeight: theme.typography.h3.fontWeight,
                lineHeight: 22,
              },
            ]}
          >
            {label}
          </Text>
          {description ? (
            <Text
              style={[
                theme.typography.caption,
                {
                  color: theme.colors.textSecondary,
                  lineHeight: 17,
                  marginTop: 2,
                },
              ]}
            >
              {description}
            </Text>
          ) : null}
        </View>

        {!stacked && right !== undefined ? (
          <View style={styles.rightInline}>{right}</View>
        ) : null}
      </View>

      {stacked && right !== undefined ? (
        <View style={styles.rightStacked}>{right}</View>
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
      style={({ pressed }) => [pressed && { opacity: 0.68 }]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 14,
    gap: 12,
  },
  rowStacked: {
    paddingVertical: 16,
  },
  primaryLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

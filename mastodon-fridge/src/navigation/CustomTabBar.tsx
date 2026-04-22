import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';

/**
 * Bottom padding a scrolling screen should reserve so its last content
 * clears the translucent tab bar (bar + protruding [+] + safe area).
 */
export const TAB_BAR_CLEARANCE = 96;

const TAB_ICONS: Record<string, { focused: keyof typeof Ionicons.glyphMap; default: keyof typeof Ionicons.glyphMap }> = {
  Fridge: { focused: 'home', default: 'home-outline' },
  Market: { focused: 'compass', default: 'compass-outline' },
  Scan: { focused: 'add', default: 'add' },
  Friends: { focused: 'people', default: 'people-outline' },
  Profile: { focused: 'person', default: 'person-outline' },
};

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.dark
            ? 'rgba(13, 13, 13, 0.92)'
            : 'rgba(255, 255, 255, 0.92)',
          borderTopColor: theme.colors.border,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const isScan = route.name === 'Scan';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconSet = TAB_ICONS[route.name];
        const iconName = isFocused ? iconSet.focused : iconSet.default;

        // Center [+] button — special styling
        if (isScan) {
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={{ selected: isFocused }}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.scanButtonWrapper}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.scanButton,
                  {
                    backgroundColor: theme.colors.white,
                    borderColor: theme.colors.border,
                  },
                ]}
              >
                <Ionicons name="add" size={32} color={theme.colors.action} />
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? theme.colors.action : theme.colors.textSecondary}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 8,
    alignItems: 'flex-end',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  scanButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -28,
    borderWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});

import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import {
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useTheme, Theme } from '../theme';
import { MARKET_FLYERS, MarketFlyer } from '../data/marketSeed';
import { fridgeLayout } from '../data/fridgeSeed';
import { FridgeFrame, FridgeShelves } from '../components';

type EventGalleryRoute = RouteProp<RootStackParamList, 'EventGallery'>;

const MENU_ITEMS: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: 'image-outline', label: 'Image' },
  { icon: 'create-outline', label: 'Note' },
  { icon: 'mic-outline', label: 'Voice Note' },
];

export default function EventGalleryScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { params } = useRoute<EventGalleryRoute>();

  const flyer = useMemo(
    () => MARKET_FLYERS.find((f) => f.id === params.eventId),
    [params.eventId],
  );

  // menuMounted keeps the menu in the tree during the exit animation
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [adding, setAdding] = useState(false);

  // 0 = fully hidden, 1 = fully visible
  const menuAnim = useRef(new Animated.Value(0)).current;

  const openMenu = useCallback(() => {
    setMenuMounted(true);
    setMenuOpen(true);
    // Spring feels natural and playful — high tension/friction = snappy with no bounce
    Animated.spring(menuAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 280,
      friction: 26,
    }).start();
  }, [menuAnim]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    Animated.timing(menuAnim, {
      toValue: 0,
      duration: 160,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setMenuMounted(false);
        menuAnim.setValue(0);
      }
    });
  }, [menuAnim]);

  const handleAddPhoto = async () => {
    closeMenu();
    if (adding) return;
    setAdding(true);
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) return;
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
      });
      if (result.canceled || !result.assets[0]?.uri) return;
      // Photo picked — to be wired into the fridge collage in a later task
    } finally {
      setAdding(false);
    }
  };

  const handleMenuItemPress = (label: string) => {
    if (label === 'Image') {
      handleAddPhoto();
    } else {
      closeMenu();
    }
  };

  const fabBottom = insets.bottom + 20;

  // Interpolations driven by menuAnim (0→1)
  const menuOpacity = menuAnim;
  const menuTranslateY = menuAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0],
  });
  const menuScale = menuAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1],
  });

  return (
    <View style={styles.root}>
      <FridgeFrame>
        <EventFridgeHeader
          flyer={flyer}
          onBack={() => navigation.goBack()}
          theme={theme}
        />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: fabBottom + 56 + 16 },
          ]}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
        >
          <FridgeShelves layout={fridgeLayout} />
        </ScrollView>
      </FridgeFrame>

      {/* Backdrop — keeps interaction blocked while menu is visible/animating */}
      {menuMounted && (
        <Pressable
          style={styles.backdrop}
          onPress={closeMenu}
        />
      )}

      {/* Animated menu card — slides up and fades in from above the FAB */}
      {menuMounted && (
        <Animated.View
          style={[
            styles.menu,
            {
              right: 20,
              bottom: fabBottom + 56 + 8,
              backgroundColor: theme.colors.white,
              borderColor: theme.colors.border,
              opacity: menuOpacity,
              transform: [
                { translateY: menuTranslateY },
                { scale: menuScale },
              ],
            },
          ]}
        >
          {MENU_ITEMS.map((item, i) => (
            <React.Fragment key={item.label}>
              {i > 0 && (
                <View
                  style={[
                    styles.menuSeparator,
                    { backgroundColor: theme.colors.border },
                  ]}
                />
              )}
              <Pressable
                onPress={() => handleMenuItemPress(item.label)}
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.menuRow,
                  pressed && { opacity: 0.55 },
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={theme.colors.textPrimary}
                />
                <Text
                  style={[
                    theme.typography.body,
                    { color: theme.colors.textPrimary },
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            </React.Fragment>
          ))}
        </Animated.View>
      )}

      {/* FAB — bottom-right, same design as center scan-tab button */}
      <TouchableOpacity
        onPress={menuOpen ? closeMenu : openMenu}
        disabled={adding}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={menuOpen ? 'Close menu' : 'Add to fridge'}
        style={[styles.fabWrapper, { right: 20, bottom: fabBottom }]}
      >
        <View
          style={[
            styles.fab,
            {
              backgroundColor: theme.colors.white,
              borderColor: theme.colors.border,
              opacity: adding ? 0.6 : 1,
            },
          ]}
        >
          <Ionicons
            name={menuOpen ? 'close' : 'add'}
            size={32}
            color={theme.colors.action}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

interface EventFridgeHeaderProps {
  flyer: MarketFlyer | undefined;
  onBack: () => void;
  theme: Theme;
}

function EventFridgeHeader({ flyer, onBack, theme }: EventFridgeHeaderProps) {
  const overline = flyer
    ? `${flyer.category.toUpperCase()} · ${flyer.date}`
    : '';

  return (
    <View style={styles.header}>
      <Pressable
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Back"
        hitSlop={8}
        style={({ pressed }) => [
          styles.iconBtn,
          pressed && { opacity: 0.6 },
        ]}
      >
        <Ionicons
          name="chevron-back"
          size={26}
          color={theme.colors.textPrimary}
        />
      </Pressable>

      <View style={styles.titleBlock}>
        <Text
          style={[
            theme.typography.overline,
            { color: theme.colors.textSecondary },
          ]}
          numberOfLines={1}
        >
          {overline}
        </Text>
        <Text
          accessibilityRole="header"
          style={[
            theme.typography.h2,
            { color: theme.colors.textPrimary },
          ]}
          numberOfLines={1}
        >
          {flyer?.title ?? 'Event'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  header: {
    minHeight: 56,
    paddingHorizontal: 8,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBlock: {
    flex: 1,
    minHeight: 44,
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  menu: {
    position: 'absolute',
    width: 190,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    // transform-origin is bottom-right (where the FAB is), so scale feels anchored
    transformOrigin: 'bottom right',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      },
      android: { elevation: 8 },
    }),
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    minHeight: 44,
  },
  menuSeparator: {
    height: StyleSheet.hairlineWidth,
  },
  fabWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: { elevation: 6 },
    }),
  },
});

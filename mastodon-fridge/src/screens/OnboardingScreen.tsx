import React, { useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  FlatList,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../theme';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const BACKGROUND = '#FAF8F5';
const CARD_BG = '#FFFFFF';
const HEADLINE_COLOR = '#1A1A1A';
const BODY_COLOR = '#6B6B6B';
const ACTION_COLOR = '#DAAA00';
const DOT_INACTIVE = '#C8C9C7';

const SIGN_IN_FOOTER_HEIGHT = 44;

type SlideData = {
  key: string;
  mascot: ImageSourcePropType;
  mascotA11yLabel: string;
  headline: string;
  body: string;
  ctaLabel: string;
  ctaA11yLabel: string;
  ctaAction: 'next' | 'enter';
  showSignIn: boolean;
};

const SLIDES: SlideData[] = [
  {
    key: 'welcome',
    mascot: require('../assets/images/mascot.png'),
    mascotA11yLabel: 'Purdue Fort Wayne mastodon mascot waving',
    headline: 'Your campus,\non one fridge.',
    body: 'Scan event flyers, pin what matters,\nand see what Dons are doing.',
    ctaLabel: "Let's go",
    ctaA11yLabel: "Let's go",
    ctaAction: 'next',
    showSignIn: true,
  },
  {
    key: 'scan',
    mascot: require('../assets/images/mascot-scan.png'),
    mascotA11yLabel: 'Mastodon mascot scanning a flyer with a phone',
    headline: 'Scan flyers,\nskip the typing.',
    body: "Snap any flyer with your camera.\nWe'll lift the details out for you, Don.",
    ctaLabel: 'Next',
    ctaA11yLabel: 'Next',
    ctaAction: 'next',
    showSignIn: true,
  },
  {
    key: 'fridge',
    mascot: require('../assets/images/mascot-fridge.png'),
    mascotA11yLabel:
      'Mastodon mascot standing beside a fridge covered in pinned flyers and notes',
    headline: 'Your fridge,\nin your pocket.',
    body: 'Pin events you love, drop sticky notes,\nand stack memories — your campus,\nright where you can see it.',
    ctaLabel: 'Open my fridge',
    ctaA11yLabel: 'Open my fridge',
    ctaAction: 'enter',
    showSignIn: true,
  },
];

const AnimatedFlatList =
  Animated.createAnimatedComponent<React.ComponentType<React.ComponentProps<typeof FlatList<SlideData>>>>(
    FlatList as React.ComponentType<React.ComponentProps<typeof FlatList<SlideData>>>,
  );

function bottomCardShadow(isDark: boolean): ViewStyle {
  if (isDark) {
    return { borderTopWidth: 1, borderColor: '#333333' };
  }
  return Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    android: { elevation: 6 },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
  }) as ViewStyle;
}

type SlideProps = {
  slide: SlideData;
  index: number;
  slideCount: number;
  width: number;
  scrollX: Animated.Value;
  scrollXJS: Animated.Value;
  mountAnim: Animated.Value;
  reduceMotion: boolean;
  isDark: boolean;
  activeIndex: number;
  onPressCta: () => void;
  onPressSignIn: () => void;
};

function Slide({
  slide,
  index,
  slideCount,
  width,
  scrollX,
  scrollXJS,
  mountAnim,
  reduceMotion,
  isDark,
  activeIndex,
  onPressCta,
  onPressSignIn,
}: SlideProps) {
  const ctaScale = useRef(new Animated.Value(1)).current;

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const scrollOpacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });
  const scrollTranslateY = scrollX.interpolate({
    inputRange,
    outputRange: [24, 0, 24],
    extrapolate: 'clamp',
  });
  const mountTranslateY = mountAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [24, 0],
  });

  const mascotOpacity = reduceMotion ? 1 : Animated.multiply(scrollOpacity, mountAnim);
  const mascotTranslateY = reduceMotion
    ? 0
    : Animated.add(scrollTranslateY, mountTranslateY);

  const handleCtaPressIn = () => {
    Animated.spring(ctaScale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 40,
      bounciness: 0,
    }).start();
  };

  const handleCtaPressOut = () => {
    Animated.spring(ctaScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };

  return (
    <View style={[styles.slide, { width }]}>
      <View style={styles.heroZone}>
        <Animated.Image
          source={slide.mascot}
          accessibilityIgnoresInvertColors
          accessible
          accessibilityRole="image"
          accessibilityLabel={slide.mascotA11yLabel}
          style={[
            styles.mascot,
            {
              opacity: mascotOpacity,
              transform: [{ translateY: mascotTranslateY }],
            },
          ]}
        />
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: CARD_BG },
          bottomCardShadow(isDark),
        ]}
      >
        <PaginationDots
          count={slideCount}
          width={width}
          scrollX={scrollXJS}
          activeIndex={activeIndex}
        />

        <Text accessibilityRole="header" style={styles.headline}>
          {slide.headline}
        </Text>

        <Text style={styles.body}>{slide.body}</Text>

        <Pressable
          onPress={onPressCta}
          onPressIn={handleCtaPressIn}
          onPressOut={handleCtaPressOut}
          accessibilityRole="button"
          accessibilityLabel={slide.ctaA11yLabel}
          style={styles.ctaPressable}
        >
          <Animated.View
            style={[styles.ctaButton, { transform: [{ scale: ctaScale }] }]}
          >
            <Text style={styles.ctaLabel}>{slide.ctaLabel}</Text>
          </Animated.View>
        </Pressable>

        {slide.showSignIn ? (
          <Pressable
            onPress={onPressSignIn}
            accessibilityRole="button"
            accessibilityLabel="Already have an account? Sign in"
            style={styles.signInPressable}
            hitSlop={8}
          >
            <Text style={styles.signInBase}>
              {'Already have an account?  '}
              <Text style={styles.signInAction}>Sign in</Text>
            </Text>
          </Pressable>
        ) : (
          <View style={styles.signInSpacer} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" />
        )}
      </View>
    </View>
  );
}

type PaginationDotsProps = {
  count: number;
  width: number;
  scrollX: Animated.Value;
  activeIndex: number;
};

function PaginationDots({ count, width, scrollX, activeIndex }: PaginationDotsProps) {
  return (
    <View
      pointerEvents="none"
      style={styles.dotsRow}
      accessibilityRole="adjustable"
      accessibilityLabel={`Page ${activeIndex + 1} of ${count}`}
      accessibilityValue={{ now: activeIndex + 1, min: 1, max: count }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 24, 8],
          extrapolate: 'clamp',
        });
        const dotColor = scrollX.interpolate({
          inputRange,
          outputRange: [DOT_INACTIVE, ACTION_COLOR, DOT_INACTIVE],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              { width: dotWidth, backgroundColor: dotColor },
            ]}
          />
        );
      })}
    </View>
  );
}

export default function OnboardingScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

  const scrollXNative = useRef(new Animated.Value(0)).current;
  const scrollXJS = useRef(new Animated.Value(0)).current;
  const mountAnim = useRef(new Animated.Value(0)).current;
  const listRef = useRef<FlatList<SlideData>>(null);

  const [reduceMotion, setReduceMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled().then((value) => {
      if (!cancelled) setReduceMotion(value);
    });
    const sub = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduceMotion,
    );
    return () => {
      cancelled = true;
      sub.remove();
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      mountAnim.setValue(1);
      return;
    }
    Animated.timing(mountAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [mountAnim, reduceMotion]);

  const handleCtaPress = (index: number, action: 'next' | 'enter') => {
    if (action === 'next' && index < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
      return;
    }
    navigation.replace('MainTabs');
  };

  const handleSignIn = () => {
    navigation.replace('Entry');
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / width);
    if (next !== activeIndex) setActiveIndex(next);
  };

  return (
    <View style={[styles.root, { backgroundColor: BACKGROUND }]}>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <AnimatedFlatList
          ref={listRef}
          data={SLIDES}
          keyExtractor={(item: SlideData) => item.key}
          horizontal
          pagingEnabled
          bounces={false}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          getItemLayout={(_data: ArrayLike<SlideData> | null | undefined, index: number) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollXNative } } }],
            {
              useNativeDriver: true,
              listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
                scrollXJS.setValue(e.nativeEvent.contentOffset.x);
              },
            },
          )}
          onMomentumScrollEnd={onMomentumScrollEnd}
          scrollEventThrottle={16}
          renderItem={({ item, index }: { item: SlideData; index: number }) => (
            <Slide
              slide={item}
              index={index}
              slideCount={SLIDES.length}
              width={width}
              scrollX={scrollXNative}
              scrollXJS={scrollXJS}
              mountAnim={mountAnim}
              reduceMotion={reduceMotion}
              isDark={theme.dark}
              activeIndex={activeIndex}
              onPressCta={() => handleCtaPress(index, item.ctaAction)}
              onPressSignIn={handleSignIn}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  slide: {
    flex: 1,
  },
  heroZone: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascot: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },
  card: {
    paddingHorizontal: 32,
    paddingTop: 12,
    paddingBottom: 32,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  headline: {
    fontFamily: 'UnitedSansCond-Bold',
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '700',
    color: HEADLINE_COLOR,
  },
  body: {
    marginTop: 16,
    fontFamily: 'AcuminPro-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: BODY_COLOR,
  },
  ctaPressable: {
    marginTop: 24,
    alignSelf: 'stretch',
  },
  ctaButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: ACTION_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaLabel: {
    fontFamily: 'UnitedSansCond-Bold',
    fontSize: 16,
    fontWeight: '700',
    color: HEADLINE_COLOR,
  },
  signInPressable: {
    marginTop: 16,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  signInBase: {
    fontFamily: 'AcuminPro-Regular',
    fontSize: 14,
    color: BODY_COLOR,
    textAlign: 'center',
  },
  signInAction: {
    fontFamily: 'AcuminPro-Semibold',
    fontWeight: '600',
    color: ACTION_COLOR,
  },
  signInSpacer: {
    marginTop: 16,
    alignSelf: 'center',
    height: SIGN_IN_FOOTER_HEIGHT,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 8,
    marginBottom: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});

import React, { useCallback, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useTheme } from '../theme';
import { TAB_BAR_CLEARANCE } from '../navigation/CustomTabBar';
import {
  MARKET_FLYERS,
  MarketFilter,
} from '../data/marketSeed';
import { getOrganization } from '../data/organizations';
import SearchBar from '../components/market/SearchBar';
import CategoryChipRow from '../components/market/CategoryChipRow';
import MarketFlyerCard from '../components/market/MarketFlyerCard';
import MarketToast from '../components/market/MarketToast';

const SCREEN_PAD = 16;
const COL_GAP = 12;

export default function MarketScreen() {
  const { theme } = useTheme();
  const { width: screenWidth } = useWindowDimensions();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const cardWidth = (screenWidth - 2 * SCREEN_PAD - COL_GAP) / 2;

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<MarketFilter>('All');
  const [pinned, setPinned] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState({ visible: false, message: '' });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MARKET_FLYERS.filter(f => {
      if (category !== 'All' && f.category !== category) return false;
      if (!q) return true;
      const orgName = getOrganization(f.organizationId).name.toLowerCase();
      return (
        f.title.toLowerCase().includes(q) ||
        orgName.includes(q) ||
        f.category.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  const onPin = useCallback((id: string) => {
    setPinned(prev => {
      const next = new Set(prev);
      const wasPinned = next.has(id);
      if (wasPinned) {
        next.delete(id);
      } else {
        next.add(id);
      }
      setToast({
        visible: true,
        message: wasPinned
          ? 'Removed from your fridge.'
          : "Pinned to your fridge. See you there, Mastodon.",
      });
      return next;
    });
  }, []);

  const resetToast = useCallback(() => {
    setToast({ visible: false, message: '' });
  }, []);

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.root, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[theme.typography.h1, { color: theme.colors.textPrimary }]}>
          The Market
        </Text>
        <Text
          style={[
            theme.typography.caption,
            { color: theme.colors.textSecondary, marginTop: 4 },
          ]}
        >
          Scanned by Dons, for Dons.
        </Text>
        <View style={{ marginTop: 12 }}>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>
      </View>

      <CategoryChipRow selected={category} onSelect={setCategory} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: TAB_BAR_CLEARANCE + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {cardWidth <= 0 ? null : filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="compass-outline"
              size={48}
              color={theme.colors.textSecondary}
            />
            <Text
              style={[
                theme.typography.h3,
                {
                  color: theme.colors.textPrimary,
                  marginTop: 16,
                  textAlign: 'center',
                },
              ]}
            >
              Nothing here yet.
            </Text>
            <Text
              style={[
                theme.typography.body,
                {
                  color: theme.colors.textSecondary,
                  marginTop: 8,
                  textAlign: 'center',
                },
              ]}
            >
              Your next step starts now.
            </Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {filtered.map(f => (
              <MarketFlyerCard
                key={f.id}
                flyer={f}
                width={cardWidth}
                isPinned={pinned.has(f.id)}
                onPin={onPin}
                onPress={id => navigation.navigate('EventGallery', { eventId: id })}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <MarketToast
        visible={toast.visible}
        message={toast.message}
        onHide={resetToast}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SCREEN_PAD,
    paddingTop: 8,
    paddingBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PAD,
    paddingTop: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: COL_GAP,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 32,
  },
});

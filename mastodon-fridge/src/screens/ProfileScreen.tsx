import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { cardShadow } from '../theme/shadows';
import { TAB_BAR_CLEARANCE } from '../navigation/CustomTabBar';
import ShelfDivider from '../components/ShelfDivider';
import {
  ProfileHeader,
  StatBlock,
  SectionHeader,
  PreferenceRow,
  SegmentedControl,
} from '../components/profile';

const SCREEN_PAD = 16;

type UploadMode = 'hq' | 'ds';
type FridgeVisibility = 'public' | 'friends';
type Appearance = 'light' | 'dark';

export default function ProfileScreen() {
  const { theme, toggleTheme } = useTheme();

  const [notifyFriends, setNotifyFriends] = useState(true);
  const [uploadMode, setUploadMode] = useState<UploadMode>('hq');
  const [fridgeVisibility, setFridgeVisibility] =
    useState<FridgeVisibility>('public');

  const appearance: Appearance = theme.dark ? 'dark' : 'light';
  const onAppearanceChange = (next: Appearance) => {
    if (next !== appearance) toggleTheme();
  };

  const groupedCardStyle = [
    styles.groupedCard,
    {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.cardBorder,
      borderRadius: theme.layout.borderRadius.lg,
      paddingHorizontal: theme.layout.cardPadding,
    },
    cardShadow(theme.dark),
  ];

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.root, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[theme.typography.h1, { color: theme.colors.textPrimary }]}>
          The Pantry
        </Text>
        <Text
          style={[
            theme.typography.caption,
            { color: theme.colors.textSecondary, marginTop: 4 },
          ]}
        >
          Your stash, your rules.
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: TAB_BAR_CLEARANCE + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader
          name="Mastodon Don"
          handle="@mastodon.don"
          joinedLabel="Don since '26"
        />

        <ShelfDivider variant="gold" style={styles.shelfSpace} />

        <SectionHeader title="Your Year" />
        <View style={styles.statsRow}>
          <StatBlock value={12} label="Events Attended" />
          <StatBlock value={5} label="Flyers Scanned" />
          <StatBlock value={20} label="Memories Saved" />
        </View>

        <ShelfDivider variant="gold" style={styles.shelfSpace} />

        <SectionHeader title="Preferences" />
        <View style={groupedCardStyle}>
          <PreferenceRow
            label="Default Calendar"
            right={
              <View style={styles.chevronRow}>
                <Text
                  style={[
                    theme.typography.body,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Apple Calendar
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={theme.colors.textSecondary}
                />
              </View>
            }
            onPress={() => {
              /* picker not wired in Phase 1 */
            }}
          />
          <ShelfDivider variant="hairline" />
          <PreferenceRow
            label="Friend Group Updates"
            description="Get pinged when friends pin new events."
            right={
              <Switch
                value={notifyFriends}
                onValueChange={setNotifyFriends}
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.action,
                }}
                thumbColor={
                  notifyFriends ? theme.colors.black : theme.colors.background
                }
                ios_backgroundColor={theme.colors.border}
              />
            }
          />
          <ShelfDivider variant="hairline" />
          <PreferenceRow
            label="Upload Mode"
            description="High Quality keeps every pixel; Data Saver is lighter on bandwidth."
            stacked
            right={
              <SegmentedControl<UploadMode>
                full
                value={uploadMode}
                onChange={setUploadMode}
                options={[
                  { label: 'High Quality', value: 'hq' },
                  { label: 'Data Saver', value: 'ds' },
                ]}
              />
            }
          />
          <ShelfDivider variant="hairline" />
          <PreferenceRow
            label="Appearance"
            stacked
            right={
              <SegmentedControl<Appearance>
                full
                value={appearance}
                onChange={onAppearanceChange}
                options={[
                  { label: 'Light', value: 'light' },
                  { label: 'Dark', value: 'dark' },
                ]}
              />
            }
          />
        </View>

        <ShelfDivider variant="gold" style={styles.shelfSpace} />

        <SectionHeader title="Privacy" />
        <View style={groupedCardStyle}>
          <PreferenceRow
            label="Personal Fridge"
            description="Choose who can see your pinned events and memories."
            stacked
            right={
              <SegmentedControl<FridgeVisibility>
                full
                value={fridgeVisibility}
                onChange={setFridgeVisibility}
                options={[
                  { label: 'Public to Campus', value: 'public' },
                  { label: 'Friends Only', value: 'friends' },
                ]}
              />
            }
          />
        </View>
      </ScrollView>
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
    paddingTop: 4,
  },
  shelfSpace: {
    marginVertical: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  groupedCard: {
    borderWidth: 1,
    paddingVertical: 4,
  },
  chevronRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});

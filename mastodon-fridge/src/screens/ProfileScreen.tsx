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
import { useTheme } from '@/theme';
import { cardShadow } from '@/theme/shadows';
import { TAB_BAR_CLEARANCE } from '@/navigation/CustomTabBar';
import {
  ProfileHeader,
  StatBlock,
  SectionHeader,
  PreferenceRow,
  SegmentedControl,
} from '@/components/profile';

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

  const cardBaseStyle = [
    styles.panel,
    {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.cardBorder,
      borderRadius: theme.layout.borderRadius.lg,
      paddingHorizontal: theme.layout.cardPadding,
    },
    cardShadow(theme.dark),
  ];

  const separatorStyle = [
    styles.separator,
    { backgroundColor: theme.colors.border },
  ];

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.root, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: TAB_BAR_CLEARANCE + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text
              style={[theme.typography.h1, { color: theme.colors.textPrimary }]}
            >
              The Pantry
            </Text>
          </View>
        </View>

        <ProfileHeader
          name="Mastodon Don"
          handle="@mastodon.don"
          joinedLabel="PFW '29"
        />

        <View style={styles.section}>
          <SectionHeader title="Your Year" />
          <View
            style={[
              styles.statsPanel,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.cardBorder,
                borderRadius: theme.layout.borderRadius.lg,
              },
              cardShadow(theme.dark),
            ]}
          >
            <StatBlock value={12} label="Events Attended" variant="inline" />
            <View
              style={[styles.statDivider, { backgroundColor: theme.colors.border }]}
            />
            <StatBlock value={5} label="Flyers Scanned" variant="inline" />
            <View
              style={[styles.statDivider, { backgroundColor: theme.colors.border }]}
            />
            <StatBlock value={20} label="Memories Saved" variant="inline" />
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Settings" />
          <View style={cardBaseStyle}>
            <PreferenceRow
              icon="calendar-outline"
              label="Default Calendar"
              description="New events save to Apple Calendar."
              right={
                <View style={styles.chevronRow}>
                  <Text
                    style={[
                      theme.typography.caption,
                      { color: theme.colors.textSecondary },
                    ]}
                    numberOfLines={1}
                  >
                    Apple
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
            <View style={separatorStyle} />
            <PreferenceRow
              icon="notifications-outline"
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
            <View style={separatorStyle} />
            <PreferenceRow
              icon="cloud-upload-outline"
              label="Upload Mode"
              description="High Quality keeps every pixel; Data Saver uses less bandwidth."
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
            <View style={separatorStyle} />
            <PreferenceRow
              icon="contrast-outline"
              label="Appearance"
              description="Match your pantry to light or dark mode."
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
        </View>

        <View style={styles.section}>
          <SectionHeader title="Privacy" />
          <View style={cardBaseStyle}>
            <PreferenceRow
              icon="lock-closed-outline"
              label="Personal Fridge"
              description="Choose who can see your pinned events and memories."
              stacked
              right={
                <SegmentedControl<FridgeVisibility>
                  full
                  value={fridgeVisibility}
                  onChange={setFridgeVisibility}
                  options={[
                    { label: 'Campus', value: 'public' },
                    { label: 'Friends Only', value: 'friends' },
                  ]}
                />
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PAD,
    paddingTop: 8,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    paddingBottom: 12,
  },
  heroCopy: {
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  panel: {
    borderWidth: 1,
    paddingVertical: 2,
  },
  statsPanel: {
    minHeight: 94,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 48,
  },
  chevronRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    maxWidth: 128,
  },
});

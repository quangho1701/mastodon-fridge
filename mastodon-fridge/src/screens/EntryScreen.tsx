import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BrushedBackdrop from '../components/BrushedBackdrop';
import MagnetButton from '../components/MagnetButton';
import MastodonMagnet from '../components/MastodonMagnet';
import { useTheme } from '../theme';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Entry'>;

export default function EntryScreen({ navigation }: Props) {
  const { theme } = useTheme();

  const handleSignIn = () => {
    // TODO (Milestone 1): replace with Firebase Auth + @pfw.edu domain check.
    navigation.replace('MainTabs');
  };

  return (
    <View style={styles.root}>
      <BrushedBackdrop />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.spacerTop} />

        <View
          accessible
          accessibilityRole="image"
          accessibilityLabel="Mastodon Fridge logo"
        >
          <MastodonMagnet size={168} />
        </View>

        <Text
          accessibilityRole="header"
          style={[
            theme.typography.h1,
            styles.wordmark,
            { color: theme.colors.textPrimary, marginTop: theme.spacing.xxl },
          ]}
        >
          Mastodon Fridge
        </Text>

        <Text
          style={[
            theme.typography.body,
            styles.tagline,
            { color: theme.colors.textSecondary, marginTop: theme.spacing.sm },
          ]}
        >
          Your campus. On one door.
        </Text>

        <View style={styles.spacerBottom} />

        <MagnetButton
          title="Sign in with University Email"
          onPress={handleSignIn}
          style={styles.cta}
        />

        <Text
          style={[
            theme.typography.caption,
            styles.footer,
            { color: theme.colors.textSecondary, marginTop: theme.spacing.md },
          ]}
        >
          For the Dons only
        </Text>
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
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  spacerTop: {
    flex: 1,
  },
  spacerBottom: {
    flex: 1.3,
  },
  wordmark: {
    textAlign: 'center',
  },
  tagline: {
    textAlign: 'center',
  },
  cta: {
    alignSelf: 'stretch',
  },
  footer: {
    textAlign: 'center',
    marginBottom: 16,
  },
});

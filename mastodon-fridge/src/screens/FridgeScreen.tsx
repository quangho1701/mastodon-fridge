import React from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  FridgeCollage,
  FridgeHeader,
  FridgeSurface,
} from '../components';
import { TAB_BAR_CLEARANCE } from '../navigation/CustomTabBar';
import { fridgeSeed } from '../data/fridgeSeed';

export default function FridgeScreen() {
  const handleMagnetPress = (id: string) => {
    Alert.alert(
      'Event',
      `Would open event ${id} (Screen 6 — not built yet).`,
    );
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'Profile & settings coming soon.');
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <FridgeSurface />
      <SafeAreaView edges={['top']} style={styles.safe}>
        <FridgeHeader name="Quang" onSettingsPress={handleSettings} />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
        >
          <FridgeCollage items={fridgeSeed} onMagnetPress={handleMagnetPress} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: TAB_BAR_CLEARANCE,
  },
});

import React from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { FridgeFrame, FridgeShelves } from '../components';
import { TAB_BAR_CLEARANCE } from '../navigation/CustomTabBar';
import { fridgeLayout } from '../data/fridgeSeed';

export default function FridgeScreen() {
  const handleItemPress = (id: string) => {
    Alert.alert(
      'Event',
      `Would open event ${id} (Screen 6 — not built yet).`,
    );
  };

  return (
    <FridgeFrame>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: TAB_BAR_CLEARANCE + 8 },
        ]}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
      >
        <FridgeShelves layout={fridgeLayout} onItemPress={handleItemPress} />
      </ScrollView>
    </FridgeFrame>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
});

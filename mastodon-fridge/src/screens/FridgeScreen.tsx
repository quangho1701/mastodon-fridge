import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme';

export default function FridgeScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[theme.typography.h1, { color: theme.colors.textPrimary }]}>
        My Fridge
      </Text>
      <Text
        style={[
          theme.typography.body,
          { color: theme.colors.textSecondary, marginTop: theme.spacing.sm },
        ]}
      >
        Nothing here yet. Your next step starts now.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});

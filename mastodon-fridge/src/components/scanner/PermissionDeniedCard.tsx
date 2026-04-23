import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import MagnetButton from '../MagnetButton';

export default function PermissionDeniedCard() {
  const { theme } = useTheme();

  return (
    <View style={styles.backdrop}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.ivorySurface,
            borderColor: theme.colors.cardBorder,
          },
        ]}
      >
        <View
          style={[
            styles.iconBubble,
            { backgroundColor: theme.colors.action },
          ]}
        >
          <Ionicons name="camera" size={24} color={theme.colors.black} />
        </View>
        <Text
          style={[
            theme.typography.h3,
            { color: theme.colors.textPrimary, marginTop: theme.spacing.lg },
          ]}
        >
          Camera access needed
        </Text>
        <Text
          style={[
            theme.typography.body,
            {
              color: theme.colors.textSecondary,
              marginTop: theme.spacing.sm,
              textAlign: 'center',
            },
          ]}
        >
          We need the camera to turn flyers into Fridge magnets. Enable it in
          Settings to get started.
        </Text>
        <MagnetButton
          title="Open Settings"
          onPress={() => Linking.openSettings()}
          style={{ marginTop: theme.spacing.xl, alignSelf: 'stretch' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 12,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
  },
  iconBubble: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

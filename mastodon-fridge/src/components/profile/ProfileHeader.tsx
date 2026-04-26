import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../../theme';
import { cardShadow } from '../../theme/shadows';

const DEFAULT_AVATAR = require('../../assets/images/mascot-avatar.png');

interface ProfileHeaderProps {
  name: string;
  handle: string;
  joinedLabel?: string;
  avatarSource?: ImageSourcePropType;
}

export default function ProfileHeader({
  name,
  handle,
  joinedLabel,
  avatarSource,
}: ProfileHeaderProps) {
  const { theme } = useTheme();

  const metaParts = [handle, joinedLabel].filter(Boolean) as string[];

  return (
    <View
      style={[
        styles.row,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.cardBorder,
          padding: theme.layout.cardPadding,
          borderRadius: theme.layout.borderRadius.lg,
        },
        cardShadow(theme.dark),
      ]}
    >
      <View
        style={[
          styles.avatarRing,
          {
            borderColor: theme.colors.primary,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <Image
          source={avatarSource ?? DEFAULT_AVATAR}
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>

      <View style={styles.textCol}>
        <Text
          style={[theme.typography.h2, { color: theme.colors.textPrimary }]}
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text
          style={[
            theme.typography.caption,
            { color: theme.colors.textSecondary, marginTop: 2 },
          ]}
          numberOfLines={1}
        >
          {metaParts.join('  ·  ')}
        </Text>
      </View>
    </View>
  );
}

const AVATAR_SIZE = 88;
const RING_PAD = 3;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
  },
  avatarRing: {
    width: AVATAR_SIZE + RING_PAD * 2,
    height: AVATAR_SIZE + RING_PAD * 2,
    borderRadius: (AVATAR_SIZE + RING_PAD * 2) / 2,
    borderWidth: 2,
    padding: RING_PAD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  textCol: {
    flex: 1,
  },
});

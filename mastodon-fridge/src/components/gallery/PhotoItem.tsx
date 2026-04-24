import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, cardShadow } from '../../theme';
import { EventPhoto } from '../../data/marketSeed';

interface PhotoItemProps {
  photo: EventPhoto;
}

export default function PhotoItem({ photo }: PhotoItemProps) {
  const { theme } = useTheme();
  const shadow = cardShadow(theme.dark);

  const initial =
    photo.authorInitial ??
    photo.authorName.trim().charAt(0).toUpperCase() ??
    '?';

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.cardBorder,
        },
        shadow,
      ]}
    >
      <View style={styles.authorRow}>
        <View
          style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
        >
          <Text
            style={[
              theme.typography.h3,
              { color: theme.colors.black, lineHeight: 20 },
            ]}
          >
            {initial}
          </Text>
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text
            numberOfLines={1}
            style={[
              theme.typography.h3,
              { color: theme.colors.textPrimary, fontSize: 14 },
            ]}
          >
            {photo.authorName}
          </Text>
          <Text
            style={[
              theme.typography.caption,
              { color: theme.colors.textSecondary, marginTop: 1 },
            ]}
          >
            {photo.postedAt}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.imageWrap,
          {
            backgroundColor: theme.dark
              ? theme.colors.ivorySurfaceWarm
              : theme.colors.ivorySurfaceWarm,
            borderColor: theme.colors.cardBorder,
          },
        ]}
      >
        {photo.imageSource ? (
          <Image
            source={photo.imageSource}
            resizeMode="cover"
            style={StyleSheet.absoluteFillObject}
          />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons
              name="image-outline"
              size={48}
              color={theme.colors.textSecondary}
            />
          </View>
        )}
      </View>

      {photo.caption ? (
        <Text
          style={[
            theme.typography.body,
            {
              color: theme.colors.textPrimary,
              marginTop: 12,
            },
          ]}
        >
          {photo.caption}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 4 / 5,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export interface PhotoCardAvatar {
  imageSource?: ImageSourcePropType;
  initials?: string;
  color?: string;
}

interface PhotoCardProps {
  imageSource?: ImageSourcePropType;
  avatar?: PhotoCardAvatar;
  width?: number;
  height?: number;
  aspect?: number;
}

const AVATAR_SIZE = 28;

/**
 * Rounded photo tile with an optional circular "who posted it" avatar
 * badge in the top-right corner. Distinct from Polaroid (which has a
 * thick white frame) — this one is just a rounded image.
 *
 * Wrap in PinnedItem (shadowVariant="polaroid") for rotation + shadow.
 * overflow: 'visible' keeps the avatar badge's -6px offset uncut.
 */
export default function PhotoCard({
  imageSource,
  avatar,
  width = 140,
  height,
  aspect = 1,
}: PhotoCardProps) {
  const h = height ?? Math.round(width / aspect);

  return (
    <View style={[styles.wrap, { width, height: h }]}>
      <View style={[styles.frame, { width, height: h }]}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.placeholder, { backgroundColor: '#E5E3DF' }]} />
        )}
      </View>
      {avatar ? <Avatar {...avatar} /> : null}
    </View>
  );
}

function Avatar({ imageSource, initials, color }: PhotoCardAvatar) {
  return (
    <View
      style={[
        styles.avatar,
        { backgroundColor: color ?? '#B8B8B8' },
      ]}
      pointerEvents="none"
    >
      {imageSource ? (
        <Image source={imageSource} style={styles.avatarImage} resizeMode="cover" />
      ) : initials ? (
        <Text style={styles.avatarInitials} numberOfLines={1}>
          {initials.slice(0, 2).toUpperCase()}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'visible',
  },
  frame: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
  },
  avatar: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});

import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../theme';

interface PolaroidProps {
  imageSource?: ImageSourcePropType;
  caption?: string;
  size?: number;
}

/**
 * Polaroid photo: thick white border, square image, optional italic
 * caption in the bottom strip. Dark mode adds a hairline border so the
 * white body reads cleanly on dark steel.
 */
export default function Polaroid({
  imageSource,
  caption,
  size = 132,
}: PolaroidProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.frame,
        theme.dark && styles.frameDark,
        { width: size + 20 },
      ]}
    >
      {imageSource ? (
        <Image
          source={imageSource}
          style={{ width: size, height: size, borderRadius: 1 }}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.placeholder, { width: size, height: size }]} />
      )}
      {caption ? (
        <Text style={styles.caption} numberOfLines={1}>
          {caption}
        </Text>
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 8,
    borderRadius: 2,
    alignItems: 'center',
  },
  frameDark: {
    borderWidth: 1,
    borderColor: '#333333',
  },
  placeholder: {
    backgroundColor: '#E5E3DF',
    borderRadius: 1,
  },
  caption: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#4A4A4A',
    marginTop: 8,
    height: 20,
  },
  spacer: {
    height: 20,
    marginTop: 8,
  },
});

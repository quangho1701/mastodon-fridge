import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import {
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useTheme } from '../theme';
import { EventPhoto, MARKET_FLYERS } from '../data/marketSeed';
import GalleryHeader from '../components/gallery/GalleryHeader';
import AddPhotoButton from '../components/gallery/AddPhotoButton';
import PhotoItem from '../components/gallery/PhotoItem';

type EventGalleryRoute = RouteProp<RootStackParamList, 'EventGallery'>;

export default function EventGalleryScreen() {
  const { theme } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { params } = useRoute<EventGalleryRoute>();

  const flyer = useMemo(
    () => MARKET_FLYERS.find(f => f.id === params.eventId),
    [params.eventId]
  );

  const [photos, setPhotos] = useState<EventPhoto[]>(flyer?.photos ?? []);
  const [picking, setPicking] = useState(false);

  const handleAddPhoto = async () => {
    if (picking) return;
    setPicking(true);
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) return;
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
      });
      if (result.canceled || !result.assets[0]?.uri) return;
      setPhotos(prev => [
        {
          id: `local-${Date.now()}`,
          imageSource: { uri: result.assets[0].uri },
          authorName: 'You',
          authorInitial: 'Y',
          postedAt: 'just now',
        },
        ...prev,
      ]);
    } finally {
      setPicking(false);
    }
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.root, { backgroundColor: theme.colors.background }]}
    >
      <GalleryHeader flyer={flyer} onBack={() => navigation.goBack()} />

      <FlatList
        data={photos}
        keyExtractor={p => p.id}
        renderItem={({ item }) => <PhotoItem photo={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <AddPhotoButton onPress={handleAddPhoto} disabled={picking} />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons
              name="images-outline"
              size={48}
              color={theme.colors.textSecondary}
            />
            <Text
              style={[
                theme.typography.h3,
                {
                  color: theme.colors.textPrimary,
                  marginTop: 16,
                  textAlign: 'center',
                },
              ]}
            >
              Nothing here yet.
            </Text>
            <Text
              style={[
                theme.typography.body,
                {
                  color: theme.colors.textSecondary,
                  marginTop: 8,
                  textAlign: 'center',
                },
              ]}
            >
              Your next step starts now, Don.
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  listHeader: {
    marginBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 32,
    paddingHorizontal: 32,
  },
});

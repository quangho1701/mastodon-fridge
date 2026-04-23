import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Calendar from 'expo-calendar';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import type { RootStackParamList } from '../navigation/RootNavigator';
import FlyerCard from '../components/FlyerCard';
import MagnetButton from '../components/MagnetButton';
import StickerPickerModal from '../components/StickerPickerModal';
import type { StickerSelection } from '../components/StickerPickerModal';

type ConfirmScreenProps = NativeStackScreenProps<RootStackParamList, 'Confirm'>;

const MOCK_EVENT = {
  title: 'Upcoming Campus Event',
  date: 'Friday, May 2 · 6:00 PM',
  location: 'Walb Student Union',
};

export default function ConfirmScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<ConfirmScreenProps['route']>();

  const extractedTitle = route.params?.extractedTitle || MOCK_EVENT.title;
  const extractedDate = route.params?.extractedDate || MOCK_EVENT.date;
  const extractedLocation = route.params?.extractedLocation || MOCK_EVENT.location;

  const [title, setTitle] = useState(extractedTitle);
  const [date, setDate] = useState(extractedDate);
  const [location, setLocation] = useState(extractedLocation);
  const [showStickerPicker, setShowStickerPicker] = useState(false);

  const handleAddToCalendar = async () => {
    try {
      const calendarPermission = await Calendar.requestCalendarPermissionsAsync();
      if (!calendarPermission.granted) {
        Alert.alert('Calendar Permission', 'Permission to access calendar was denied.');
        setShowStickerPicker(true);
        return;
      }

      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const defaultCalendar = calendars[0];

      if (!defaultCalendar) {
        Alert.alert('No Calendar', 'No calendar found on this device.');
        setShowStickerPicker(true);
        return;
      }

      const eventDate = new Date();
      const eventEndDate = new Date(eventDate.getTime() + 60 * 60 * 1000);

      await Calendar.createEventAsync(defaultCalendar.id, {
        title: title,
        startDate: eventDate,
        endDate: eventEndDate,
        location: location,
        timeZone: 'America/Indiana/Indianapolis',
      });

      Alert.alert('Success', 'Event added to calendar!');
      setShowStickerPicker(true);
    } catch (err) {
      console.warn('[ConfirmScreen] Calendar error:', err);
      Alert.alert('Error', 'Failed to add event to calendar.');
      setShowStickerPicker(true);
    }
  };

  const handleSkipCalendar = () => {
    setShowStickerPicker(true);
  };

  const handleConfirmSticker = (selection: StickerSelection) => {
    console.log('[ConfirmScreen] Sticker selected:', selection.label);
    Alert.alert('Success!', `Pinned "${title}" to your Fridge!`, [
      {
        text: 'OK',
        onPress: () => {
          setShowStickerPicker(false);
          navigation.navigate('MainTabs');
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View
        style={[
          styles.root,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <StatusBar style={theme.dark ? 'light' : 'dark'} />

        {/* Header */}
        <View
          style={[
            styles.header,
            {
              paddingTop: insets.top + theme.spacing.md,
              paddingHorizontal: theme.spacing.lg,
              paddingBottom: theme.spacing.lg,
              borderBottomColor: theme.colors.border,
            },
          ]}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [
              styles.headerButton,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color={theme.colors.textPrimary}
            />
          </Pressable>

          <Text
            style={[
              theme.typography.h2,
              { color: theme.colors.textPrimary, flex: 1, textAlign: 'center' },
            ]}
          >
            Review Event
          </Text>

          <Pressable
            onPress={() => navigation.navigate('MainTabs')}
            style={({ pressed }) => [
              styles.headerButton,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <Ionicons
              name="close"
              size={28}
              color={theme.colors.textPrimary}
            />
          </Pressable>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.lg,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Flyer Preview Card */}
          <FlyerCard
            title={title}
            date={date}
            featured
            onPress={() => {}}
          />

          {/* Event Details Section */}
          <View style={{ marginTop: theme.spacing.xxl }}>
            <Text
              style={[
                theme.typography.overline,
                {
                  color: theme.colors.textSecondary,
                  marginBottom: theme.spacing.md,
                },
              ]}
            >
              EVENT DETAILS
            </Text>

            {/* Title Field */}
            <View style={{ marginBottom: theme.spacing.lg }}>
              <Text
                style={[
                  theme.typography.caption,
                  {
                    color: theme.colors.textSecondary,
                    marginBottom: theme.spacing.xs,
                  },
                ]}
              >
                Title
              </Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                style={[
                  theme.typography.body,
                  styles.input,
                  {
                    color: theme.colors.textPrimary,
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
                placeholderTextColor={theme.colors.textSecondary}
              />
            </View>

            {/* Date Field */}
            <View style={{ marginBottom: theme.spacing.lg }}>
              <Text
                style={[
                  theme.typography.caption,
                  {
                    color: theme.colors.textSecondary,
                    marginBottom: theme.spacing.xs,
                  },
                ]}
              >
                Date & Time
              </Text>
              <TextInput
                value={date}
                onChangeText={setDate}
                style={[
                  theme.typography.body,
                  styles.input,
                  {
                    color: theme.colors.textPrimary,
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
                placeholderTextColor={theme.colors.textSecondary}
              />
            </View>

            {/* Location Field */}
            <View style={{ marginBottom: theme.spacing.xl }}>
              <Text
                style={[
                  theme.typography.caption,
                  {
                    color: theme.colors.textSecondary,
                    marginBottom: theme.spacing.xs,
                  },
                ]}
              >
                Location
              </Text>
              <TextInput
                value={location}
                onChangeText={setLocation}
                style={[
                  theme.typography.body,
                  styles.input,
                  {
                    color: theme.colors.textPrimary,
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
                placeholderTextColor={theme.colors.textSecondary}
              />
            </View>
          </View>

          {/* Action Buttons */}
          <MagnetButton
            title="ADD TO CALENDAR"
            onPress={handleAddToCalendar}
            style={{ marginBottom: theme.spacing.md }}
          />

          <Pressable
            onPress={handleSkipCalendar}
            style={({ pressed }) => [
              styles.skipButton,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <Text
              style={[
                theme.typography.body,
                { color: theme.colors.action },
              ]}
            >
              Skip — add to fridge directly
            </Text>
          </Pressable>
        </ScrollView>

        {/* Sticker Picker Modal */}
        <StickerPickerModal
          visible={showStickerPicker}
          flyerTitle={title}
          onConfirm={handleConfirmSticker}
          onDismiss={() => setShowStickerPicker(false)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 44,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
  },
});

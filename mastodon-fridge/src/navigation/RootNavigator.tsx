import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import OnboardingScreen from '../screens/OnboardingScreen';
import EntryScreen from '../screens/EntryScreen';
import ConfirmScreen from '../screens/ConfirmScreen';
import EventGalleryScreen from '../screens/EventGalleryScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Entry: undefined;
  MainTabs: undefined;
  Confirm: {
    imageUri?: string;
    extractedTitle?: string;
    extractedDate?: string;
    extractedStartDate?: string;
    extractedEndDate?: string;
    extractedLocation?: string;
  };
  EventGallery: {
    eventId: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Entry" component={EntryScreen} />
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="Confirm"
        component={ConfirmScreen}
        options={{ gestureEnabled: true, animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="EventGallery"
        component={EventGalleryScreen}
        options={{ gestureEnabled: true, animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}

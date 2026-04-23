import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import EntryScreen from '../screens/EntryScreen';
import ConfirmScreen from '../screens/ConfirmScreen';

export type RootStackParamList = {
  Entry: undefined;
  MainTabs: undefined;
  Confirm: {
    imageUri?: string;
    extractedTitle?: string;
    extractedDate?: string;
    extractedLocation?: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Entry"
      screenOptions={{ headerShown: false }}
    >
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
    </Stack.Navigator>
  );
}

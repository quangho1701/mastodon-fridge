import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import EntryScreen from '../screens/EntryScreen';

export type RootStackParamList = {
  Entry: undefined;
  MainTabs: undefined;
  // Future screens will be added here (e.g. EventDetail, StickerWorkshop)
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
    </Stack.Navigator>
  );
}

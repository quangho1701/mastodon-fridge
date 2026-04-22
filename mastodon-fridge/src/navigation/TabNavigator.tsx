import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FridgeScreen from '../screens/FridgeScreen';
import MarketScreen from '../screens/MarketScreen';
import ScanScreen from '../screens/ScanScreen';
import FriendsScreen from '../screens/FriendsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomTabBar from './CustomTabBar';

export type TabParamList = {
  Fridge: undefined;
  Market: undefined;
  Scan: undefined;
  Friends: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Fridge" component={FridgeScreen} />
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

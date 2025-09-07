import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import CheckInScreen from '../screens/CheckInScreen';
import ActivityScreen from '../screens/ActivityScreen';
import FriendsScreen from '../screens/FriendsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useAuth } from '../state/Auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const name =
            route.name === 'Home'
              ? 'home-outline'
              : route.name === 'Activity'
              ? 'time-outline'
              : route.name === 'Friends'
              ? 'people-outline'
              : 'settings-outline';
          return <Icon name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { isLoading, isOnboarded } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isOnboarded ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
            <Stack.Screen name="CheckIn" component={CheckInScreen} options={{ title: 'Check-In' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

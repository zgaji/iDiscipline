import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/pages/LoginScreen';
import HomeScreen from './components/pages/HomeScreen';
import ProfileScreen from './components/pages/ProfileScreen';
import ViolationsScreen from './components/pages/ViolationsScreen';
import ViolationDetailsScreen from './components/pages/ViolationDetailsScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Violations" component={ViolationsScreen} />
        <Stack.Screen name="ViolationDetails" component={ViolationDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

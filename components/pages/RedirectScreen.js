import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext'; // ✅ import context

const RedirectScreen = () => {
  const { isAuthenticated, userRole } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === 'admin') {
        navigation.replace('DOHomeScreen');
      } else if (userRole === 'student') {
        navigation.replace('HomeScreen');
      } else {
        console.error('Unknown role detected:', userRole);
        navigation.replace('LoginScreen'); // fallback
      }
    } else {
      navigation.replace('LoginScreen');
    }
  }, [isAuthenticated, userRole, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default RedirectScreen;

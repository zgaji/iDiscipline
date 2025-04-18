import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

const RedirectScreen = ({ navigation, route }) => {
  const { isAuthenticated, userRole } = route.params;

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === 'admin') {
        navigation.replace('DOHomeScreen');
      } else {
        navigation.replace('HomeScreen');
      }
    } else {
      navigation.replace('LoginScreen');
    }
  }, [isAuthenticated, userRole]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default RedirectScreen;

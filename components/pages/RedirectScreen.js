import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

const RedirectScreen = ({ navigation, route }) => {
  const { isAuthenticated, userRole, student } = route.params;  // Get student data here too

  useEffect(() => {
    if (isAuthenticated) {
      // Navigate based on role and pass student data when available
      if (userRole === 'admin') {
        navigation.replace('DOHomeScreen', { userRole });  // Admin dashboard
      } else {
        // Only navigate when student data is available
        if (student) {
          navigation.replace('HomeScreen', { userRole, student });
        }
      }
    } else {
      navigation.replace('LoginScreen');
    }
  }, [isAuthenticated, userRole, student, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};


export default RedirectScreen;

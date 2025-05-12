// RedirectScreen with Supabase
import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';

const RedirectScreen = () => {
  const { isAuthenticated, userRole } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (isAuthenticated) {
      userRole === 'admin' ? navigation.replace('DOHomeScreen') : navigation.replace('HomeScreen');
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

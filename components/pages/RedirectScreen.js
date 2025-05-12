import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext'; // ✅ import context

<<<<<<< HEAD
const RedirectScreen = () => {
  const { isAuthenticated, userRole } = useContext(UserContext);
  const navigation = useNavigation();
=======
const RedirectScreen = ({ navigation, route }) => {
  const { isAuthenticated, userRole } = route.params;
>>>>>>> parent of 87154a4 (Login Auth +StudentList)

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === 'admin') {
<<<<<<< HEAD
        navigation.replace('DOHomeScreen');
      } else if (userRole === 'student') {
        navigation.replace('HomeScreen');
      } else {
        console.error('Unknown role detected:', userRole);
        navigation.replace('LoginScreen'); // fallback
=======
        navigation.replace('DOHomeScreen', { userRole });
      } else {
        navigation.replace('HomeScreen', { userRole });
>>>>>>> parent of 87154a4 (Login Auth +StudentList)
      }
    } else {
      navigation.replace('LoginScreen');
    }
<<<<<<< HEAD
  }, [isAuthenticated, userRole, navigation]);
=======
  }, [isAuthenticated, userRole]);
  
>>>>>>> parent of 87154a4 (Login Auth +StudentList)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default RedirectScreen;

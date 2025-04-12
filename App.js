import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './firebaseConfig'; // Import Firebase auth
import { onAuthStateChanged } from 'firebase/auth'; // Import Firebase auth state listener
import LoginScreen from './components/pages/LoginScreen';
import HomeScreen from './components/pages/HomeScreen';
import DOHomeScreen from './components/DOpages/DOHomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(''); // Store role (student/admin)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // If authenticated, set user role (fetch from Firestore or logic)
        setUserRole(user.email === 'admin@example.com' ? 'admin' : 'student'); // Simple logic
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          userRole === 'admin' ? (
            <Stack.Screen name="DOHome" component={DOHomeScreen} />
          ) : (
            <Stack.Screen name="Home" component={HomeScreen} />
          )
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

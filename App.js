import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { Text } from 'react-native';

// Screens
import LoginScreen from './components/pages/LoginScreen';
import HomeScreen from './components/pages/HomeScreen';
import DOHomeScreen from './components/DOpages/DOHomeScreen';
import MenuScreen from './components/pages/MenuScreen';
import ViolationsScreen from './components/pages/ViolationsScreen';
import StudentProfileScreen from './components/pages/ProfileScreen';
import DOViolations from './components/DOpages/DOViolations';
import DOStudentList from './components/DOpages/DOStudentList';
import IncidentReports from './components/DOpages/IncidentReports';
import DOAppointments from './components/DOpages/DOAppointments';
import ReportsScreen from './components/DOpages/ReportsScreen';
import DOHandbookScreen from './components/DOpages/DOHandbookScreen';
import IncidentReportsScreen from './components/pages/IncidentReportsScreen';
import HandbookScreen from './components/pages/HandbookScreen';
import ProfileScreen from './components/pages/ProfileScreen';
import RedirectScreen from './components/pages/RedirectScreen'; // Add this at the top


const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUserRole(user.email === 'admin@email.com' ? 'admin' : 'student');
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUserRole('');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <Text>Loading...</Text>;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="RedirectScreen"
        component={RedirectScreen}
        initialParams={{ isAuthenticated, userRole }} // Pass initial params to the screen
      />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DOHomeScreen" component={DOHomeScreen} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} initialParams={{ userRole }} />
      <Stack.Screen name="DOViolations" component={DOViolations} />
      <Stack.Screen name="DOStudentList" component={DOStudentList} />
      <Stack.Screen name="DOStudentProfile" component={StudentProfileScreen} />
      <Stack.Screen name="DOIncidentReports" component={IncidentReports} />
      <Stack.Screen name="DOAppointments" component={DOAppointments} />
      <Stack.Screen name="ReportsScreen" component={ReportsScreen} />
      <Stack.Screen name="DOHandbookScreen" component={DOHandbookScreen} />
      <Stack.Screen name="ViolationsScreen" component={ViolationsScreen} />
      <Stack.Screen name="IncidentReportsScreen" component={IncidentReportsScreen} />
      <Stack.Screen name="HandbookScreen" component={HandbookScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      
    </Stack.Navigator>
</NavigationContainer>

  );
}

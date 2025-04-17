import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './firebaseConfig';  // Firebase auth import
import { onAuthStateChanged } from 'firebase/auth';  // Firebase auth state listener
import LoginScreen from './components/pages/LoginScreen';  // Login screen import
import HomeScreen from './components/pages/HomeScreen';    // Home screen import
import DOHomeScreen from './components/DOpages/DOHomeScreen';  // DOHome screen import
import MenuScreen from './components/pages/MenuScreen';  // Menu screen import
import ViolationsScreen from './components/pages/ViolationsScreen';  // Violations screen import
import StudentProfileScreen from './components/pages/ProfileScreen';  // Student Profile screen import
import DOViolations from './components/DOpages/DOViolations';  // DO Violations screen import
import DOStudentList from './components/DOpages/DOStudentList';  // DO Student List screen import
import IncidentReports from './components/DOpages/IncidentReports';  // DO Incident Reports screen import
import DOAppointments from './components/DOpages/DOAppointments';  // DO Appointments screen import
import ReportsScreen from './components/DOpages/ReportsScreen';  // Reports screen import
import DOHandbookScreen from './components/DOpages/DOHandbookScreen';  // DO Handbook screen import
import IncidentReportsScreen from './components/pages/IncidentReportsScreen';  // Incident Reports screen import
import HandbookScreen from './components/pages/HandbookScreen';  // Handbook screen import

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Track authentication state
  const [userRole, setUserRole] = useState(''); // Track user role ('admin/student')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUserRole(user.email === 'admin@email.com' ? 'admin' : 'student');  // Check role based on email
        setIsAuthenticated(true);  // If authenticated, set to true
      } else {
        setIsAuthenticated(false);  // If not authenticated, set to false
      }
    });

    return () => unsubscribe();  // Cleanup listener
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Conditional Screen Rendering */}
        {isAuthenticated ? (
          userRole === 'admin' ? (
            <>
              <Stack.Screen name="DOHomeScreen" component={DOHomeScreen} />
              <Stack.Screen name="MenuScreen" component={MenuScreen} />
              <Stack.Screen name="DOViolations" component={DOViolations} />
              <Stack.Screen name="DOStudentList" component={DOStudentList} />
              <Stack.Screen name="DOIncidentReports" component={IncidentReports} />
              <Stack.Screen name="DOAppointments" component={DOAppointments} />
              <Stack.Screen name="ReportsScreen" component={ReportsScreen} />
              <Stack.Screen name="DOHandbookScreen" component={DOHandbookScreen} />
              <Stack.Screen name="ViolationsScreen" component={ViolationsScreen} />

            </>
          ) : (
            <>
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="StudentProfile" component={StudentProfileScreen} />
              <Stack.Screen name="ViolationsScreen" component={ViolationsScreen} />
              <Stack.Screen name="IncidentReportsScreen" component={IncidentReportsScreen} />
              <Stack.Screen name="HandbookScreen" component={HandbookScreen} />
              <Stack.Screen name="MenuScreen" component={MenuScreen} />

            </>
          )
        ) : (
          <Stack.Screen name="LoginScreen" component={LoginScreen} />  // Login screen if not authenticated
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

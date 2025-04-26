import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './components/backend/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { Text } from 'react-native';

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
import RedirectScreen from './components/pages/RedirectScreen'; 
import ViolationDetailsScreen from './components/pages/ViolationDetailsScreen'; 
import ViolationSlipScreen from './components/pages/ViolationSlipScreen'; 
import ChatPortalScreen from './components/pages/ChatPortalScreen';
import DOStudentProfile from './components/DOpages/DOStudentProfile';
import ViolationRecord from './components/DOpages/ViolationRecord';
const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [student, setStudent] = useState(null); // Assuming you have a student object to pass 
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserRole(user.email === 'darthzcellen@gmail.com' ? 'admin' : 'student');
        setIsAuthenticated(true);
        
        // Fetch student data after user is authenticated
        const userDocRef = doc(firestore, "users", user.email);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const studentData = userDoc.data();
          setStudent(studentData);  // Set the student data
        } else {
          console.log("No student data found");
        }
      } else {
        setIsAuthenticated(false);
        setUserRole('');
        setStudent(null);  // Reset student data when logged out
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="RedirectScreen"
        component={RedirectScreen}
        initialParams={{ isAuthenticated, userRole, student }} // Pass student data here if available
      />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DOHomeScreen" component={DOHomeScreen} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} initialParams={{ userRole, student }} />
      <Stack.Screen name="DOViolations" component={DOViolations} />
      <Stack.Screen name="DOStudentList" component={DOStudentList} />
      <Stack.Screen name="StudentProfileScreen" component={StudentProfileScreen} />
      <Stack.Screen name="DOIncidentReportsScrre" component={IncidentReports} />
      <Stack.Screen name="DOAppointments" component={DOAppointments} />
      <Stack.Screen name="ReportsScreen" component={ReportsScreen} />
      <Stack.Screen name="DOHandbookScreen" component={DOHandbookScreen} />
      <Stack.Screen name="ViolationsScreen" component={ViolationsScreen} />
      <Stack.Screen name="IncidentReportsScreen" component={IncidentReportsScreen} />
      <Stack.Screen name="HandbookScreen" component={HandbookScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ViolationDetailsScreen" component={ViolationDetailsScreen} />
      <Stack.Screen name="ViolationSlipScreen" component={ViolationSlipScreen} />
      <Stack.Screen name="ChatPortalScreen" component={ChatPortalScreen} />
      <Stack.Screen name="DOStudentProfileScreen" component={DOStudentProfile} />
      <Stack.Screen name="ViolationRecord" component={ViolationRecord} />

      
    </Stack.Navigator>
</NavigationContainer>

  );
}

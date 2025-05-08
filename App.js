import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import { UserProvider, UserContext } from './components/contexts/UserContext'; // ✅ import context


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
import DOIncidentReportsScreen from './components/DOpages/IncidentReports'; 

const Stack = createStackNavigator();

const AppNavigation = () => {
  const { loading } = useContext(UserContext); // ✅ global loading state

  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RedirectScreen" component={RedirectScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DOHomeScreen" component={DOHomeScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="DOViolations" component={DOViolations} />
        <Stack.Screen name="DOStudentList" component={DOStudentList} />
        <Stack.Screen name="StudentProfileScreen" component={StudentProfileScreen} />
        <Stack.Screen name="DOIncidentReportsScrre" component={IncidentReports} />
        <Stack.Screen name="DOAppointments" component={DOAppointments} />
        <Stack.Screen name="DOIncidentReports" component={DOIncidentReportsScreen} />
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
};
export default function App() {
  return (
    <UserProvider>
      <AppNavigation />
    </UserProvider>
  );
}
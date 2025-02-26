import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/pages/LoginScreen';
import HomeScreen from './components/pages/HomeScreen';
import ProfileScreen from './components/pages/ProfileScreen';
import ViolationsScreen from './components/pages/ViolationsScreen';
import ViolationDetailsScreen from './components/pages/ViolationDetailsScreen';
import IncidentReportFormScreen from './components/pages/IncidentReportsFormScreen';
import IncidentReportsScreen from './components/pages/IncidentReportsScreen';
import ViolationSlipScreen from "./components/pages/ViolationSlipScreen";
import ChatPortalScreen from "./components/pages/ChatPortalScreen";
import AppointmentsScreen from './components/pages/AppoinmentsScreen';
import CalendarView from './components/parts/CalendarView';
import HandbookScreen from './components/pages/HandbookScreen';
import DOHomeScreen from './components/DOpages/DOHomeScreen';
import ComplaintsList from './components/parts/ComplaintsList';






const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Violations" component={ViolationsScreen} />
        <Stack.Screen name="ViolationDetails" component={ViolationDetailsScreen} />
        <Stack.Screen name="IncidentReports" component={IncidentReportsScreen} />
        <Stack.Screen name="IncidentReportForm" component={IncidentReportFormScreen} />
        <Stack.Screen name="ViolationSlip" component={ViolationSlipScreen} />
        <Stack.Screen name="ChatPortal" component={ChatPortalScreen} />
        <Stack.Screen name="Appoinments" component={AppointmentsScreen} />
        <Stack.Screen name="CalendarView" component={CalendarView} />
        <Stack.Screen name="Handbook" component={HandbookScreen} />
        <Stack.Screen name="DOHome" component={DOHomeScreen} />
        <Stack.Screen name="ComplaintsList" component={ComplaintsList} />
     
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { auth } from '../backend/firebaseConfig'; // Import Firebase auth
import { signOut } from 'firebase/auth';  // Import Firebase signOut

const screenTitles = {
  HomeScreen: "Home",
  ProfileScreen: "Student Profile",
  ViolationsScreen: "Violations",
  IncidentReportsScreen: "Incident Reports",
  AppointmentScreen: "Appointments",
  HandbookScreen: "Student Handbook",
  DOHomeScreen: "Dashboard",
  DOStudentList: "Student List",
  DOStudentProfileScreen: "Student Profile",
  DOViolations: "Violations",
  DOIncidentReports: "Incident Reports",
  DOAppointments: "Appointments",
  ViolationRecord: "Violation Record",
  ChatPortal: "Chat Portal",
  ReportsScreen: "Reports",
  DOHandbookScreen: "Handbook",
};

const Header = ({ openMenu }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const title = screenTitles[route.name] || "App";

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: handleLogout },
    ]);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // This will trigger onAuthStateChanged to set isAuthenticated to false
      // After logging out, navigate to the login screen
      navigation.replace('LoginScreen'); // Or any other screen you want to navigate to after logout
    } catch (error) {
      console.error("Error signing out: ", error);
      Alert.alert("Error", "There was a problem logging out. Please try again.");
    }
  };

  const handleNotification = () => {
    Alert.alert("Notification", "Notification button clicked!");
  };

  return (
    <View style={styles.container}>
      {/* Menu Button */}
      <TouchableOpacity onPress={() => navigation.navigate('MenuScreen')} style={styles.menuWrapper}>
        <Image source={require("../../assets/menu.png")} style={styles.menuIcon} />
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Right Icons */}
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={handleNotification} style={styles.iconButton}>
          <Image source={require("../../assets/notif.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={confirmLogout} style={styles.iconButton}>
          <Image source={require("../../assets/logout.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F8FA",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuWrapper: {
    backgroundColor: "#0F296F",
    borderRadius: 6,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  menuIcon: {
    width: 22,
    height: 22,
    tintColor: "#fff",
  },
  titleWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#555",
  },
});

export default Header;

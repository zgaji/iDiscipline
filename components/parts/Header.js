import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";


const screenTitles = {
  Home: "Home",
  Profile: "Student Profile",
  Violations: "Violations",
  IncidentReports: "Incident Reports",
  Appointments: "Appointments",
  Handbook: "Student Handbook",
  DOHome: "Dashboard",
  DOStudentList: "Student List",
  DOStudentProfile: "Student Profile",
  DOViolations: "Violations",
  DOIncidentReports: "Incident Reports",
  DOAppointments: "Appointments",
  ViolationRecord: "Violation Record",
  ChatPortal: "Chat Portal",
  ReportsScreen: "Reports",
  DOHandbookScreen: "Handbook",
};

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const title = screenTitles[route.name] || "App";

  // Confirm logout function
  const confirmLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: handleLogout }
      ]
    );
  };

  // Logout function
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  // Notification alert
  const handleNotification = () => {
    Alert.alert("Notification", "Notification button clicked!");
  };

  return (
    <View style={styles.container}>
    {/* Logout Button (Left) */}
    <TouchableOpacity onPress={confirmLogout} style={[styles.iconButton, styles.logoutButton]}>
      <Image source={require("../../assets/logout.png")} style={styles.icon} />
    </TouchableOpacity>

    {/* Centered Title */}
    <Text style={styles.title}>{title}</Text>

    {/* Notification Button (Right) */}
    <TouchableOpacity onPress={handleNotification} style={[styles.iconButton, styles.notifButton]}>
      <Image source={require("../../assets/notif.png")} style={styles.icon} />
    </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Keeps title centered
    backgroundColor: "#F5F8FA",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  iconButton: {
    position: "absolute",
    top: 18, // Adjusts vertical alignment
  },
  logoutButton: {
    left: 15, // Keeps logout button on the left
  },
  notifButton: {
    right: 15, // Keeps notification button on the right
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#555",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
});

export default Header;

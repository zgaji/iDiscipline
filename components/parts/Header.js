import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

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

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const handleNotification = () => {
    Alert.alert("Notification", "Notification button clicked!");
  };

  return (
    <View style={styles.container}>
      {/* Left: Menu Button with Square Background */}
      <TouchableOpacity onPress={openMenu} style={styles.menuWrapper}>
        <Image source={require("../../assets/menu.png")} style={styles.menuIcon} />
      </TouchableOpacity>

      {/* Center Title */}
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
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F8FA",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuWrapper: {
    backgroundColor: "#0144F2",
    borderRadius: 6,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, // Ensure the menu button is on top of other elements
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
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

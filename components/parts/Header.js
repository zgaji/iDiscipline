import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const screenTitles = {
  Home: "Dashboard",
  Profile: "Student Profile",
  Violations: "Violations",
  IncidentReports: "Incident Reports",
  Appointments: "Appointments",
  Handbook: "Student Handbook",
  DOHome: "Admin Dashboard",
};

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const title = screenTitles[route.name] || "App";

  // Logout function
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }], // Navigate to Login and clear history
    });
  };

  return (
    <View style={styles.container}>
      {/* Logout Button on the Left */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <FontAwesome name="sign-out" size={24} color="white" />
      </TouchableOpacity>

      {/* Centered Title */}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0056FF",
    paddingHorizontal: 15,
  },
  logoutButton: {
    position: "absolute",
    left: 15, // Keep it aligned to the left
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

export default Header;

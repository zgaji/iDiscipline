import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Platform, ToastAndroid } from "react-native";
import Header from "../parts/Header";  // Make sure Header exists and is properly exported
import MenuBar from "../parts/MenuBar";  // Ensure MenuBar component is available
import CalendarView from "../parts/CalendarView";  // Check CalendarView component for correct import

const AppointmentsScreen = () => {

  const handleChatbotClick = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT); // Show Toast on Android
    } else {
      // Optionally handle iOS or other platform behavior
      console.log("Chatbot clicked");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <View style={{ marginBottom: 15 }}>
        <Header title="Appointments" /> {/* Ensure Header component works */}
      </View>
      <CalendarView /> {/* Make sure CalendarView renders correctly */}

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleChatbotClick}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,  // To add shadow effect on Android
  },
  fabIcon: {
    width: 30,
    height: 30,
    tintColor: "#fff", // Icon color (white)
  },
});

export default AppointmentsScreen;

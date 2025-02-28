import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Platform, ToastAndroid} from "react-native";
import Header from "../parts/Header";
import MenuBar from "../parts/MenuBar";
import CalendarView from "../parts/CalendarView";

const AppointmentsScreen = () => {

  const handleChatbotClick = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
    } 
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
    <View style={{ marginBottom: 15 }}> 
      <Header title="Appointments" />
    </View>
    <View style={{ marginBottom: 15 }}> 
      <MenuBar />
    </View>
      <CalendarView />

      <TouchableOpacity style={styles.fab} onPress={handleChatbotClick}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
  },

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
    elevation: 5,
  },
  fabIcon: {
    width: 30,
    height: 30,
    tintColor: "#fff", // Keeps icon color consistent
  },
});

export default AppointmentsScreen;

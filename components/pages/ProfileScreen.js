import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Platform, ToastAndroid } from "react-native";
import Header from "../parts/Header";
import MenuBar from "../parts/MenuBar";
import StudentCard from "../parts/StudentCard";
import InfoCard from "../parts/InfoCard";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native'; // ✅

const ProfileScreen = () => {
  const route = useRoute();
  const { userRole } = route.params || {}; // ✅ Grab userRole

  const handleChatbotClick = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
    } 
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20 }}>
      <View style={{ marginBottom: 15 }}> 
        <Header title="Student Profile" />
      </View>

      <StudentCard />
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <InfoCard
          title="Student Details"
          details={{
            "First Name": "",
            "Middle Name": "",
            "Last Name": "",
            Gender: "",
            "Birth Date": "",
            Address: "",
          }}
        />
        <InfoCard
          title="Emergency Contact"
          details={{
            "Parent/Guardian": "",
            Email: "",
            "Contact Number": "",
          }}
          titleStyle={{ color: "red", fontStyle: "italic" }}
        />
      </ScrollView>

      {/* Floating Chatbot Button */}
      <TouchableOpacity style={styles.fab} onPress={handleChatbotClick}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>
    </SafeAreaView>
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
    elevation: 5,
  },
  fabIcon: {
    width: 30,
    height: 30,
    tintColor: "#fff", 
  },
});
export default ProfileScreen;

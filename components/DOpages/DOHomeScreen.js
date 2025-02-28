import React from "react";
import { View, ScrollView, StyleSheet,TouchableOpacity,Platform,ToastAndroid,Image } from "react-native";
import Header from "../parts/Header";
import MenuBar from "../parts/DOMenuBar";
import DOStatCard from "../parts/DOStatCard"; // ✅ Updated import
import ComplaintsList from "../parts/ComplaintsList";

const DOHomeScreen = () => {  
  const showToast = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
    } 
  };

  const stats = [
    { title: "Violations", icon: require("../../assets/violation.png"), count: 0, bgColor: "#FF5E5B" },
    { title: "Students", icon: require("../../assets/inc.png"), count: 0, bgColor: "#2BC999" },
    { title: "Appointments", icon: require("../../assets/appointment.png"), count: 0, bgColor: "#2C62FF" },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <View style={{ marginBottom: 15 }}> 
        <Header title="DO Home" />
      </View>
      <MenuBar activeTab="Home"/>

      
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* DOStatCards */}
        <View style={styles.cardRow}>
          {stats.map((item, index) => (
            <DOStatCard
              key={index}
              title={item.title}
              icon={item.icon}
              count={item.count}
              bgColor={item.bgColor}
            />
          ))}
        </View>

        {/* Complaints Section */}
        <ComplaintsList />
      </ScrollView>

      
      {/* Floating Chatbot Button */}
      <TouchableOpacity style={styles.fab} onPress={showToast}>
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
  content: {
    padding: 20,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
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

export default DOHomeScreen; // ✅ Updated export


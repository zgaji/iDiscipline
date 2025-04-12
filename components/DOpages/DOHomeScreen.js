import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Platform, ToastAndroid, Text, Image } from "react-native";
import Header from "../parts/Header";
import MenuBar from "../parts/DOMenuBar";
import DOStatCard from "../parts/DOStatCard"; 
import AppointmentCard from "../parts/AppointmentCard"; // Add the AppointmentCard component

const DOHomeScreen = () => {  
  const showToast = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
    } 
  };

  const stats = [
    { title: "Violation", count: 0, bgColor: "#FF5E5B", icon: require("../../assets/violation.png") },
    { title: "Incident Reports", count: 0, bgColor: "#2BC999", icon: require("../../assets/inc.png") },
    { title: "Appointment", count: 0, bgColor: "#2C62FF", icon: require("../../assets/appointment.png") },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}> 
        <Header title="Dashboard" />
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* DOStatCards */}
        <View style={styles.cardContainer}>
          {stats.map((item, index) => (
            <View style={styles.cardRow} key={index}>
              <DOStatCard
                title={item.title}
                icon={item.icon}
                count={item.count}
                bgColor={item.bgColor}
              />
            </View>
          ))}
        </View>

        {/* Upcoming Appointments Section */}
        <View style={styles.appointmentsSection}>
          <Text style={styles.sectionTitle}>Upcoming Appointments</Text>

          {/* Add Appointment Cards */}
          <AppointmentCard title="Student Counselling" date="2025-04-10" time="10:00 AM" />
          <AppointmentCard title="Student Counselling" date="2025-04-12" time="2:00 PM" />
        </View>
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
    backgroundColor: "#F4F9FC",
    padding: 20,
    marginTop: 30,
  },
  headerContainer: {
    marginBottom: 15,
  },
  content: {
    padding: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  appointmentsSection: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "#007AFF", // Blue title
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
    tintColor: "#fff",
  },
});

export default DOHomeScreen;

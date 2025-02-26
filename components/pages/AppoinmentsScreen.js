import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../parts/Header";
import MenuBar from "../parts/MenuBar";
import CalendarView from "../parts/CalendarView";

const AppointmentsScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Appointment" />
      <MenuBar activeTab="Appointments" />
      <CalendarView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
  },
});

export default AppointmentsScreen;

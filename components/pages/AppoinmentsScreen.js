import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../parts/Header";
import MenuBar from "../parts/MenuBar";
import CalendarView from "../parts/CalendarView";

const AppointmentsScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
    <View style={{ marginBottom: 15 }}> 
      <Header title="Appointments" />
    </View>
    <View style={{ marginBottom: 15 }}> 
      <MenuBar />
    </View>
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

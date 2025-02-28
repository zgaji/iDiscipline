import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DOMenuBar from "../parts/DOMenuBar";
import AppointmentsMenu from "../parts/AppointmentsMenu";
import Header from "../parts/Header";

const DOAppointments = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddAppointment = () => {
    Alert.alert(
      "Set an Appointment",
      "Case:\n\nDate and Time:\n\nNote:",
      [
        {
          text: "Set appointment",
          onPress: () => console.log("Appointment Set"),
          style: "default",
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancelled"),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <View style={{ marginBottom: 15 }}> 
        <Header title="Appointments" />
      </View>
      <DOMenuBar activeTab="Appointments"/>

      <View style={styles.content}>
        <Text style={styles.title}>Appointments</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <FontAwesome name="times-circle" size={20} color="#aaa" />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filter */}
        <AppointmentsMenu />

        {/* Add Appointment Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddAppointment}>
          <Text style={styles.addButtonText}>Add new appointment</Text>
        </TouchableOpacity>

        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <Text style={styles.yearText}>2025</Text>
            <Text style={styles.monthText}>February</Text>
            <Text style={styles.nextText}>Next</Text>
          </View>

          {/* Weekdays */}
          <View style={styles.weekdays}>
            {["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"].map((day) => (
              <Text key={day} style={styles.weekdayText}>
                {day}
              </Text>
            ))}
          </View>

          {/* Dummy Calendar Grid */}
          <View style={styles.datesGrid}>
            {[...Array(28)].map((_, index) => (
              <Text key={index} style={styles.dateText}>
                {index + 1}
              </Text>
            ))}
          </View>
        </View>

        {/* Appointment List Table */}
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={styles.tableRowHeader}>
              <Text style={styles.tableHeader}>Status</Text>
              <Text style={styles.tableHeader}>First Name</Text>
              <Text style={styles.tableHeader}>Last Name</Text>
              <Text style={styles.tableHeader}>Case No.</Text>
              <Text style={styles.tableHeader}>Type</Text>
            </View>

            {/* Dummy Data */}
            {[1, 2, 3].map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>Pending</Text>
                <Text style={styles.tableCell}>John</Text>
                <Text style={styles.tableCell}>Doe</Text>
                <Text style={styles.tableCell}>2025-{index + 1}</Text>
                <Text style={styles.tableCell}>PTC</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Floating Action Button */}
        <TouchableOpacity style={styles.floatingButton}>
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 15,
  },

  content: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
  },
  addButton: {
    backgroundColor: "#2ECC71",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  calendarContainer: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  yearText: {
    fontSize: 14,
    color: "#555",
  },
  monthText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  nextText: {
    fontSize: 14,
    color: "#007BFF",
  },
  weekdays: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  weekdayText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  datesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dateText: {
    width: "14%",
    textAlign: "center",
    paddingVertical: 5,
    fontSize: 14,
  },
  table: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 3,
    minWidth: "100%",
  },
  tableRowHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 14,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#0056FF",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default DOAppointments;

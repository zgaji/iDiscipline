import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView,Platform,ToastAndroid} from "react-native";
import Header from "../parts/Header";
import MenuBar from "../parts/DOMenuBar";
import StudentCard from "../parts/StudentCard";
import DOViolationCard from "../parts/DOViolationCard";


const ViolationRecord = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const violations = [
    { type: "Bullying", count: 2 },
    { type: "Major", count: 3 },
    { type: "Minor", count: 4 },
    { type: "Bullying", count: 5 },
  ];

  const showToast = () => {
    if (Platform.OS === "android") {
        ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
      } 
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <View style={{ marginBottom: 15 }}> 
        <Header title="DOViolations" />
      </View>
      <MenuBar activeTab="DOViolations"/>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Violation Record Header */}
        <Text style={styles.sectionTitle}>Violation Record</Text>


        <StudentCard></StudentCard>
        <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["All", "Major Offense", "Minor Offense"].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterButton, selectedFilter === filter && styles.activeFilter]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[styles.filterText, selectedFilter === filter && styles.activeFilterText]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {violations.map((violation, index) => (
          <DOViolationCard key={index} type={violation.type} count={violation.count} />
        ))}
      </ScrollView>
      </ScrollView>

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
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  profileHeader: {
    backgroundColor: "#0057FF",
    height: 30,
  },
  profileBody: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileText: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    color: "#666",
  },
  filterSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginHorizontal: 6,
    elevation: 3, 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  activeFilter: {
    backgroundColor: "#0057FF",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  activeFilterText: {
    color: "#fff",
  },
  listContainer: {
    paddingBottom: 80, // Prevents overlap with floating button
  },
  violationCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  violationTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  violationCount: {
    fontSize: 16,
    color: "#555",
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

export default ViolationRecord;

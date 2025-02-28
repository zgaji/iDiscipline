import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import Header from "../parts/Header";
import MenuBar from "../parts/MenuBar";
import ViolationCard from "../parts/ViolationCard";

const ViolationsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Highest");

  const violations = [
    { type: "Bullying", count: 2 },
    { type: "Major", count: 3 },
    { type: "Minor", count: 4 },
    { type: "Bullying", count: 5 },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <View style={{ marginBottom: 15 }}> 
        <Header title="Violations" />
      </View>
      <View style={{ marginBottom: 15 }}> 
        <MenuBar />
      </View>

      {/* Filter Section */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Violation Records</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={sortOrder}
            onValueChange={(itemValue) => setSortOrder(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Highest" value="Highest" />
            <Picker.Item label="Lowest" value="Lowest" />
          </Picker>
        </View>
      </View>

      {/* Category Buttons */}
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

      {/* Scrollable Violation Records */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {violations.map((violation, index) => (
          <ViolationCard key={index} type={violation.type} count={violation.count} />
        ))}
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity style={styles.fab}>
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  picker: {
    height: 30,
    width: 120,
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 15,
    paddingHorizontal: 22,
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
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default ViolationsScreen;

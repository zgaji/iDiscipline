import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../parts/Header";
import MenuBar from "../parts/MenuBar";
import ViolationCard from "../parts/ViolationCard";

const ViolationsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const violations = [
    { type: "Bullying", count: 2 },
    { type: "Major", count: 3 },
    { type: "Minor", count: 4 },
    { type: "Bullying", count: 5 },
  ];

  return (
    <View style={styles.container}>
      <Header title="Violations" />
      <MenuBar />

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["All", "Major Offense", "Minor Offense"].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterButton, selectedFilter === filter && styles.activeFilter]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[styles.filterText, selectedFilter === filter && styles.activeFilterText]}>{filter}</Text>
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
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
    paddingHorizontal: 20,
  },
  filterContainer: {
    marginVertical: 10,
    flexDirection: "row",
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#E5E5E5",
    borderRadius: 20,
    marginHorizontal: 5,
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

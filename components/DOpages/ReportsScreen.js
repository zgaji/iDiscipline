import React, { useState } from "react";
import { View, Text, StyleSheet,Platform,ToastAndroid,Image, TouchableOpacity, ScrollView, } from "react-native";
import DOMenuBar from "../parts/DOMenuBar";
import Header from "../parts/Header";


const ReportsScreen = () => {
    const [selectedFilter, setSelectedFilter] = useState("All");
    const handleChatbotClick = () => {
      if (Platform.OS === "android") {
        ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
      } 
    };

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <View style={{ marginBottom: 15 }}> 
        <Header title="Report" />
      </View>
      <View style={{ marginBottom: 15 }}> 
        <DOMenuBar activeTab="Report"/>
      </View>
      {/* Page Title */}
      <Text style={styles.title}>Reports</Text>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["All", "Incident Report", "Archive"].map((filter) => (
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

      {/* Placeholder for Reports Content */}
      <View style={styles.contentPlaceholder}>
        <Text style={styles.chartPlaceholder}>📊 Chart Data Here</Text>
      </View>

          <TouchableOpacity style={styles.fab} onPress={handleChatbotClick}>
            <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
          </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contentPlaceholder: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartPlaceholder: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
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
    alignItems: "center",
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
});

export default ReportsScreen;

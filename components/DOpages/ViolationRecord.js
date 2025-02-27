import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Header from "../parts/Header";
import MenuBar from "../parts/DOMenuBar";

const ViolationRecord = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  return (
    <View style={styles.container}>
      <Header title="Student List" />
      <MenuBar activeTab="Student List" />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Violation Record Header */}
        <Text style={styles.sectionTitle}>Violation Record</Text>

        {/* Student Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader} />
          <View style={styles.profileBody}>
            <Image source={require("../../assets/user.png")} style={styles.avatar} />
            <View style={styles.profileText}>
              <Text style={styles.name}>Student Name</Text>
              <Text style={styles.details}>Year & Section:</Text>
              <Text style={styles.details}>School Year:</Text>
            </View>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === "All" && styles.activeFilter]}
            onPress={() => setSelectedFilter("All")}
          >
            <Text style={[styles.filterText, selectedFilter === "All" && styles.activeFilterText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === "Major Offense" && styles.activeFilter]}
            onPress={() => setSelectedFilter("Major Offense")}
          >
            <Text style={[styles.filterText, selectedFilter === "Major Offense" && styles.activeFilterText]}>Major Offense</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === "Minor Offense" && styles.activeFilter]}
            onPress={() => setSelectedFilter("Minor Offense")}
          >
            <Text style={[styles.filterText, selectedFilter === "Minor Offense" && styles.activeFilterText]}>Minor Offense</Text>
          </TouchableOpacity>
        </View>

        {/* Violation List */}
        <View style={styles.violationCard}>
          <Text style={styles.violationTitle}>Minor</Text>
          <Text style={styles.violationCount}>3</Text>
        </View>
        <View style={styles.violationCard}>
          <Text style={styles.violationTitle}>Minor</Text>
          <Text style={styles.violationCount}>4</Text>
        </View>
        <View style={styles.violationCard}>
          <Text style={styles.violationTitle}>Bullying</Text>
          <Text style={styles.violationCount}>5</Text>
        </View>
      </ScrollView>
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
    fontSize: 18,
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#E5E5E5",
  },
  activeFilter: {
    backgroundColor: "#0057FF",
  },
  filterText: {
    fontSize: 14,
    color: "#000",
  },
  activeFilterText: {
    color: "#fff",
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
});

export default ViolationRecord;

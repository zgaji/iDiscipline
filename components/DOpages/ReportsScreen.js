import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ReportsMenu from "../parts/ReportsMenu";
import DOMenuBar from "../parts/DOMenuBar";


const ReportsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Top Navigation Menu */}
      <DOMenuBar />

      {/* Page Title */}
      <Text style={styles.title}>Reports</Text>

      {/* Reports Tabs */}
      <ReportsMenu />

      {/* Placeholder for Reports Content */}
      <View style={styles.contentPlaceholder}>
        <Text style={styles.chartPlaceholder}>📊 Chart Data Here</Text>
      </View>
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
    fontSize: 20,
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
});

export default ReportsScreen;

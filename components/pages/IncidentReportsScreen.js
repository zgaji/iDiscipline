import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../parts/Header";
import MenuBar from "../parts/MenuBar";
import IncidentReportCard from "../parts/IncidentReportCard";

const IncidentReportsScreen = () => {
  const navigation = useNavigation();

  const reports = [
    {
      id: 1,
      type: "Incident Report #1",
      date: "Dec 25 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      status: "Reviewed",
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="Complaint" />
      <MenuBar />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Incident Reports</Text>

        {/* Button to Navigate to Report Form */}
        <TouchableOpacity style={styles.reportButton} onPress={() => navigation.navigate("IncidentReportForm")}>
          <Text style={styles.reportButtonText}>Make an Incident Report</Text>
        </TouchableOpacity>

        {/* Incident Report List */}
        {reports.map((report) => (
          <IncidentReportCard key={report.id} report={report} />
        ))}
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity style={styles.fab}>
        <FontAwesome name="cog" size={24} color="white" />
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
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reportButton: {
    alignSelf: "flex-start",
    backgroundColor: "#0057FF",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  reportButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
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

export default IncidentReportsScreen;

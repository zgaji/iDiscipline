import React, { useState } from "react";
import {View, Text, TextInput, ScrollView, TouchableOpacity, Modal, StyleSheet,} from "react-native";
import DOMenuBar from "../parts/DOMenuBar";
import IncidentReportMenu from "../parts/IncidentReportMenu";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../parts/Header";

const IncidentReports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIncident, setSelectedIncident] = useState(null);

  const incidents = [
    {
      status: "Under Review",
      firstName: "John",
      lastName: "Doe",
      type: "Major Offense",
      dateSent: "2-17-2025",
      details: {
        dateTime: "2-17-2025, 10:30 AM",
        location: "Hallway B",
        parties: "John Doe (Offender), Jane Smith (Witness)",
        description: "John Doe was caught vandalizing a classroom door.",
        reportedBy: "Mr. Anderson",
        dateReported: "2-17-2025",
      },
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <View style={{ marginBottom: 15 }}> 
        <Header title="Incident Reports" />
      </View>
      <DOMenuBar activeTab="IncidentReports"/>

      <View style={styles.content}>
        <Text style={styles.title}>Incident Reports</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <FontAwesome name="times-circle" size={20} color="#aaa" />
          </TouchableOpacity>
        </View>

        {/* Category Filter */}
        <IncidentReportMenu />

        {/* Incident List Table */}
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={styles.tableRowHeader}>
              <Text style={[styles.tableHeader, styles.statusCol]}>Status</Text>
              <Text style={styles.tableHeader}>First Name</Text>
              <Text style={styles.tableHeader}>Last Name</Text>
              <Text style={styles.tableHeader}>Type</Text>
              <Text style={styles.tableHeader}>Date Sent</Text>
            </View>

            {incidents.map((incident, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tableRow}
                onPress={() => setSelectedIncident(incident)}
              >
                <View style={[styles.tableCell, styles.statusCol]}>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{incident.status}</Text>
                  </View>
                </View>
                <Text style={styles.tableCell}>{incident.firstName}</Text>
                <Text style={styles.tableCell}>{incident.lastName}</Text>
                <Text style={styles.tableCell}>{incident.type}</Text>
                <Text style={styles.tableCell}>{incident.dateSent}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Floating Button */}
        <TouchableOpacity style={styles.floatingButton}>
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Modal for Incident Details */}
      <Modal visible={!!selectedIncident} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Incident Report</Text>

            <Text style={styles.modalLabel}>Date & Time of the Incident:</Text>
            <Text style={styles.modalText}>{selectedIncident?.details.dateTime}</Text>

            <Text style={styles.modalLabel}>Location:</Text>
            <Text style={styles.modalText}>{selectedIncident?.details.location}</Text>

            <Text style={styles.modalLabel}>Parties Involved:</Text>
            <Text style={styles.modalText}>{selectedIncident?.details.parties}</Text>

            <Text style={styles.modalLabel}>Description of the Incident:</Text>
            <Text style={styles.modalText}>{selectedIncident?.details.description}</Text>

            <Text style={styles.modalLabel}>Reported by:</Text>
            <Text style={styles.modalText}>{selectedIncident?.details.reportedBy}</Text>

            <Text style={styles.modalLabel}>Date Reported:</Text>
            <Text style={styles.modalText}>{selectedIncident?.details.dateReported}</Text>

            {/* Action Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.archiveButton} onPress={() => setSelectedIncident(null)}>
                <Text style={styles.archiveButtonText}>Archive</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.violationButton} onPress={() => setSelectedIncident(null)}>
                <Text style={styles.violationButtonText}>Log as Violation</Text>
              </TouchableOpacity>
            </View>

            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedIncident(null)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  table: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 3,
    marginTop: 10,
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
  statusCol: {
    flex: 1.5,
  },
  statusBadge: {
    backgroundColor: "#FFC107",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Blur effect
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#0056FF",
  },
  modalLabel: {
    fontWeight: "bold",
    marginTop: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  archiveButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  archiveButtonText: { color: "#fff", fontWeight: "bold" },
  violationButton: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
  },
  violationButtonText: { color: "#fff", fontWeight: "bold" },
  closeButton: { position: "absolute", top: 10, right: 10 },
  closeButtonText: { fontSize: 18, fontWeight: "bold" },
});

export default IncidentReports;

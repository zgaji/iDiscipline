import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Image,
  Platform,
  ToastAndroid,
} from "react-native";
import Header from "../parts/Header";
import MenuBar from "../parts/MenuBar";
import IncidentReportCard from "../parts/IncidentReportCard";

const IncidentReportsScreen = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    dateTime: "",
    location: "",
    parties: "",
    description: "",
    reportedBy: "",
    dateReported: "",
  });

  const handleChatbotClick = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
    } 
  };


  const reports = [
    {
      id: 1,
      type: "Incident Report #1",
      date: "Dec 25 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      status: "Reviewed",
      details: {
        dateTime: "Dec 25 2025, 10:30 AM",
        location: "Hallway B",
        parties: "John Doe (Offender), Jane Smith (Witness)",
        description: "John Doe was caught vandalizing a classroom door.",
        reportedBy: "Mr. Anderson",
        dateReported: "Dec 25 2025",
      },
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <View style={{ marginBottom: 15 }}> 
        <Header title="Incident Reports" />
      </View>
      <View style={{ marginBottom: 15 }}> 
        <MenuBar />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Incident Reports</Text>

        <TouchableOpacity style={styles.reportButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.reportButtonText}>Make an Incident Report</Text>
        </TouchableOpacity>

        {reports.map((report) => (
          <IncidentReportCard key={report.id} report={report} onPress={() => setSelectedReport(report)} />
        ))}
      </ScrollView>

      {/* Modal for Viewing Incident Report Details */}
      <Modal visible={!!selectedReport} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedReport(null)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Incident Report</Text>
            {selectedReport && (
              <>
                <Text style={styles.modalLabel}>Date & Time of the Incident:</Text>
                <Text style={styles.modalText}>{selectedReport.details.dateTime}</Text>
                <Text style={styles.modalLabel}>Location:</Text>
                <Text style={styles.modalText}>{selectedReport.details.location}</Text>
                <Text style={styles.modalLabel}>Parties Involved:</Text>
                <Text style={styles.modalText}>{selectedReport.details.parties}</Text>
                <Text style={styles.modalLabel}>Description of the Incident:</Text>
                <Text style={styles.modalText}>{selectedReport.details.description}</Text>
                <Text style={styles.modalLabel}>Reported by:</Text>
                <Text style={styles.modalText}>{selectedReport.details.reportedBy}</Text>
                <Text style={styles.modalLabel}>Date Reported:</Text>
                <Text style={styles.modalText}>{selectedReport.details.dateReported}</Text>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal for Making an Incident Report */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Incident Report</Text>
            <ScrollView contentContainerStyle={styles.formContainer}>
              {["Date & Time of the incident:", "Location:", "Parties Involved (Victim, Offender, Witness):", "Description of the Incident (Factual Narrative):", "Reported by:", "Date Reported:"].map((label, index) => (
                <View key={index} style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>{label}</Text>
                  <TextInput placeholder={label} style={styles.input} />
                </View>
              ))}
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>


      <TouchableOpacity style={styles.fab} onPress={handleChatbotClick}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingBottom: 80 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  reportButton: { backgroundColor: "#0057FF", padding: 10, borderRadius: 10, marginBottom: 15 },
  reportButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  modalBackground: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalContainer: { width: "85%", backgroundColor: "#fff", borderRadius: 10, padding: 20, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  modalLabel: { fontWeight: "bold", marginTop: 10 },
  modalText: { fontSize: 14, marginBottom: 5 },
  inputContainer: { backgroundColor: "#fff", borderRadius: 10, padding: 10, marginBottom: 10, elevation: 2 },
  inputLabel: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  input: { fontSize: 14, color: "#333", padding: 5, borderBottomWidth: 1, borderColor: "#ccc" },
  submitButton: { backgroundColor: "#2BC999", paddingVertical: 10, borderRadius: 10, alignItems: "center", marginTop: 10 },
  submitButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  closeButton: { position: "absolute", top: 10, right: 10 },
  closeButtonText: { fontSize: 16, fontWeight: "bold", color: "#0057FF" },
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
    tintColor: "#fff", 
  },
});

export default IncidentReportsScreen;
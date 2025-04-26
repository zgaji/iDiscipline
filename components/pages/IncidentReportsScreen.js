import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, Image } from "react-native";
import { firestore } from "../backend/firebaseConfig"; // Adjust the import based on your project structure
import { collection, getDocs } from "firebase/firestore";
import Header from "../parts/Header";
import IncidentReportCard from "../parts/IncidentReportCard";
import IncidentReportModal from "../parts/IncidentReportModal";

const IncidentReportsScreen = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "incidentReports"));
      const reportsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReports(reportsData);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleSubmitReport = async (data) => {
    try {
      // Add new report to Firestore
      await addDoc(collection(firestore, "incidentReports"), {
        ...data,
        status: "Under Review",
        incidentReportNo: `Report #${new Date().getTime()}`,
      });
      fetchReports(); // Refresh the reports list
      setModalVisible(false); // Close the modal
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  const handleChatbotClick = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Incident Reports" />

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
            {selectedReport && (
              <>
                <Text style={styles.modalTitle}>Incident {selectedReport.incidentReportNo}</Text>

                <Text style={styles.modalLabel}>Date & Time of the Incident:</Text>
                <Text style={styles.modalText}>{selectedReport.dateTime}</Text>

                <Text style={styles.modalLabel}>Location:</Text>
                <Text style={styles.modalText}>{selectedReport.location}</Text>

                <Text style={styles.modalLabel}>Violation Category:</Text>
                <Text style={styles.modalText}>{selectedReport.violationCategory}</Text>

                <Text style={styles.modalLabel}>Violation Type:</Text>
                <Text style={styles.modalText}>{selectedReport.violationType}</Text>

                <Text style={styles.modalLabel}>Parties Involved
                (Victim, Offender, Witness): </Text>
                <Text style={styles.modalLabel}>Victim:</Text>
                <Text style={styles.modalText}>{selectedReport.victim}</Text>

                <Text style={styles.modalLabel}>Offender:</Text>
                <Text style={styles.modalText}>{selectedReport.offender}</Text>

                <Text style={styles.modalLabel}>Witness:</Text>
                <Text style={styles.modalText}>{selectedReport.witness}</Text>

                <Text style={styles.modalLabel}>Description of the Incident (Factual Narrative):</Text>
                <Text style={styles.modalText}>{selectedReport.description}</Text>

                <Text style={styles.modalLabel}>Reported By:</Text>
                <Text style={styles.modalText}>{selectedReport.reportedBy}</Text>

                <Text style={styles.modalLabel}>Date Reported:</Text>
                <Text style={styles.modalText}>{selectedReport.dateReported}</Text>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal for Adding Incident Report */}
      <IncidentReportModal visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={handleSubmitReport} />

      {/* Floating Action Button for Chatbot */}
      <TouchableOpacity style={styles.fab} onPress={handleChatbotClick}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 },
  content: { paddingHorizontal: 20, paddingBottom: 80 },
  title: { fontSize: 22, fontWeight: "bold", marginTop: 30, marginBottom: 20 },
  reportButton: { backgroundColor: "#0057FF", padding: 8, borderRadius: 20, marginBottom: 15, width: "65%" },
  reportButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold", alignSelf: "center" },
  modalBackground: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalContainer: { width: "85%", backgroundColor: "#fff", borderRadius: 10, padding: 20, elevation: 5 },
  modalTitle: { fontSize: 24, fontWeight: "bold", color: "#0144F2", marginBottom: 15, textAlign: "left" },
  modalLabel: { fontWeight: "bold", color: "#605E5E", marginTop: 10 },
  modalText: { fontSize: 14, marginBottom: 5 },
  closeButton: { position: "absolute", top: 10, right: 15 },
  closeButtonText: { fontSize: 20, fontWeight: "bold", color: "#605E5E" },
  fab: { position: "absolute", bottom: 20, right: 20, backgroundColor: "#007AFF", width: 55, height: 55, borderRadius: 27.5, justifyContent: "center", alignItems: "center", elevation: 5 },
  fabIcon: { width: 30, height: 30, tintColor: "#fff" },
});

export default IncidentReportsScreen;

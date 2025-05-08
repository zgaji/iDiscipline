import React, { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform, TextInput } from "react-native";
import RNHTMLtoPDF from 'react-native-html-to-pdf'; // Import PDF library
import EditViolationModal from "./EditViolationModal"; // Import the Edit Violation Modal

const CaseDetailModal = ({ visible, onClose, caseData, onEdit }) => {
  if (!caseData) return null;

  const [contactParentModalVisible, setContactParentModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleContactParent = () => {
    setContactParentModalVisible(true); // Show the contact parent modal
  };

  const handleContactParentClose = () => {
    setContactParentModalVisible(false); // Close the contact parent modal
  };

  const handleEditCase = () => {
    setEditModalVisible(true); // Open the edit case modal
  };

  // Function to generate and download the PDF
  const handleDownloadPDF = async () => {
    try {
      const htmlContent = `
        <h1>Case #${caseData.id}</h1>
        <p><strong>Student Name:</strong> ${caseData.offender || "N/A"}</p>
        <p><strong>Status:</strong> ${caseData.status || "Pending"}</p>
        <p><strong>Violation Category:</strong> ${caseData.violationCategory || "N/A"}</p>
        <p><strong>Violation Type:</strong> ${caseData.violationType || "N/A"}</p>
        <p><strong>Date & Time Reported:</strong> ${caseData.DateReported + caseData.time || "N/A"}</p>
        <p><strong>Description:</strong> ${caseData.description || "N/A"}</p>
        <hr/>
        <h2>Updates</h2>
        ${caseData.updates && caseData.updates.length > 0
          ? caseData.updates.map((update, index) => (
            `<p>${index + 1}. ${update.title} - ${formatDate(update.date)}</p>`
          )).join('')
          : '<p>No updates available.</p>'
        }
      `;

      const options = {
        html: htmlContent,
        fileName: 'case_details',
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);

      console.log('PDF saved to:', file.filePath);
      Alert.alert('PDF Created', `The PDF has been created and saved at ${file.filePath}`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      Alert.alert('Error', 'Failed to generate the PDF.');
    }
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.caseTitle}>Case #{caseData.id}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Case Info */}
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.infoSection}>
              <Text style={styles.infoItem}>Student Name: {caseData.offender || "N/A"}</Text>
              <Text style={styles.infoItem}>Status: {caseData.status || "Pending"}</Text>
              <Text style={styles.infoItem}>Violation Category: {caseData.violationCategory || "N/A"}</Text>
              <Text style={styles.infoItem}>Violation Type: {caseData.violationType || "N/A"}</Text>
              <Text style={styles.infoItem}>Date & Time Reported: {caseData.DateReported + caseData.time || "N/A"}</Text>
              <Text style={styles.infoItem}>Notes:</Text>
              <Text style={styles.notesText}>{caseData.description || "N/A"}</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Updates Section */}
            <Text style={styles.updateTitle}>Updates</Text>
            <View style={styles.timeline}>
              {caseData.updates && caseData.updates.length > 0 ? (
                caseData.updates.map((update, index) => (
                  <View key={index} style={styles.timelineRow}>
                    <View style={styles.timelineDotLineWrapper}>
                      <View style={styles.timelineDot} />
                      {index !== caseData.updates.length - 1 && <View style={styles.verticalLine} />}
                    </View>
                    <View style={styles.timelineContent}>
                      <Text style={styles.timelineTitle}>{update.title}</Text>
                      <Text style={styles.timelineSubtitle}>{formatDate(update.date)}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={{ fontStyle: "italic", color: "#666" }}>No updates available.</Text>
              )}
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#F4B400" }]} onPress={handleContactParent}>
              <Text style={styles.buttonText}>Contact Parent</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#0F296F" }]}>
              <Text style={styles.buttonText}>Message Student</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#1E88E5" }]} onPress={handleDownloadPDF }>
              <Text style={styles.buttonText}>Print</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#FF5E5B" }]} onPress={handleEditCase}>
              <Text style={styles.buttonText}>Edit Case</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Contact Parent Modal */}
      <Modal transparent={true} visible={contactParentModalVisible} animationType="fade" onRequestClose={handleContactParentClose}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Contact Parent/Guardian</Text>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Text style={styles.infoItem}>Student Name: {caseData.offender || "N/A"}</Text>
              <Text style={styles.infoItem}>Status: {caseData.status || "N/A"}</Text>
              <Text style={styles.infoItem}>Violation Category: {caseData.violationCategory || "N/A"}</Text>
              <Text style={styles.infoItem}>Violation Type: {caseData.violationType || "N/A"}</Text>
              <Text style={styles.infoItem}>Date & Time Reported: {caseData.DateReported || "N/A"}</Text>

              <Text style={styles.label}>Notes:</Text>
              <TextInput style={[styles.input, { height: 80 }]} placeholder="Enter your notes here" multiline />
            </ScrollView>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#4CAF50" }]}>
                <Text style={styles.buttonText}>Send SMS</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#0F296F" }]}>
                <Text style={styles.buttonText}>Send Email</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={handleContactParentClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Edit Violation Modal */}
      <EditViolationModal visible={editModalVisible} onClose={() => setEditModalVisible(false)} violationData={caseData} onSubmit={() => { setEditModalVisible(false); }} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalContainer: { backgroundColor: "#fff", borderRadius: 12, padding: 20, width: "90%", maxHeight: "90%" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  caseTitle: { fontSize: 22, fontWeight: "bold", color: "#0F296F" },
  closeText: { fontSize: 26, fontWeight: "bold", color: "#0F296F" },
  infoSection: { marginTop: 10 },
  infoItem: { fontSize: 14, marginBottom: 5, color: "#333" },
  notesText: { fontSize: 14, fontStyle: "italic", color: "#666", marginTop: 5 },
  divider: { height: 1, backgroundColor: "#ccc", marginVertical: 15 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 15 },
  actionButton: { flex: 1, marginHorizontal: 5, padding: 10, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  label: { fontWeight: "bold", color: "#333", marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, fontSize: 14, marginBottom: 10, color: "#333" },
  closeButton: { marginTop: 20, alignSelf: "center", backgroundColor: "#FF5E5B", padding: 10, borderRadius: 25 },
  closeButtonText: { color: "#fff", fontWeight: "bold" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15, color: "#0F296F" },
  scrollContent: { paddingBottom: 20 },
  timeline: { marginTop: 15, paddingLeft: 20, marginBottom: 20 },
  timelineRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  timelineDotLineWrapper: { position: "relative", alignItems: "center" },
  timelineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#0F296F" },
  verticalLine: { position: "absolute", top: 10, width: 2, height: 25, backgroundColor: "#0F296F" },
  timelineContent: { marginLeft: 10 },
  timelineTitle: { fontSize: 14, fontWeight: "bold", color: "#333" },
  timelineSubtitle: { fontSize: 12, color: "#666" },
});

export default CaseDetailModal;

import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput, Image, Platform, ToastAndroid } from "react-native";
import Header from "../parts/Header";
import MenuBar from "../parts/MenuBar";
import IncidentReportCard from "../parts/IncidentReportCard";

const IncidentReportsScreen = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
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

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const reports = [
    {
      id: 1,
      type: "Incident Report #1",
      date: "April 3, 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      status: "Reviewed",
      details: {
        dateTime: "April 3, 2025, 10:30 AM",
        location: "Garden",
        parties: "Matthew Ke (Offender), Raven Baldueza (Witness)",
        description: "Nagdadabog si Ke.",
        reportedBy: "Raven Baldueza",
        dateReported: "April 3, 2025",
      },
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <Header title="Incident Reports" />
      <MenuBar />

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
                <Text style={styles.modalTitle}>{selectedReport.type}</Text>
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

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>Make a Incident Report</Text>
            
            <ScrollView contentContainerStyle={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Date & Time of the incident:</Text>
                <TextInput style={styles.input} value={formData.dateTime} onChangeText={(text) => handleInputChange('dateTime', text)} />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Location:</Text>
                <TextInput style={styles.input} value={formData.location} onChangeText={(text) => handleInputChange('location', text)} />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Parties Involved (Victim, Offender, Witness):</Text>
                <TextInput style={styles.input} value={formData.partiesInvolved} onChangeText={(text) => handleInputChange('partiesInvolved', text)} />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Description of the Incident (Factual Narrative):</Text>
                <TextInput style={styles.input} value={formData.description} onChangeText={(text) => handleInputChange('description', text)} multiline />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Reported by:</Text>
                <TextInput style={styles.input} value={formData.reportedBy} onChangeText={(text) => handleInputChange('reportedBy', text)} />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Date Reported:</Text>
                <TextInput style={styles.input} value={formData.dateReported} onChangeText={(text) => handleInputChange('dateReported', text)} />
              </View>
              
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit Report</Text>
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
  content: { 
    paddingHorizontal: 20, 
    paddingBottom: 80 
  },
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 10,
  },
  reportButton: { 
    backgroundColor: "#0057FF", 
    padding: 8, 
    borderRadius: 20, 
    marginBottom: 15,
    width: "65%",
  },
  reportButtonText: { 
    color: "#fff", 
    fontSize: 14, 
    fontWeight: "bold",
    alignSelf: "center",
  },
  modalBackground: { 
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.5)", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  modalContainer: { 
    width: "85%", 
    backgroundColor: "#fff", 
    borderRadius: 10, 
    padding: 20, 
    elevation: 5 
  },
  modalTitle: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#0144F2",
    marginBottom: 15, 
    textAlign: "left" 
  },
  modalLabel: { 
    fontWeight: "bold", 
    color: "#605E5E ",
    marginTop: 10 
  },
  modalText: { 
    fontSize: 14, 
    marginBottom: 5 
  },
  inputContainer: { 
    backgroundColor: "#fff", 
    borderRadius: 10, 
    padding: 10, 
    marginBottom: 10,
    elevation: 2 
  },
  inputLabel: { 
    fontSize: 14, 
    fontWeight: "bold", 
    marginBottom: 5 
  },
  input: { 
    fontSize: 14, 
    color: "#605E5E", 
    padding: 5, 
    borderBottomWidth: 1, 
    borderColor: "#ccc" 
  },
  submitButton: { 
    backgroundColor: "#3656D7",
    paddingVertical: 5, 
    borderRadius: 20, 
    marginTop: 10,
    width: "50%",
    alignSelf: "flex-end", 
  },
  submitButtonText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 15,
    alignSelf: "center",
  },
  closeButton: { 
    position: "absolute", 
    top: 10, 
    right: 15 
  },
  closeButtonText: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#605E5E" 
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
    tintColor: "#fff", 
  },
});

export default IncidentReportsScreen;

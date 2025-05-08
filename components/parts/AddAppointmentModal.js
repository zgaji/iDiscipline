import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { firestore } from "../backend/firebaseConfig"; // Import firestore config
import { collection, getDocs, query, where } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker"; // Import DateTimePicker

// Add Appointment Modal Component
const AddAppointmentModal = ({ modalVisible, setModalVisible, handleAddAppointment }) => {
  const [caseNo, setCaseNo] = useState("");
  const [meetingType, setMeetingType] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(new Date()); // Store date as Date object
  const [note, setNote] = useState("");
  const [pendingCases, setPendingCases] = useState([]); // Store pending cases
  const [showDatePicker, setShowDatePicker] = useState(false); // Show or hide the date picker

  // Fetch pending cases from Firestore
  const fetchPendingCases = async () => {
    try {
      const violationsRef = collection(firestore, "violations");
      const q = query(violationsRef, where("status", "==", "pending"));
      const querySnapshot = await getDocs(q);

      const cases = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        caseNo: doc.data().caseNo,
      }));

      setPendingCases(cases);
    } catch (error) {
      console.error("Error fetching pending cases:", error);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      fetchPendingCases(); // Fetch pending cases when the modal opens
    }
  }, [modalVisible]);

  // Function to handle the date change
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || appointmentDate;
    setShowDatePicker(false); // Close the date picker after selecting a date
    setAppointmentDate(currentDate); // Update appointment date state
  };

  const handleSaveAppointment = () => {
    handleAddAppointment();  // Add the appointment logic
    setModalVisible(false); // Close modal after saving
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Set an Appointment</Text>

          {/* Case No Label and Picker */}
          <Text style={styles.label}>Case No</Text>
          <Picker selectedValue={caseNo} onValueChange={setCaseNo} style={styles.input}>
            <Picker.Item label="Select Case No" value="" />
            {pendingCases.length === 0 ? (
              <Picker.Item label="No pending cases" value="" />
            ) : (
              pendingCases.map((caseItem) => (
                <Picker.Item key={caseItem.id} label={caseItem.caseNo} value={caseItem.caseNo} />
              ))
            )}
          </Picker>

          {/* Meeting Type Label and Picker */}
          <Text style={styles.label}>Meeting Type</Text>
          <Picker selectedValue={meetingType} onValueChange={setMeetingType} style={styles.input}>
            <Picker.Item label="Select Meeting Type" value="" />
            <Picker.Item label="PTC" value="PTC" />
            <Picker.Item label="Counselling" value="Counselling" />
          </Picker>

          {/* Appointment Date */}
          <Text style={styles.label}>Appointment Date and Time</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text>{appointmentDate.toLocaleString()}</Text> {/* Format date to show in the picker */}
          </TouchableOpacity>

          {/* DateTimePicker (Visible when clicking on the appointment date input) */}
          {showDatePicker && (
            <DateTimePicker
              value={appointmentDate}
              mode="datetime"
              display="default"
              onChange={handleDateChange}
            />
          )}

          {/* Notes */}
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Note"
            value={note}
            onChangeText={setNote}
            multiline
          />

          {/* Set Appointment Button */}
          <TouchableOpacity style={styles.modalButton} onPress={handleSaveAppointment}>
            <Text style={styles.modalButtonText}>Set appointment</Text>
          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Styles for the modal
const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  modalButton: {
    backgroundColor: "#27AE60",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalCloseButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default AddAppointmentModal;

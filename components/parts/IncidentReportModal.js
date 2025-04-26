import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const IncidentReportModal = ({ visible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    dateTime: "",
    location: "",
    violationCategory: null,
    violationType: null,
    victim: "",
    offender: "",
    witness: "",
    description: "",
    reportedBy: "",
    dateReported: "",
  });

  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      const currentDate = new Date().toLocaleDateString(); // Get current date in a readable format
      setFormData((prevState) => ({
        ...prevState,
        dateReported: currentDate,
      }));
    }
  }, [visible]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDatePicked = (date) => {
    setFormData({ ...formData, dateTime: date.toString() });
    setDateTimePickerVisible(false);
  };

  const validateForm = () => {
    // Check required fields
    if (!formData.dateTime) {
      Alert.alert("Validation Error", "Please select the date and time of the incident.");
      return false;
    }
    if (!formData.location) {
      Alert.alert("Validation Error", "Location is required.");
      return false;
    }
    if (!formData.violationCategory) {
      Alert.alert("Validation Error", "Violation category is required.");
      return false;
    }
    if (!formData.violationType) {
      Alert.alert("Validation Error", "Violation type is required.");
      return false;
    }
    if (!formData.offender) {
      Alert.alert("Validation Error", "Offender is required.");
      return false;
    }
    if (!formData.description) {
      Alert.alert("Validation Error", "Description of the incident is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData); // Only submit if validation is passed
      onClose(); // Close the modal
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Incident Report</Text>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.label}>Date & Time of the incident:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setDateTimePickerVisible(true)}
            >
              <Text style={styles.inputText}>
                {formData.dateTime || "Select date and time"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDateTimePickerVisible}
              mode="datetime"
              onConfirm={handleDatePicked}
              onCancel={() => setDateTimePickerVisible(false)}
            />

            <Text style={styles.label}>Location:</Text>
            <TextInput
              style={styles.input}
              value={formData.location}
              onChangeText={(text) => handleInputChange("location", text)}
            />

            <Text style={styles.label}>Violation Category:</Text>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange("violationCategory", value)}
              value={formData.violationCategory}
              style={pickerStyles}
              items={[
                { label: "Minor", value: "minor" },
                { label: "Major", value: "major" },
              ]}
            />

            <Text style={styles.label}>Violation Type:</Text>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange("violationType", value)}
              value={formData.violationType}
              style={pickerStyles}
              items={[
                { label: "Verbal", value: "verbal" },
                { label: "Physical", value: "physical" },
                { label: "Cyber", value: "cyber" },
                { label: "Late", value: "Late" },
              ]}
            />

            <Text style={styles.label}>Parties Involved</Text>
            <TextInput
              style={styles.input}
              placeholder="Victim"
              value={formData.victim}
              onChangeText={(text) => handleInputChange("victim", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Offender"
              value={formData.offender}
              onChangeText={(text) => handleInputChange("offender", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Witness"
              value={formData.witness}
              onChangeText={(text) => handleInputChange("witness", text)}
            />

            <Text style={styles.label}>Description of the Incident (Factual Narrative):</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              value={formData.description}
              onChangeText={(text) => handleInputChange("description", text)}
              multiline
            />

            <Text style={styles.label}>Reported By:</Text>
            <TextInput
              style={styles.input}
              value={formData.reportedBy}
              onChangeText={(text) => handleInputChange("reportedBy", text)}
            />

            {/* Automatically set the "Date Reported" to the current date */}
            <Text style={styles.label}>Date Reported:</Text>
            <TextInput
              style={styles.input}
              value={formData.dateReported}
              editable={false} // Make this field non-editable since it auto-sets
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit Report</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default IncidentReportModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "95%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E1E1E",
    marginBottom: 10,
    justifyContent: "center",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#605E5E",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  inputText: {
    fontSize: 14,
    color: "#605E5E",
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#0057FF",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

const pickerStyles = {
  inputIOS: {
    fontSize: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    color: "#000",
  },
  inputAndroid: {
    fontSize: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    color: "#000",
  },
};

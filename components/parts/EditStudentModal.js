import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../backend/firebaseConfig";

const yearSectionMap = {
  "7th Grade": ["St. Pedro", "St. Aloysious", "St. Dominic"],
  "8th Grade": ["St. Stephen", "St. Maximillian", "St. Lorenzo"],
  "9th Grade": ["St. Philip", "St. Andrew", "St. Bartholomew"],
  "10th Grade": ["St. Matthew", "St. John", "St. Paul"],
  "11th Grade": ["St. John Bosco", "St. Vincent"],
  "12th Grade": ["St. Benedict", "St. Sebastian"],
};

const EditStudentModal = ({ visible, onClose, student, onSave }) => {
  const [form, setForm] = useState({ ...student });

  useEffect(() => {
    if (student) setForm({ ...student });
  }, [student]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const studentRef = doc(firestore, "users", student.studentEmail);
  
      const updateData = {
        firstName: form.firstName,
        middleName: form.middleName,
        lastName: form.lastName,
        gender: form.gender,
        address: form.address,
        year: form.year,
        section: form.section,
        adviser: form.adviser,
        parentGuardian: form.parentGuardian,
        emergencyEmail: form.emergencyEmail,
        contactNumber: form.contactNumber,
      };
  
      await updateDoc(studentRef, updateData);
  
      Alert.alert("Success", "Student updated successfully");
      onSave();
      onClose();
    } catch (error) {
      Alert.alert("Error", "Failed to update student");
      console.error("Update Error:", error.message);
    }
  };
  
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Edit Student</Text>
          <ScrollView>
            <TextInput
              style={styles.input}
              value={form.firstName}
              onChangeText={(v) => updateField("firstName", v)}
              placeholder="First Name"
            />
            <TextInput
              style={styles.input}
              value={form.middleName}
              onChangeText={(v) => updateField("middleName", v)}
              placeholder="Middle Name"
            />
            <TextInput
              style={styles.input}
              value={form.lastName}
              onChangeText={(v) => updateField("lastName", v)}
              placeholder="Last Name"
            />
            <RNPickerSelect
              onValueChange={(v) => updateField("gender", v)}
              value={form.gender}
              style={pickerStyles}
              items={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
            />
            <TextInput
              style={styles.input}
              value={form.address}
              onChangeText={(v) => updateField("address", v)}
              placeholder="Address"
            />
            <RNPickerSelect
              onValueChange={(v) => {
                updateField("year", v);
                updateField("section", "");
              }}
              value={form.year}
              style={pickerStyles}
              items={Object.keys(yearSectionMap).map((y) => ({ label: y, value: y }))}
            />
            <RNPickerSelect
              onValueChange={(v) => updateField("section", v)}
              value={form.section}
              style={pickerStyles}
              items={(yearSectionMap[form.year] || []).map((s) => ({ label: s, value: s }))}
            />
            <TextInput
              style={styles.input}
              value={form.adviser}
              onChangeText={(v) => updateField("adviser", v)}
              placeholder="Adviser"
            />
            <TextInput
              style={styles.input}
              value={form.parentGuardian}
              onChangeText={(v) => updateField("parentGuardian", v)}
              placeholder="Parent/Guardian"
            />
            <TextInput
              style={styles.input}
              value={form.emergencyEmail}
              onChangeText={(v) => updateField("emergencyEmail", v)}
              placeholder="Emergency Email"
            />
            <TextInput
              style={styles.input}
              value={form.contactNumber}
              onChangeText={(v) => updateField("contactNumber", v)}
              placeholder="Contact Number"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const pickerStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    maxHeight: "90%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#F4B400",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelText: {
    textAlign: "center",
    color: "#007AFF",
    fontSize: 16,
    marginTop: 5,
  },
});

export default EditStudentModal;

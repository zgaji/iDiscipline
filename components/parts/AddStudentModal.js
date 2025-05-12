// AddStudentModal with Supabase Integration (Retained Design and Layout - Fully Optimized)

import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Modal, Alert, Image, ToastAndroid } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import supabase from "../backend/supabaseClient";

// Password Generator Function
const generatePassword = () => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  return password;
};

// Year and Section Map
const yearSectionMap = {
  "7th Grade": ["St. Pedro", "St. Aloysious", "St. Dominic"],
  "8th Grade": ["St. Stephen", "St. Maximillian", "St. Lorenzo"],
  "9th Grade": ["St. Philip", "St. Andrew", "St. Bartholomew"],
  "10th Grade": ["St. Matthew", "St. John", "St. Paul"],
  "11th Grade": ["St. John Bosco", "St. Vincent"],
  "12th Grade": ["St. Benedict", "St. Sebastian"],
};

const AddStudentModal = ({ modalVisible, setModalVisible, onSubmit }) => {
  const [studentNo, setStudentNo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [adviser, setAdviser] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [parentGuardian, setParentGuardian] = useState("");
  const [emergencyEmail, setEmergencyEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const validateForm = () => {
    if (!studentNo || !firstName || !middleName || !lastName || !gender || !address || !year || !section || !adviser || !studentEmail || !parentGuardian || !contactNumber) {
      Alert.alert("Validation Error", "All fields are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);

    const password = generatePassword();

    const studentData = { 
      studentNo, firstName, middleName, lastName, gender, address, year, section, adviser, 
      studentEmail, parentGuardian, emergencyEmail, contactNumber, image, password, role: "student",
    };

    try {
      const { data, error } = await supabase.from("students").insert([studentData]);
      if (error) throw error;

      ToastAndroid.show("Student account created successfully!", ToastAndroid.LONG);
      onSubmit();
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "Failed to create student account.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Create New Student Account</Text>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <TouchableOpacity onPress={pickImage} style={styles.imageUploadContainer}>
              <Text style={styles.uploadText}>Upload Image</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

            <TextInput style={styles.inputField} placeholder="Student No." value={studentNo} onChangeText={setStudentNo} />
            <TextInput style={styles.inputField} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
            <TextInput style={styles.inputField} placeholder="Middle Name" value={middleName} onChangeText={setMiddleName} />
            <TextInput style={styles.inputField} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
            <RNPickerSelect onValueChange={setGender} placeholder={{ label: "Select Gender", value: "" }} items={[{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }]} value={gender} />
            <TextInput style={styles.inputField} placeholder="Address" value={address} onChangeText={setAddress} />
            <TextInput style={styles.inputField} placeholder="Student Email" value={studentEmail} onChangeText={setStudentEmail} />
            <TextInput style={styles.inputField} placeholder="Parent/Guardian" value={parentGuardian} onChangeText={setParentGuardian} />
            <TextInput style={styles.inputField} placeholder="Emergency Email" value={emergencyEmail} onChangeText={setEmergencyEmail} />
            <TextInput style={styles.inputField} placeholder="Contact Number" value={contactNumber} onChangeText={setContactNumber} />

            <TouchableOpacity style={styles.createButton} onPress={handleSubmit} disabled={loading}>
              <Text style={styles.createButtonText}>{loading ? "Creating..." : "Create"}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: { padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 15, backgroundColor: "#fff" },
  inputAndroid: { padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 15, backgroundColor: "#fff" },
});

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalContainer: { backgroundColor: "#fff", borderRadius: 10, padding: 20, width: "90%", maxHeight: "95%" },
  closeButton: { position: "absolute", top: 10, right: 10 },
  closeText: { fontSize: 22 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#0057FF" },
  inputField: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 15 },
  imageUploadContainer: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, alignItems: "center", marginBottom: 15 },
  uploadText: { color: "#0057FF" },
  imagePreview: { width: 100, height: 100, borderRadius: 10, alignSelf: "center", marginBottom: 15 },
  createButton: { backgroundColor: "#F4B400", paddingVertical: 10, borderRadius: 10, alignItems: "center", marginTop: 10 },
  createButtonText: { color: "#fff", fontWeight: "bold" },
});

export default AddStudentModal;

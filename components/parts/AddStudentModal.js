import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Modal, Alert, Image, ToastAndroid } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore, adminAuth } from "../backend/firebaseConfig";
import * as ImagePicker from "expo-image-picker";

const generatePassword = () => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  return password;
};

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
      studentEmail, parentGuardian, emergencyEmail, contactNumber, image,
      password,
      role: "student",
      passwordSent: false
    };
  
    try {
      // ✅ Check if email is already in use
      const signInMethods = await fetchSignInMethodsForEmail(adminAuth, studentEmail);
      if (signInMethods.length > 0) {
        Alert.alert("Validation Error", "This email is already in use. Please use a different email.");
        setLoading(false);
        return;
      }
  
      // ✅ Create user account
      await createUserWithEmailAndPassword(adminAuth, studentEmail, password);
  
      // ✅ Send verification email
      if (adminAuth.currentUser) {
        await sendEmailVerification(adminAuth.currentUser);
        ToastAndroid.show("Verification email sent to student!", ToastAndroid.LONG);
      }
  
      // ✅ Save student data to Firestore
      const userDocRef = doc(firestore, "users", studentEmail);
      await setDoc(userDocRef, studentData);
  
      // ✅ Success message
      ToastAndroid.show("Student account created. Waiting for verification.", ToastAndroid.LONG);
      onSubmit(studentData); // 🎯 Refresh student list
      setModalVisible(false);
    } catch (error) {
      // ✅ User-Friendly Error Handling
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error", "This email is already in use. Please try another.");
      } else {
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
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

            {/* Fields */}
            <TextInput style={styles.inputField} placeholder="Student No." value={studentNo} onChangeText={setStudentNo} />
            <TextInput style={styles.inputField} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
            <TextInput style={styles.inputField} placeholder="Middle Name" value={middleName} onChangeText={setMiddleName} />
            <TextInput style={styles.inputField} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
            <RNPickerSelect
              onValueChange={setGender}
              placeholder={{ label: "Select Gender", value: "" }}
              items={[{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }]}
              style={pickerSelectStyles}
              value={gender}
            />
            <TextInput style={styles.inputField} placeholder="Address" value={address} onChangeText={setAddress} />
            <RNPickerSelect
              onValueChange={(value) => { setYear(value); setSection(""); }}
              placeholder={{ label: "Select Year", value: "" }}
              items={Object.keys(yearSectionMap).map((year) => ({ label: year, value: year }))}
              style={pickerSelectStyles}
              value={year}
            />
            <RNPickerSelect
              onValueChange={setSection}
              placeholder={{ label: "Select Section", value: "" }}
              items={(yearSectionMap[year] || []).map((sec) => ({ label: sec, value: sec }))}
              style={pickerSelectStyles}
              value={section}
            />
            <RNPickerSelect
              onValueChange={setAdviser}
              placeholder={{ label: "Select Adviser", value: "" }}
              items={[{ label: "Adviser 1", value: "Adviser 1" }, { label: "Adviser 2", value: "Adviser 2" }]}
              style={pickerSelectStyles}
              value={adviser}
            />
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

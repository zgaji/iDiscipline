import React, { useState } from "react"; 
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Modal, Alert, Image } from "react-native";
import RNPickerSelect from "react-native-picker-select"; // Import RNPickerSelect for dropdowns
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail, sendPasswordResetEmail } from "firebase/auth";  // Import Firebase Auth
import { doc, setDoc, getFirestore } from "firebase/firestore"; 
import { firestore, auth } from "../backend/firebaseConfig"; // Firebase configuration
import * as ImagePicker from 'expo-image-picker'; // Import Expo Image Picker

// Function to generate a random password
const generatePassword = () => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let password = "";
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
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


// Function to send the generated password email via your backend
const sendPasswordEmail = async (studentEmail, password) => {
  try {
    const response = await fetch('http://localhost:3000/send-password', {  // Replace with your backend URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        toEmail: studentEmail,
        password: password,
      }),
    });

    const result = await response.json();
    if (result.success) {
      console.log('Password email sent successfully');
    } else {
      console.error('Error sending password email');
    }
  } catch (error) {
    console.error('Error in sending password email:', error);
  }
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
  
  // For storing the picked image
  const [image, setImage] = useState(null);

  // Image picker function
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Save the selected image URI
    }
  };

  const validateForm = () => {
    if (!studentNo || !firstName || !middleName || !lastName || !gender || !address || !year || !section || !adviser || !studentEmail || !parentGuardian || !contactNumber) {
      Alert.alert("Validation Error", "All fields are required.");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(studentEmail)) {
      Alert.alert("Validation Error", "Please enter a valid student email.");
      return false;
    }

    const emergencyEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emergencyEmail || !emergencyEmailRegex.test(emergencyEmail)) {
      Alert.alert("Validation Error", "Please enter a valid emergency email.");
      return false;
    }

    if (!/^\d+$/.test(contactNumber)) {
      Alert.alert("Validation Error", "Contact Number must be a numeric value.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const password = generatePassword();  // Generate random password
      const studentData = {
        studentNo,
        firstName,
        middleName,
        lastName,
        gender,
        address,
        year,
        section,
        adviser,
        studentEmail,  
        parentGuardian,
        emergencyEmail,
        contactNumber,
        image, // Add image to student data
      };

      try {
        // Step 1: Check if the email is already in use
        const signInMethods = await fetchSignInMethodsForEmail(auth, studentEmail);

        if (signInMethods.length > 0) {
          // The email is already in use, notify the user
          Alert.alert(
            "Error",
            "This email is already in use. Would you like to reset your password?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Yes", 
                onPress: async () => {
                  try {
                    await sendPasswordResetEmail(auth, studentEmail);
                    Alert.alert("Password Reset", "A password reset email has been sent.");
                  } catch (resetError) {
                    Alert.alert("Error", resetError.message);
                  }
                }
              }
            ]
          );
        } else {
          // Step 2: If the email is not in use, create the user with Firebase Authentication
          await createUserWithEmailAndPassword(auth, studentEmail, password);
          
          // Step 3: Set the student's role and other information in Firestore
          const userDocRef = doc(firestore, "users", studentEmail);  // Create a document in the 'users' collection with student email as ID
          await setDoc(userDocRef, {
            ...studentData,
            password,  // Save the generated password in the Firestore document
            role: "student",  // Set the role to 'student'
          });

          // Step 4: Send Email Verification
          const user = auth.currentUser;
          if (user) {
            await sendEmailVerification(user);  // Send email verification
            Alert.alert("Verification Sent", "A verification email has been sent to the student. Have the student verify the email.");
          }
          // Step 5: Display Success Alert
          Alert.alert("Account Created", "The account has been created. Please verify the email before sending the password.");
          setModalVisible(false);  // Close the modal after successful creation
        }
      } catch (error) {
        console.error("Error creating account: ", error);
        Alert.alert("Error", error.message);  // Show generic error message
      }
    }
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
            <View style={styles.inputGroup}>
              {/* Image Upload Section */}
              <TouchableOpacity onPress={pickImage}>
                <View style={styles.imageUploadContainer}>
                  <Text style={styles.uploadText}>Upload Image</Text>
                </View>
              </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

              {/* Rest of the fields */}
              <Text style={styles.label}>Student No.:</Text>
              <TextInput style={styles.inputField} placeholder="Enter Student No" value={studentNo} onChangeText={setStudentNo} />

              <Text style={styles.label}>First Name:</Text>
              <TextInput style={styles.inputField} placeholder="Enter First Name" value={firstName} onChangeText={setFirstName} />

              <Text style={styles.label}>Middle Name:</Text>
              <TextInput style={styles.inputField} placeholder="Enter Middle Name" value={middleName} onChangeText={setMiddleName} />

              <Text style={styles.label}>Last Name:</Text>
              <TextInput style={styles.inputField} placeholder="Enter Last Name" value={lastName} onChangeText={setLastName} />

              <Text style={styles.label}>Gender:</Text>
              <RNPickerSelect
                onValueChange={(value) => setGender(value)}
                value={gender}
                style={pickerSelectStyles}
                items={[
                  { label: "Select Gender", value: "" },
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                ]}
              />

              <Text style={styles.label}>Address:</Text>
              <TextInput style={styles.inputField} placeholder="Enter Address" value={address} onChangeText={setAddress} />

              <Text style={styles.label}>Year:</Text>
              <RNPickerSelect
                onValueChange={(value) => {
                  setYear(value);
                  setSection(""); // reset section when year changes
                }}
                value={year}
                items={[
                  { label: "Enter Year", value: "" },
                  { label: "7th Grade", value: "7th Grade" },
                  { label: "8th Grade", value: "8th Grade" },
                  { label: "9th Grade", value: "9th Grade" },
                  { label: "10th Grade", value: "10th Grade" },
                  { label: "11th Grade", value: "11th Grade" },
                  { label: "12th Grade", value: "12 Grade" },
                ]}
              />

              <Text style={styles.label}>Section:</Text>
              <RNPickerSelect
                onValueChange={(value) => setSection(value)}
                value={section}
                style={pickerSelectStyles}
                items={
                  year && yearSectionMap[year]
                    ? [
                        { label: "Select Section", value: "" },
                        ...yearSectionMap[year].map((sectionName) => ({
                          label: sectionName,
                          value: sectionName,
                        })),
                      ]
                    : [{ label: "Select Year First", value: "" }]
                }
              />

              <Text style={styles.label}>Adviser:</Text>
              <RNPickerSelect
                onValueChange={(value) => setAdviser(value)}
                value={adviser}
                style={pickerSelectStyles}
                items={[
                  { label: "Enter Adviser Name", value: "" },
                  { label: "Adviser 1", value: "Adviser 1" },
                  { label: "Adviser 2", value: "Adviser 2" },
                ]}
              />

              <Text style={styles.label}>Email (Student):</Text>
              <TextInput style={styles.inputField} placeholder="Enter Student Email" value={studentEmail} onChangeText={setStudentEmail} />

              <Text style={[styles.label, styles.emergencyContact]}>Emergency Contact</Text>
              <Text style={styles.label}>Parent/Guardian:</Text>
              <TextInput style={styles.inputField} placeholder="Enter Parent/Guardian Name" value={parentGuardian} onChangeText={setParentGuardian} />

              <Text style={styles.label}>Email (Emergency):</Text>
              <TextInput style={styles.inputField} placeholder="Enter Emergency Email" value={emergencyEmail} onChangeText={setEmergencyEmail} />

              <Text style={styles.label}>Contact Number:</Text>
              <TextInput style={styles.inputField} placeholder="Enter Contact Number" value={contactNumber} onChangeText={setContactNumber} />
            </View>

            <TouchableOpacity style={styles.createButton} onPress={handleSubmit}>
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// Styles for RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#fff",
    color: "#000",
  },
  inputAndroid: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#fff",
    color: "#000",
  },
});

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%", 
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    maxHeight: "95%",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0057FF",
    textAlign: "center",
    marginBottom: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  inputGroup: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 3,
    color: "#333",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  imageUploadContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    fontSize: 14,
    color: "#0057FF",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 15,
  },
  createButton: {
    backgroundColor: "#F4B400",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddStudentModal;

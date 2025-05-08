import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ToastAndroid,
  Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../backend/firebaseConfig";
import AutoSuggestInput from "../parts/AutoSuggestInput";
import { collection, getDocs, query, where } from "firebase/firestore";

const EditViolationModal = ({ visible, onClose, violationData, onSubmit }) => {
  const [formData, setFormData] = useState({
    caseNo: "",
    status: "Unresolved",
    location: "",
    violationCategory: "",
    violationType: "",
    victim: "",
    offender: "",   // Offender is displayed, but not editable
    offenderId: "", // To store offender's ID (non-editable)
    witness: "",
    description: "",
    DateReported: "",
    reportedBy: "Disciplinary Officer",
    updates: [],
    month: "",
    day: "",
    year: "",
    time: "",
  });
  
  const handleArchive = async () => {
    setIsSubmitting(true);
    try {
      const violationRef = doc(firestore, "violations", formData.id);
  
      const newUpdate = {
        title: "Archived by Disciplinary Officer",
        date: new Date().toISOString(),
      };
      const updatedUpdates = [...(formData.updates || []), newUpdate];
  
      await updateDoc(violationRef, {
        status: "Archived",
        updates: updatedUpdates,
      });
  
      showSuccessToast();
      onSubmit();
      onClose();
    } catch (error) {
      console.error("Error archiving violation:", error);
      Alert.alert("Error", "Failed to archive violation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const violationTypes = [
    { type: "Minor Offense", title: "Tardiness" },
    { type: "Minor Offense", title: "Dress Code Violation" },
    { type: "Minor Offense", title: "Unauthorized Use of Phone" },
    { type: "Minor Offense", title: "Eating in Class" },
    { type: "Minor Offense", title: "Minor Disrespect to Peers" },
    { type: "Major Offense", title: "Bullying" },
    { type: "Major Offense", title: "Fighting or Physical Altercation" },
    { type: "Major Offense", title: "Theft" },
    { type: "Major Offense", title: "Vandalism" },
    { type: "Major Offense", title: "Severe Disrespect to Teacher" },
  ];

  const [students, setStudents] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch student data from Firestore
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const q = query(collection(firestore, "users"), where("role", "==", "student"));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          studentNo: doc.data().studentNo,
          fullName: `${doc.data().firstName} ${doc.data().lastName}`,
          ...doc.data(),
        }));
        setStudents(list);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  // Update form data when modal becomes visible and violation data changes
  useEffect(() => {
    if (visible && violationData) {
      setFormData({ ...violationData });
    }
  }, [visible, violationData]);

  // Handle form input changes (except for the offender field)
  const handleInputChange = (name, value) => {
    if (name === "offender") {
      // Don't allow changing offender; just display it as non-editable
      return;
    }

    // If any changes happen, we add an update to the case updates section
    const newUpdate = {
      title: `${name.charAt(0).toUpperCase() + name.slice(1)} Updated`,
      date: new Date().toISOString(),
    };
    const updatedFormData = { ...formData, [name]: value, updates: [...formData.updates, newUpdate] };
    setFormData(updatedFormData);
  };

  // Validate the form before submitting
  const validateForm = () => {
    const requiredFields = [
      "location", "violationCategory", "violationType", "offender", "description",
      "month", "day", "year", "time"
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        Alert.alert("Validation Error", `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}.`);
        return false;
      }
    }
    return true;
  };

  // Show success toast
  const showSuccessToast = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Violation Updated Successfully!", ToastAndroid.SHORT);
    } else {
      Alert.alert("Success", "Violation Updated Successfully!");
    }
  };

  // Submit the form data to Firestore
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const violationRef = doc(firestore, "violations", formData.id);
      const { id, ...violationWithoutId } = formData;

      await updateDoc(violationRef, violationWithoutId);

      showSuccessToast();
      onSubmit();
      onClose();
    } catch (error) {
      console.error("Error updating violation:", error);
      Alert.alert("Error", "Failed to update violation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredViolationTypes = violationTypes
    .filter((item) => item.type === formData.violationCategory)
    .map((item) => ({ label: item.title, value: item.title }));

  const filteredStudentNames = students.map((s) => ({
    label: `${s.firstName} ${s.lastName}`,
    value: s.studentNo,
  }));

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Edit Violation</Text>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Form Fields */}
            <Text style={styles.label}>CASE NO.</Text>
            <TextInput style={[styles.input, { backgroundColor: "#eee" }]} value={formData.caseNo} editable={false} />

            <Text style={styles.label}>Status</Text>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange("status", value)}
              value={formData.status}
              style={pickerStyles}
              items={[
                { label: "Unresolved", value: "Unresolved" },
                { label: "Resolved", value: "Resolved" },
                { label: "Pending", value: "Pending" },
                { label: "Archived", value: "Archived" },
              ]}
            />

            {/* Date Dropdown */}
            <Text style={styles.label}>Date of the Incident:</Text>
            <View style={styles.dateTimeRow}>
              <RNPickerSelect
                onValueChange={(value) => handleInputChange("month", value)}
                value={formData.month}
                style={pickerStyles}
                placeholder={{ label: "Month", value: "" }}
                items={[
                  { label: "January", value: "January" },
                  { label: "February", value: "February" },
                  { label: "March", value: "March" },
                  { label: "April", value: "April" },
                  { label: "May", value: "May" },
                  { label: "June", value: "June" },
                  { label: "July", value: "July" },
                  { label: "August", value: "August" },
                  { label: "September", value: "September" },
                  { label: "October", value: "October" },
                  { label: "November", value: "November" },
                  { label: "December", value: "December" },
                ]}
              />
              <RNPickerSelect
                onValueChange={(value) => handleInputChange("day", value)}
                value={formData.day}
                style={pickerStyles}
                placeholder={{ label: "Day", value: "" }}
                items={Array.from({ length: 31 }, (_, i) => ({
                  label: `${i + 1}`,
                  value: `${i + 1}`,
                }))}
              />
              <RNPickerSelect
                onValueChange={(value) => handleInputChange("year", value)}
                value={formData.year}
                style={pickerStyles}
                placeholder={{ label: "Year", value: "" }}
                items={Array.from({ length: 100 }, (_, i) => ({
                  label: `${new Date().getFullYear() - i}`,
                  value: `${new Date().getFullYear() - i}`,
                }))}
              />
            </View>

            {/* Time Dropdown */}
            <Text style={styles.label}>Time of the Incident:</Text>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange("time", value)}
              value={formData.time}
              style={pickerStyles}
              placeholder={{ label: "Time", value: "" }}
              items={[
                { label: "12:00 AM", value: "12:00 AM" },
                { label: "1:00 AM", value: "1:00 AM" },
                { label: "2:00 AM", value: "2:00 AM" },
              ]}
            />

            {/* Other Fields */}
            <Text style={styles.label}>Location:</Text>
            <TextInput style={styles.input} value={formData.location} onChangeText={(text) => handleInputChange("location", text)} />

            {/* Violation Category & Type */}
            <Text style={styles.label}>Violation Category:</Text>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange("violationCategory", value)}
              value={formData.violationCategory}
              style={pickerStyles}
              placeholder={{ label: "Select Category", value: "" }}
              items={[
                { label: "Minor", value: "Minor Offense" },
                { label: "Major", value: "Major Offense" },
              ]}
            />
            <Text style={styles.label}>Violation Type:</Text>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange("violationType", value)}
              value={formData.violationType}
              style={pickerStyles}
              placeholder={{
                label: formData.violationCategory ? "Select Violation Type" : "Select Category first",
                value: "",
              }}
              disabled={!formData.violationCategory}
              items={filteredViolationTypes}
            />

            {/* AutoSuggest for Victim, Offender, Witness */}
            {["victim", "witness"].map((field, index) => (
              <AutoSuggestInput
                key={index}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field] || ''}  // Ensure value is never undefined or null
                onChange={(text) => handleInputChange(field, text)}
                suggestions={students.map((s) => s.fullName || '')}  // Ensure each suggestion is a valid string
                placeholder={`Enter ${field} name`}
              />
            ))}

            <Text style={styles.label}>Offender:</Text>
            <TextInput
              style={[styles.input, { backgroundColor: "#eee" }]}
              value={formData.offender}
              editable={false} // Make the offender field non-editable
            />

            <Text style={styles.label}>Description of the Incident:</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              multiline
              value={formData.description}
              onChangeText={(text) => handleInputChange("description", text)}
            />

            {/* Submit & Archive Buttons */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isSubmitting}>
              <Text style={styles.submitButtonText}>{isSubmitting ? "Saving..." : "Update"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.submitButton, { backgroundColor: "#F44336", marginTop: 10 }]} onPress={handleArchive} disabled={isSubmitting}>
              <Text style={styles.submitButtonText}>{isSubmitting ? "Archiving..." : "Archive"}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalContainer: { width: "90%", maxHeight: "95%", backgroundColor: "#fff", borderRadius: 10, padding: 20 },
  closeButton: { position: "absolute", top: 10, right: 10 },
  closeButtonText: { fontSize: 18, fontWeight: "bold", color: "#555" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  scrollContent: { paddingBottom: 20 },
  label: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, fontSize: 14, marginBottom: 10 },
  submitButton: { marginTop: 20, backgroundColor: "#1E88E5", padding: 10, borderRadius: 25, alignItems: "center" },
  submitButtonText: { color: "#fff", fontWeight: "bold" },
});

const pickerStyles = {
  inputIOS: { fontSize: 14, padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, backgroundColor: "#fff", color: "#000" },
  inputAndroid: { fontSize: 14, padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, backgroundColor: "#fff", color: "#000" },
};

export default EditViolationModal;

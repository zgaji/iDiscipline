import React, { useState, useEffect, useContext } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { UserContext } from "../contexts/UserContext";
import supabase from "../backend/supabaseClient"; // ✅ Use Supabase instead


const IncidentReportModal = ({ visible, onClose, onSubmit }) => {
  const { student } = useContext(UserContext);

  const violationTypes = [
    { type: "Minor", title: "Tardiness" },
    { type: "Minor", title: "Dress Code Violation" },
    { type: "Minor", title: "Unauthorized Use of Phone" },
    { type: "Minor", title: "Eating in Class" },
    { type: "Minor", title: "Minor Disrespect to Peers" },
  
    { type: "Major", title: "Bullying" },
    { type: "Major", title: "Fighting or Physical Altercation" },
    { type: "Major", title: "Theft" },
    { type: "Major", title: "Vandalism" },
    { type: "Major", title: "Severe Disrespect to Teacher" },
  ];

  // Get filtered types depending on selected category
  const filteredViolationTypes = formData?.violationCategory
  ? violationTypes.filter((item) => item.type === formData.violationCategory)
  : [];

  const [formData, setFormData] = useState({
    dateTime: "",
    location: "",
    violationCategory: "", 
    violationType: "",     
    victim: "",
    offender: "",
    witness: "",
    description: "",
    reportedBy: student ? `${student.studentNo} - ${student.firstName} ${student.lastName}` : "", 
    dateReported: new Date().toLocaleDateString(),
  });

  const [allStudents, setAllStudents] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [currentField, setCurrentField] = useState("");
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);

  useEffect(() => {
  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from("students") // Replace with your actual table name
        .select("*");

      if (error) throw error;

      const students = data.map((student) => ({
        id: student.studentid, // Match the field name from your Supabase table
        firstName: student.firstname,
        lastName: student.lastname,
      }));

      setAllStudents(students);
    } catch (error) {
      console.error("Error fetching students: ", error);
    }
  };

  if (visible) {
    fetchStudents();
    const currentDate = new Date().toLocaleDateString();
    setFormData({
      dateTime: "",
      location: "",
      violationCategory: "",
      violationType: "",
      victim: "",
      offender: "",
      witness: "",
      description: "",
      reportedBy: student ? `${student.studentNo} - ${student.firstName} ${student.lastName}` : "",
      dateReported: currentDate,
    });
  }
}, [visible, student]);


  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDatePicked = (date) => {
    setFormData((prevState) => ({ ...prevState, dateTime: date.toString() }));
    setDateTimePickerVisible(false);
  };

  const validateForm = () => {
    const requiredFields = ["dateTime", "location", "violationCategory", "violationType", "offender", "description"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        Alert.alert("Validation Error", `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
  if (validateForm()) {
    try {
      const { error } = await supabase.from("incident_reports").insert([formData]);
      if (error) throw error;

      Alert.alert("Success", "Incident report submitted successfully.");
      onSubmit(formData);
      onClose();
    } catch (error) {
      Alert.alert("Error", "Failed to submit incident report.");
      console.error("Submission error: ", error);
    }
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
            <Text style={styles.label}>Date & Time of the Incident:</Text>
            <TouchableOpacity style={styles.input} onPress={() => setDateTimePickerVisible(true)}>
              <Text style={styles.inputText}>{formData.dateTime || "Select date and time"}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDateTimePickerVisible}
              mode="datetime"
              onConfirm={handleDatePicked}
              onCancel={() => setDateTimePickerVisible(false)}
            />

            <Text style={styles.label}>Location:</Text>
            <TextInput style={styles.input} value={formData.location} onChangeText={(text) => handleInputChange("location", text)} />

            <Text style={styles.label}>Violation Category:</Text>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange("violationCategory", value)}
              value={formData.violationCategory || ""}
              style={pickerStyles}
              items={[
                { label: "Minor", value: "Minor" },
                { label: "Major", value: "Major" },
              ]}
            />

            <Text style={styles.label}>Violation Type:</Text>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange("violationType", value)}
              value={formData.violationType || ""}
              style={pickerStyles}
              placeholder={{ label: "Select Violation Type", value: "" }}
              disabled={!formData.violationCategory}
              items={filteredViolationTypes}
            />

            <Text style={styles.label}>Victim:</Text>
            <TextInput
              style={styles.input}
              value={formData.victim}
              onChangeText={(text) => {
                handleInputChange("victim", text);
                setCurrentField("victim");
                if (text.length > 0) {
                  const matches = allStudents.filter((s) =>
                    `${s.firstName} ${s.lastName}`.toLowerCase().includes(text.toLowerCase())
                  );
                  setSuggestions(matches);
                } else {
                  setSuggestions([]);
                }
              }}
            />

            <Text style={styles.label}>Offender:</Text>
            <TextInput
              style={styles.input}
              value={formData.offender}
              onChangeText={(text) => {
                handleInputChange("offender", text);
                setCurrentField("offender");
                if (text.length > 0) {
                  const matches = allStudents.filter((s) =>
                    `${s.firstName} ${s.lastName}`.toLowerCase().includes(text.toLowerCase())
                  );
                  setSuggestions(matches);
                } else {
                  setSuggestions([]);
                }
              }}
            />

            <Text style={styles.label}>Witness:</Text>
            <TextInput
              style={styles.input}
              value={formData.witness}
              onChangeText={(text) => {
                handleInputChange("witness", text);
                setCurrentField("witness");
                if (text.length > 0) {
                  const matches = allStudents.filter((s) =>
                    `${s.firstName} ${s.lastName}`.toLowerCase().includes(text.toLowerCase())
                  );
                  setSuggestions(matches);
                } else {
                  setSuggestions([]);
                }
              }}
            />

            {suggestions.length > 0 && (
              <View style={styles.suggestionsContainer}>
                {suggestions.map((student) => (
                  <TouchableOpacity
                    key={student.id}
                    onPress={() => {
                      handleInputChange(currentField, `${student.firstName} ${student.lastName}`);
                      setSuggestions([]);
                    }}
                  >
                    <Text style={styles.suggestionText}>
                      {student.firstName} {student.lastName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              value={formData.description}
              onChangeText={(text) => handleInputChange("description", text)}
              multiline
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
  modalBackground: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalContainer: { width: "90%", maxHeight: "95%", backgroundColor: "#fff", borderRadius: 10, padding: 20 },
  closeButton: { position: "absolute", top: 10, right: 10 },
  closeButtonText: { fontSize: 18, fontWeight: "bold", color: "#555" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  scrollContent: { paddingBottom: 20 },
  label: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, fontSize: 14, marginBottom: 10 },
  inputText: { fontSize: 14, color: "#605E5E" },
  submitButton: { marginTop: 20, backgroundColor: "#0057FF", padding: 10, borderRadius: 25, alignItems: "center" },
  submitButtonText: { color: "#fff", fontWeight: "bold" },
  suggestionsContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: -10,
    marginBottom: 10,
    maxHeight: 100,
  },
  suggestionText: {
    padding: 10,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

const pickerStyles = {
  inputIOS: { fontSize: 14, padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, backgroundColor: "#fff", color: "#000" },
  inputAndroid: { fontSize: 14, padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, backgroundColor: "#fff", color: "#000" },
};

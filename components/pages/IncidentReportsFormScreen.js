import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import Header from "../parts/Header";

const IncidentReportFormScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Complaint" />

      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.title}>Incident Report</Text>

        {/* Form Fields */}
        {[
          "Date & Time of the incident:",
          "Location:",
          "Parties Involved (Victim, Offender, Witness):",
          "Description of the Incident (Factual Narrative):",
          "Reported by:",
          "Date Reported:",
        ].map((label, index) => (
          <View key={index} style={styles.inputContainer}>
            <TextInput placeholder={label} style={styles.input} />
          </View>
        ))}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    fontSize: 14,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#2BC999",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default IncidentReportFormScreen;

import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, StyleSheet,Platform,ToastAndroid,Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DOMenuBar from "../parts/DOMenuBar";
import DOViolationsDetails from "./DOViolationsDetails";
import Header from "../parts/Header";


//add violations modal fix layout
const DOViolations = ({ navigation }) => {
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [isAddViolationVisible, setIsAddViolationVisible] = useState(false);

  const violations = [
    { id: "2025-153", firstName: "John", lastName: "Doe", type: "Late", status: "Unresolved" },
  ];

  const showToast = () => {
    if (Platform.OS === "android") {
        ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
      } 
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <View style={{ marginBottom: 15 }}> 
        <Header title="Violations" />
      </View>
      <View style={{ marginBottom: 15 }}> 
        <DOMenuBar activeTab="Violations"/>
      </View>

      <Text style={styles.title}>Violation Record</Text>

      <View style={styles.filterContainer}>
        <TextInput placeholder="Search" style={styles.searchInput} />
        <TouchableOpacity style={styles.filterButton}><Text>All</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}><Text>Major Offense</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButtonActive}><Text style={{ color: "#fff" }}>Minor Offense</Text></TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setIsAddViolationVisible(true)}>
        <Text style={styles.addButtonText}>Add a Violation</Text>
      </TouchableOpacity>

      <ScrollView style={styles.table}>
        <View style={styles.rowHeader}>
          <Text style={styles.cellHeader}>Status</Text>
          <Text style={styles.cellHeader}>Student ID</Text>
          <Text style={styles.cellHeader}>First Name</Text>
          <Text style={styles.cellHeader}>Last Name</Text>
          <Text style={styles.cellHeader}>Type</Text>
        </View>

        {violations.map((item, index) => (
          <TouchableOpacity key={index} style={styles.row} onPress={() => setSelectedViolation(item)}>
            <Text style={styles.cell}><Text style={styles.statusBadge}>{item.status}</Text></Text>
            <Text style={styles.cell}>{item.id}</Text>
            <Text style={styles.cell}>{item.firstName}</Text>
            <Text style={styles.cell}>{item.lastName}</Text>
            <Text style={styles.cell}>{item.type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <FontAwesome name="cog" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal visible={!!selectedViolation} transparent animationType="fade">
          <DOViolationsDetails 
            data={selectedViolation} 
            onClose={() => setSelectedViolation(null)}
            navigation={navigation}  
          />
        </Modal>

      <Modal visible={isAddViolationVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Violation</Text>

            <TextInput placeholder="Date & Time of the Incident:" style={styles.input} />
            <TextInput placeholder="Location:" style={styles.input} />
            <TextInput placeholder="Parties Involved (Victim, Offender, Witness):" style={styles.input} />
            <TextInput placeholder="Description of the Incident (Factual Narrative):" style={[styles.input, { height: 80 }]} multiline />
            <TextInput placeholder="Reported by:" style={styles.input} />
            <TextInput placeholder="Date Reported:" style={styles.input} />

            <TouchableOpacity style={styles.addViolationButton}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={() => setIsAddViolationVisible(false)}>
              <Text style={{ color: "#007AFF" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.fab} onPress={showToast}>
          <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>      

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F4F7FC" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  filterContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  searchInput: { flex: 1, padding: 10, borderWidth: 1, borderColor: "#ddd", borderRadius: 5, backgroundColor: "#fff" },
  filterButton: { padding: 10, backgroundColor: "#E3E3E3", borderRadius: 5, marginLeft: 5 },
  filterButtonActive: { padding: 10, backgroundColor: "#0057FF", borderRadius: 5, marginLeft: 5 },
  addButton: { backgroundColor: "#27AE60", paddingVertical: 10, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  table: { backgroundColor: "#fff", borderRadius: 10, padding: 10 },
  rowHeader: { flexDirection: "row", backgroundColor: "#f0f0f0", padding: 10, borderRadius: 5 },
  cellHeader: { flex: 1, fontWeight: "bold", textAlign: "center" },
  row: { flexDirection: "row", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  cell: { flex: 1, textAlign: "center" },
  statusBadge: { backgroundColor: "#FFA500", color: "#fff", paddingHorizontal: 5, borderRadius: 5 },
  fab: { position: "absolute", bottom: 20, right: 20, backgroundColor: "#0057FF", width: 50, height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center", elevation: 5 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalBox: { width: "80%", backgroundColor: "#fff", padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 5, padding: 10, marginBottom: 10, backgroundColor: "#fff" },
  addViolationButton: { backgroundColor: "#27AE60", paddingVertical: 10, borderRadius: 8, alignItems: "center" },
  
  closeButton: { marginTop: 10, alignItems: "center" },
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
    tintColor: "#fff", // Keeps icon color consistent
  },
});

export default DOViolations;

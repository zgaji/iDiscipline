import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Modal,Platform,ToastAndroid,Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../parts/Header";
import MenuBar from "../parts/DOMenuBar";
import StudentCard from "../parts/DOStudentCard";

const DOStudentList = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const students = [
    { name: "Full Name", year: "Year" },
    { name: "Full Name", year: "Year" },
    { name: "Full Name", year: "Year" },
    { name: "Full Name", year: "Year" },
  ];

    const showToast = () => {
      if (Platform.OS === "android") {
        ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
      } 
    };

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <View style={{ marginBottom: 15 }}> 
        <Header title="StudentList" />
      </View>
      <MenuBar activeTab="Student List"/>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Students Count */}
        <View style={styles.studentHeader}>
          <Text style={styles.studentText}>Students</Text>
          <View style={styles.studentCount}>
            <Text style={styles.countText}>20</Text>
          </View>
          <TouchableOpacity style={styles.yearButton}>
            <Text style={styles.yearText}>Year</Text>
            <FontAwesome name="caret-down" size={14} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput placeholder="Search" style={styles.searchInput} />
          <FontAwesome name="times-circle" size={18} color="#999" />
        </View>

        {/* Add Student Button */}
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add Student</Text>
        </TouchableOpacity>

        {/* Student List */}
        {students.map((student, index) => (
          <StudentCard
            key={index}
            name={student.name}
            year={student.year}
            onPress={() => navigation.navigate("DOStudentProfile")}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={showToast}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>

      {/* Add Student Modal */}
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>

            {/* Modal Content */}
            <Text style={styles.modalTitle}>Create New Student Account</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>First Name:</Text>
              <Text style={styles.infoText}>Middle Name:</Text>
              <Text style={styles.infoText}>Last Name:</Text>
              <Text style={styles.infoText}>Gender:</Text>
              <Text style={styles.infoText}>Birth Date:</Text>
              <Text style={styles.infoText}>Address:</Text>
              <Text style={styles.infoText}>Year & Section:</Text>
              <Text style={styles.infoText}>Adviser:</Text>

              <Text style={[styles.infoText, styles.emergencyContact]}>Emergency Contact</Text>
              <Text style={styles.infoText}>Parent/Guardian:</Text>
              <Text style={styles.infoText}>Email:</Text>
              <Text style={styles.infoText}>Contact Number:</Text>
            </View>

            <TouchableOpacity style={styles.fab} onPress={showToast}>
              <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
  },
  content: {
    padding: 20,
  },
  studentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  studentText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  studentCount: {
    backgroundColor: "#E3E3E3",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  countText: {
    fontWeight: "bold",
  },
  yearButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    backgroundColor: "#E3E3E3",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  yearText: {
    marginRight: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  addButton: {
    backgroundColor: "#27AE60",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
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

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // ✅ Blurred background effect
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#0057FF",
    textAlign: "center",
  },
  infoContainer: {
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 3,
  },
  emergencyContact: {
    fontWeight: "bold",
    color: "#0057FF",
    marginTop: 10,
  },
  createButton: {
    backgroundColor: "#F4B400",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15, // ✅ Ensures proper spacing at the bottom
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DOStudentList;

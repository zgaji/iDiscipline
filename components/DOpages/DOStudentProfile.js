import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, StyleSheet,Platform,ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../parts/Header";
import MenuBar from "../parts/DOMenuBar";
import { FontAwesome } from "@expo/vector-icons";
import StudentCard from "../parts/StudentCard";


// To modify: student card clickable

const DOStudentProfile = () => {
const navigation = useNavigation(); 
  const [modalVisible, setModalVisible] = useState(false); // ✅ Manage modal state

  const showToast = () => {
    if (Platform.OS === "android") {
        ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
      } 
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <View style={{ marginBottom: 15 }}> 
        <Header title="Student List" />
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <StudentCard></StudentCard>

        {/* Student Report Section */}
        <Text style={styles.sectionTitle}>Student Report</Text>

        {/* Violation Record - Clickable */}
        <TouchableOpacity style={styles.recordCard} onPress={() => navigation.navigate("ViolationRecord")}>
          <Text style={styles.violationText}>Violation Record</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.behaviorCard}>
        <Text style={styles.behaviorText}>Behavior Report</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.behaviorSubtext}>
            This student is in immediate need of counseling
          </Text>
        </View>
      </View>
      </ScrollView>

      {/* Student Details Modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <FontAwesome name="times" size={20} color="#333" />
            </TouchableOpacity>

            {/* Header */}
            <Text style={styles.headerText}>Student Details</Text>

            {/* Student Information */}
            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}><Text style={styles.label}>First Name:</Text> John</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Middle Name:</Text> Doe</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Last Name:</Text> Smith</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Gender:</Text> Male</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Birth Date:</Text> Jan 1, 2005</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Address:</Text> 123 Street</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Year & Section:</Text> 10-A</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Adviser:</Text> Mr. Adams</Text>

              {/* Emergency Contact Section */}
              <Text style={styles.emergencyHeader}>Emergency Contact</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Parent/Guardian:</Text> Jane Doe</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Email:</Text> jane.doe@email.com</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Contact Number:</Text> +123456789</Text>
            </View>

            {/* Edit Button */}
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editText}>Edit</Text>
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
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
  },
  content: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 3,
  },
  profileHeader: {
    backgroundColor: "#0057FF",
    height: 30,
  },
  profileBody: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileText: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recordCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },
  violationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0057FF",
  },
  behaviorCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  behaviorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5, // ✅ Adds spacing between title & description
  },
  behaviorSubtext: {
    fontSize: 12,
    color: "#666",
    flexShrink: 1, // ✅ Prevents overflow
  },
  arrow: {
    fontSize: 20,
    color: "#000",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0057FF",
    marginBottom: 15,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  emergencyHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0057FF",
    marginTop: 10,
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: "#F4B400",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  editText: {
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
});

export default DOStudentProfile;

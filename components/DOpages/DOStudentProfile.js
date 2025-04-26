import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, ToastAndroid, ScrollView, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import StudentCard from "../parts/StudentCard"; // Import the existing StudentCard component
import Header from "../parts/Header";
import EditStudentModal from "../parts/EditStudentModal"; // Import the EditStudentModal component
import { useNavigation } from "@react-navigation/native";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../backend/firebaseConfig";

const DOStudentProfile = ({ route }) => {
  const { student } = route.params; // Ensure student is passed correctly
  const navigation = useNavigation(); 
  const [editVisible, setEditVisible] = useState(false);

  if (!student) {
    return <Text>Loading student data...</Text>; // Handle missing student data
  }

  const [modalVisible, setModalVisible] = useState(false);
  
  const handleArchive = async () => {
    try {
      const studentRef = doc(firestore, "users", student.studentEmail); // assuming email is doc ID
      await updateDoc(studentRef, {
        isArchived: true,
        isDisabled: true,
      });
      ToastAndroid.show("Student has been archived.", ToastAndroid.SHORT);
      navigation.goBack(); // return to student list
    } catch (error) {
      console.error("Archiving failed:", error);
      ToastAndroid.show("Failed to archive student.", ToastAndroid.SHORT);
    }
  };

  const showToast = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <View style={{ marginBottom: 15 }}>
        <Header title="Student Profile" />
      </View>

      <View style={styles.profileHeader}>
        <Text style={styles.profileTitle}>Student Profile</Text>
        <TouchableOpacity style={styles.archiveButton} onPress={handleArchive}>
          <Text style={styles.archiveText}>Archive</Text>
        </TouchableOpacity>
      </View>

      {/* Use StudentCard for displaying student information */}
      <ScrollView >
        <StudentCard student={student} onPress={() => setModalVisible(true)} />

        {/* Student Report Section */}
        <Text style={styles.title}>Student Report</Text>

        {/* Violation Record - Clickable */}
        <TouchableOpacity style={styles.recordCard} onPress={() => navigation.navigate("ViolationRecord", { student: student })}>
          <Text style={styles.violationText}>Violation Record</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Behavior Report - Clickable */}
        <View style={styles.behaviorCard}>
          <Text style={styles.behaviorText}>Behavior Report</Text>
          <Text style={styles.behaviorSubtext}>
            This student is in immediate need of counseling
          </Text>
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

            <Text style={styles.headerText}>Student Details</Text>

            {/* Student Information */}
            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}><Text style={styles.label}>First Name:</Text> {student.firstName}</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Middle Name:</Text> {student.middleName}</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Last Name:</Text> {student.lastName}</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Gender:</Text> {student.gender}</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Address:</Text> {student.address}</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Year & Section:</Text> {student.year} - {student.section}</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Adviser:</Text> {student.adviser}</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Student Email:</Text> {student.studentEmail}</Text>

              {/* Emergency Contact Section */}
              <Text style={styles.emergencyHeader}>Emergency Contact</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Parent/Guardian:</Text> {student.parentGuardian}</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Email:</Text> {student.emergencyEmail}</Text>
              <Text style={styles.detailText}><Text style={styles.label}>Contact Number:</Text> {student.contactNumber}</Text>
            </View>

            {/* Edit Button */}
            <TouchableOpacity style={styles.editButton} onPress={() => setEditVisible(true)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>

            
          </View>
        </View>
      </Modal>
      
      
      <EditStudentModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        student={student}
        onSave={() => {
          setEditVisible(false);
          navigation.goBack();
        }}
      />


      {/* Chatbot FAB */}
      <TouchableOpacity style={styles.fab} onPress={showToast}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,  
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#10349E",
  },
  behaviorCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  behaviorText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#10349E",
    marginBottom: 20,
  },
  behaviorSubtext: {
    fontSize: 14,
    fontWeight: "medium",
    color: "#666",
    marginBottom: 20,
  },
  arrow: {
    fontSize: 35,
    color: "#383636",
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#0057FF",
    marginBottom: 15,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  emergencyHeader: {
    fontSize: 19,
    fontStyle: "italic",
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
    tintColor: "#fff",
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  
  profileTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  
  archiveButton: {
    backgroundColor: "#D94A3D", // red tone
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 40,
  },
  
  archiveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default DOStudentProfile;

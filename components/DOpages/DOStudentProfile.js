import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../parts/Header";
import MenuBar from "../parts/DOMenuBar";
import { FontAwesome } from "@expo/vector-icons";

const DOStudentProfile = () => {
const navigation = useNavigation(); 
  const [modalVisible, setModalVisible] = useState(false); // ✅ Manage modal state

  return (
    <View style={styles.container}>
      <Header title="Student List" />
      <MenuBar activeTab="Student List" />
      
      <ScrollView contentContainerStyle={styles.content}>
        {/* Student Profile Card - Clickable */}
        <TouchableOpacity style={styles.profileCard} onPress={() => setModalVisible(true)}>
          <View style={styles.profileHeader} />
          <View style={styles.profileBody}>
            <Image source={require("../../assets/user.png")} style={styles.avatar} />
            <View style={styles.profileText}>
              <Text style={styles.name}>Student Name</Text>
              <Text style={styles.details}>Student No.</Text>
              <Text style={styles.details}>Year & Section:</Text>
              <Text style={styles.details}>School Year:</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Student Report Section */}
        <Text style={styles.sectionTitle}>Student Report</Text>

        {/* Violation Record - Clickable */}
        <TouchableOpacity style={styles.recordCard} onPress={() => navigation.navigate("ViolationRecord")}>
          <Text style={styles.violationText}>Violation Record</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Behavior Report */}
        <View style={styles.recordCard}>
          <Text style={styles.behaviorText}>Behavior Report</Text>
          <Text style={styles.behaviorSubtext}>This student is in immediate need of counseling</Text>
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
    fontSize: 16,
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
  behaviorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  behaviorSubtext: {
    fontSize: 12,
    color: "#666",
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
});

export default DOStudentProfile;

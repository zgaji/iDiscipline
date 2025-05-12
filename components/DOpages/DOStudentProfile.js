// DOStudentProfile with Supabase Integration (Retained Design and Layout - Fully Optimized)

import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, ToastAndroid, ScrollView, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import StudentCard from "../parts/StudentCard";
import Header from "../parts/Header";
import EditStudentModal from "../parts/EditStudentModal"; 
import { useNavigation } from "@react-navigation/native";
import supabase from '../backend/supabaseClient';

const DOStudentProfile = ({ route }) => {
  const { student } = route.params; 
  const navigation = useNavigation(); 
  const [editVisible, setEditVisible] = useState(false);

  if (!student) {
    return <Text>Loading student data...</Text>; 
  }

  const [modalVisible, setModalVisible] = useState(false);

  const handleArchive = async () => {
    try {
      await supabase
        .from('students')
        .update({ isArchived: true, isDisabled: true })
        .eq('studentEmail', student.studentEmail);

      ToastAndroid.show("Student has been archived.", ToastAndroid.SHORT);
      navigation.goBack();
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

      <ScrollView>
        <StudentCard student={student} onPress={() => setModalVisible(true)} />

        <Text style={styles.title}>Student Report</Text>

        <TouchableOpacity style={styles.recordCard} onPress={() => navigation.navigate("ViolationRecord", { student })}>
          <Text style={styles.violationText}>Violation Record</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.behaviorCard}>
          <Text style={styles.behaviorText}>Behavior Report</Text>
          <Text style={styles.behaviorSubtext}>This student is in immediate need of counseling</Text>
        </View>
      </ScrollView>

      <EditStudentModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        student={student}
        onSave={() => {
          setEditVisible(false);
          navigation.goBack();
        }}
      />

      <TouchableOpacity style={styles.fab} onPress={showToast}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  recordCard: { backgroundColor: "#fff", borderRadius: 10, padding: 15, marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 3 },
  violationText: { fontSize: 20, fontWeight: "bold", color: "#10349E" },
  behaviorCard: { backgroundColor: "#fff", borderRadius: 10, padding: 15, marginBottom: 10, elevation: 3 },
  behaviorText: { fontSize: 20, fontWeight: "bold", color: "#10349E", marginBottom: 20 },
  behaviorSubtext: { fontSize: 14, color: "#666", marginBottom: 20 },
  fab: { position: "absolute", bottom: 20, right: 20, backgroundColor: "#007AFF", width: 55, height: 55, borderRadius: 27.5, justifyContent: "center", alignItems: "center", elevation: 5 },
  fabIcon: { width: 30, height: 30, tintColor: "#fff" },
  profileHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  profileTitle: { fontSize: 24, fontWeight: "bold" },
  archiveButton: { backgroundColor: "#D94A3D", borderRadius: 20, paddingVertical: 8, paddingHorizontal: 40 },
  archiveText: { color: "#fff", fontWeight: "bold", fontSize: 14 }
});

export default DOStudentProfile;

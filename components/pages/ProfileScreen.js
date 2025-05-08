import React, { useContext } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Platform, ToastAndroid, Text } from "react-native";
import Header from "../parts/Header";
import StudentCard from "../parts/StudentCard";
import InfoCard from "../parts/InfoCard";
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from "../contexts/UserContext"; // ✅ use context instead

const ProfileScreen = () => {
  const { student, userRole } = useContext(UserContext); // ✅ get student & role globally

  const handleChatbotClick = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
    } 
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20 }}>
      <View style={{ marginBottom: 15 }}> 
        <Header title="Student Profile" />
      </View>

      {student ? (
        <StudentCard student={student} />
      ) : (
        <Text style={styles.loadingText}>Loading student information...</Text> 
      )}

      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <InfoCard
          title="Student Details"
          details={{
            "First Name": student?.firstName || "-",
            "Middle Name": student?.middleName || "-",
            "Last Name": student?.lastName || "-",
            Gender: student?.gender || "-",
            Address: student?.address || "-",
            "Year & Section": student?.year && student?.section ? `${student.year} - ${student.section}` : "-",
            Adviser: student?.adviser || "-",
            "Student Email": student?.studentEmail || "-",
          }}
        />
        <InfoCard
          title="Emergency Contact"
          details={{
            "Parent/Guardian": student?.parentGuardian || "-",
            Email: student?.emergencyEmail || "-",
            "Contact Number": student?.contactNumber || "-",
          }}
          titleStyle={{ color: "red", fontStyle: "italic" }}
        />
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={handleChatbotClick}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  loadingText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default ProfileScreen;

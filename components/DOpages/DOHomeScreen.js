import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Image, Platform, ToastAndroid } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../backend/firebaseConfig"; 
import Header from "../parts/Header";
import DOStatCard from "../parts/DOStatCard"; 
import AppointmentCard from "../parts/AppointmentCard";

const DOHomeScreen = () => {
  const [underReviewCount, setUnderReviewCount] = useState(0);
  const [violationCount, setViolationCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const showToast = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetchIncidentReports();
    fetchViolations();
  
    const interval = setInterval(() => {
      fetchIncidentReports();
      fetchViolations();
    }, 10000);
  
    return () => clearInterval(interval); 
  }, []);
  
  const fetchViolations = async () => {
    try {
      const snapshot = await getDocs(collection(firestore, "violations"));
      setViolationCount(snapshot.size); // snapshot.size = total documents
    } catch (error) {
      console.error("Error fetching violations:", error);
    }
  };
  

  const fetchIncidentReports = async () => {
    try {
      const q = query(
        collection(firestore, "incidentReports"),
        where("status", "==", "Under Review")
      );

      const snapshot = await getDocs(q);
      const reports = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setUnderReviewCount(reports.length);
    } catch (error) {
      console.error("Error fetching incident reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { title: "Violation", count: loading ? "-" : violationCount, bgColor: "#D04B49", icon: require("../../assets/violation.png") },
    { title: "Incident Reports", count: loading ? "-" : underReviewCount, bgColor: "#169971", icon: require("../../assets/inc.png") },
    { title: "Appointment", count: 0, bgColor: "#10349E", icon: require("../../assets/appointment.png") },
  ];

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 15 }}>
        <Header title="StudentList" />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.cardContainer}>
          {stats.map((item, index) => (
            <View style={styles.cardRow} key={index}>
              <DOStatCard
                title={item.title}
                icon={item.icon}
                count={item.count}
                bgColor={item.bgColor}
              />
            </View>
          ))}
        </View>

        <View style={styles.appointmentsSection}>
          <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          <AppointmentCard title="Student Counselling" date="2025-04-10" time="10:00 AM" />
          <AppointmentCard title="Student Counselling" date="2025-04-12" time="2:00 PM" />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={showToast}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default DOHomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 },
  headerContainer: { marginBottom: 15 },
  content: { padding: 20 },
  cardContainer: { marginBottom: 20 },
  cardRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  appointmentsSection: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: { fontSize: 30, fontWeight: "bold", marginLeft: 10, marginTop: 10, marginBottom: 10, color: "#0D078E" },
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
  fabIcon: { width: 30, height: 30, tintColor: "#fff" },
});

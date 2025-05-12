// IncidentReportsScreen with Supabase Integration (Retained Design and Layout - Fully Optimized)

import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, Image, Platform, ToastAndroid } from "react-native";
import Header from "../parts/Header";
import IncidentReportCard from "../parts/IncidentReportCard";
import IncidentReportModal from "../parts/IncidentReportModal";
import { UserContext } from "../contexts/UserContext";
import supabase from '../backend/supabaseClient';

const IncidentReportsScreen = () => {
  const { student } = useContext(UserContext);
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [reports, setReports] = useState([]);

  useEffect(() => { if (student) fetchReports(); }, [student]);

  const fetchReports = async () => {
    try {
      if (!student) return;
      const { data, error } = await supabase
        .from('incident_reports')
        .select('*')
        .eq('reportedByStudentNo', student.studentNo);

      if (error) throw error;
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const generateIncidentReportNo = () => `IR-${Math.floor(10000 + Math.random() * 90000)}`;

  const handleSubmitReport = async (data) => {
    try {
      const incidentReportNo = generateIncidentReportNo();
      const reportData = {
        ...data,
        reportedByStudentNo: student?.studentNo || "Unknown",
        reportedByName: `${student?.firstName || ""} ${student?.lastName || ""}`,
        incidentReportNo,
        status: "Under Review",
      };

      await supabase.from('incident_reports').insert([reportData]);
      fetchReports();
      setModalVisible(false);
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  const handleChatbotClick = () => {
    if (Platform.OS === "android") ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <Header title="Incident Reports" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Incident Reports</Text>

        <TouchableOpacity style={styles.reportButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.reportButtonText}>Make an Incident Report</Text>
        </TouchableOpacity>

        {reports.length === 0 ? (
          <View style={styles.noReportsContainer}><Text style={styles.noReportsText}>No incident reports submitted.</Text></View>
        ) : (
          reports.map((report) => (
            <IncidentReportCard key={report.id} report={report} onPress={() => setSelectedReport(report)} />
          ))
        )}
      </ScrollView>

      <IncidentReportModal visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={handleSubmitReport} />

      <TouchableOpacity style={styles.fab} onPress={handleChatbotClick}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default IncidentReportsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 },
  content: { paddingHorizontal: 20, paddingBottom: 80 },
  title: { fontSize: 22, fontWeight: "bold", marginTop: 30, marginBottom: 20 },
  reportButton: { backgroundColor: "#0057FF", padding: 8, borderRadius: 20, marginBottom: 15, width: "65%" },
  reportButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold", alignSelf: "center" },
  fab: { position: "absolute", bottom: 20, right: 20, backgroundColor: "#007AFF", width: 55, height: 55, borderRadius: 27.5, justifyContent: "center", alignItems: "center", elevation: 5 },
  fabIcon: { width: 30, height: 30, tintColor: "#fff" },
  noReportsContainer: { marginTop: 40, alignItems: "center", justifyContent: "center" },
  noReportsText: { fontSize: 16, color: "#888", fontStyle: "italic" }
});

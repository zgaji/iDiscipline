// IncidentReports with Supabase Integration (Retained Design and Layout - Fully Optimized)

import React, { useState, useEffect, useMemo } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, StyleSheet, Platform, ToastAndroid, Alert, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import Header from "../parts/Header";
import supabase from '../backend/supabaseClient';

const IncidentReports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Recent");

  useEffect(() => { fetchIncidents(); }, []);

  const fetchIncidents = async () => {
    try {
      const { data, error } = await supabase.from('incident_reports').select('*');
      if (error) throw error;
      setIncidents(data);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredIncidents = useMemo(() => {
    let list = incidents.filter(incident => {
      const searchText = searchQuery.toLowerCase();
      return (
        incident.reportedByName?.toLowerCase().includes(searchText) ||
        incident.violationType?.toLowerCase().includes(searchText) ||
        incident.status?.toLowerCase().includes(searchText)
      );
    });

    if (selectedFilter !== "All") {
      list = list.filter(incident => incident.status === selectedFilter);
    }

    list.sort((a, b) => sortOrder === "Recent" ? new Date(b.dateReported) - new Date(a.dateReported) : new Date(a.dateReported) - new Date(b.dateReported));

    return list;
  }, [incidents, searchQuery, selectedFilter, sortOrder]);

  const handleArchive = async () => {
    if (selectedIncident) {
      await supabase.from('incident_reports').update({ status: "Archived" }).eq('id', selectedIncident.id);
      fetchIncidents();
      setSelectedIncident(null);
      Alert.alert("Success", "Incident successfully archived!");
    }
  };

  const handleLogAsViolation = async () => {
    if (selectedIncident) {
      await supabase.from('violations').insert({
        caseNo: `V-${Date.now()}`,
        fullName: selectedIncident.reportedByName || "Unknown",
        studentID: selectedIncident.reportedByStudentNo || "-",
        violationCategory: selectedIncident.violationCategory || "-",
        violationType: selectedIncident.violationType || "-",
        description: selectedIncident.description || "-",
        dateTime: selectedIncident.dateTime || "-",
        status: "Unresolved",
      });
      await supabase.from('incident_reports').update({ status: "Logged" }).eq('id', selectedIncident.id);
      fetchIncidents();
      setSelectedIncident(null);
      Alert.alert("Success", "Incident has been logged as a violation!");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <Header title="Incident Reports" />

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Name, Type, or Status"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FontAwesome name="search" size={16} color="#666" />
        </View>

        <Picker selectedValue={sortOrder} style={styles.dropdownPicker} onValueChange={setSortOrder}>
          <Picker.Item label="Recent" value="Recent" />
          <Picker.Item label="Oldest" value="Oldest" />
        </Picker>

        <ScrollView style={styles.table}>
          {filteredIncidents.map((incident, index) => (
            <TouchableOpacity key={incident.id || index} style={styles.tableRow} onPress={() => setSelectedIncident(incident)}>
              <Text style={styles.tableCell}>{incident.status}</Text>
              <Text style={styles.tableCell}>{incident.reportedByStudentNo}</Text>
              <Text style={styles.tableCell}>{incident.reportedByName}</Text>
              <Text style={styles.tableCell}>{incident.violationType}</Text>
              <Text style={styles.tableCell}>{incident.dateReported}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.fab} onPress={() => ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT)}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#F8F9FC", borderColor: "#D1D1D1", borderWidth: 1, borderRadius: 25, paddingHorizontal: 15, height: 45, marginBottom: 15 },
  searchInput: { flex: 1, fontSize: 16, color: "#333" },
  dropdownPicker: { width: 120, height: 40 },
  table: { backgroundColor: "#fff", borderRadius: 10, paddingVertical: 10, paddingHorizontal: 5 },
  tableRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  tableCell: { flex: 1, textAlign: "center", fontSize: 14, color: "#333" },
  fab: { position: "absolute", bottom: 20, right: 20, backgroundColor: "#007AFF", width: 55, height: 55, borderRadius: 27.5, justifyContent: "center", alignItems: "center", elevation: 5 },
  fabIcon: { width: 30, height: 30, tintColor: "#fff" }
});

export default IncidentReports;

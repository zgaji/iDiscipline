// DOViolations with Supabase Integration (Retained Design and Layout - Fully Optimized)

import React, { useState, useEffect, useMemo } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, StyleSheet, Platform, ToastAndroid } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../parts/Header";
import AddViolationModal from "../parts/AddViolationModal";
import supabase from '../backend/supabaseClient';
import { Picker } from "@react-native-picker/picker";
import CaseDetailModal from "../parts/CaseDetailModal";

const DOViolations = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddViolationVisible, setIsAddViolationVisible] = useState(false);
  const [sortOption, setSortOption] = useState("Recent");
  const [selectedCase, setSelectedCase] = useState(null);
  const [isCaseDetailVisible, setIsCaseDetailVisible] = useState(false);

  useEffect(() => {
    fetchViolations();
  }, []);

  const fetchViolations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('violations').select('*');
      if (error) throw error;

      setViolations(data);
    } catch (error) {
      console.error("Error fetching violations:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredViolations = useMemo(() => {
    let list = violations;

    if (selectedFilter !== "All") {
      list = list.filter(v =>
        selectedFilter === "Archive"
          ? v.status?.toLowerCase() === "archived"
          : v.violationCategory === selectedFilter
      );
    }

    if (sortOption === "Recent") {
      list = list.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      list = list.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    if (searchQuery) {
      list = list.filter(v =>
        v.offender?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.studentId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.caseNo?.toString().includes(searchQuery)
      );
    }

    return list;
  }, [violations, selectedFilter, sortOption, searchQuery]);

  const getStatusColor = (status) => {
    const statusColors = {
      resolved: "#4CAF50",
      archived: "#F44336",
      unresolved: "#FFA500",
      pending: "#FFC107"
    };
    return statusColors[status?.toLowerCase()] || "#9E9E9E";
  };

  const handleRowClick = (caseData) => {
    setSelectedCase(caseData);
    setIsCaseDetailVisible(true);
  };

  return (
    <View style={styles.container}>
      <Header title="Violations" />

      <View style={styles.headerRow}>
        <Text style={styles.title}>Violation Record</Text>
        <View style={styles.countBadge}><Text style={styles.countText}>{filteredViolations.length}</Text></View>
      </View>

      <View style={styles.searchFilterRow}>
        <TextInput
          placeholder="Search.."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />

        <Picker selectedValue={sortOption} style={styles.sortingDropdown} onValueChange={(value) => setSortOption(value)}>
          <Picker.Item label="Recent" value="Recent" />
          <Picker.Item label="Oldest" value="Oldest" />
        </Picker>
      </View>

      <ScrollView style={styles.tableContainer}>
        {filteredViolations.map((item, index) => (
          <TouchableOpacity key={item.id || index} style={styles.row} onPress={() => handleRowClick(item)}>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
            <Text style={styles.cellText}>{item.caseNo}</Text>
            <Text style={styles.cellText}>{item.studentId}</Text>
            <Text style={styles.cellText}>{item.offender}</Text>
            <Text style={styles.cellText}>{item.violationType}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <AddViolationModal visible={isAddViolationVisible} onClose={() => setIsAddViolationVisible(false)} onSubmit={fetchViolations} />

      <CaseDetailModal visible={isCaseDetailVisible} onClose={() => setIsCaseDetailVisible(false)} caseData={selectedCase} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 },
  title: { fontSize: 26, fontWeight: "bold" },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 12, borderRadius: 20 },
  statusText: { fontSize: 12, fontWeight: "bold", color: "#fff" },
  searchFilterRow: { flexDirection: "row", alignItems: "center", marginVertical: 15 },
  searchInput: { flex: 1, fontSize: 16, paddingHorizontal: 10, backgroundColor: "#FFF", borderRadius: 10, marginRight: 10, borderWidth: 1, borderColor: "#E0E0E0" },
  sortingDropdown: { width: 150, height: 40 },
  tableContainer: { flex: 1, maxHeight: 400 },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  cellText: { flex: 1, textAlign: "center", fontSize: 14, color: "#333" }
});

export default DOViolations;

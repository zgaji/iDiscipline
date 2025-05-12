import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, StyleSheet, Platform, ToastAndroid } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
<<<<<<< HEAD
=======
import DOMenuBar from "../parts/DOMenuBar";
import DOViolationsDetails from "./DOViolationsDetails";
>>>>>>> parent of 87154a4 (Login Auth +StudentList)
import Header from "../parts/Header";
import AddViolationModal from "../parts/AddViolationModal";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../backend/firebaseConfig";
import { Picker } from "@react-native-picker/picker";
import CaseDetailModal from "../parts/CaseDetailModal"; // Import the CaseDetailModal component
const DOViolations = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [violations, setViolations] = useState([]);
  const [filteredViolations, setFilteredViolations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddViolationVisible, setIsAddViolationVisible] = useState(false);
  const [sortOption, setSortOption] = useState("Recent");
  const [selectedCase, setSelectedCase] = useState(null);  // State to hold the selected case
  const [isCaseDetailVisible, setIsCaseDetailVisible] = useState(false);  // State to show/hide case detail modal

  const fetchViolations = async () => {
    try {
      const snapshot = await getDocs(collection(firestore, "violations"));
      const violationList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setViolations(violationList);
      setFilteredViolations(violationList); // Initially show all violations
    } catch (error) {
      console.error("Error fetching violations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchViolations();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "resolved": return "#4CAF50";
      case "archived": return "#F44336";
      case "unresolved": return "#FFA500";
      case "pending": return "#FFC107";
      default: return "#9E9E9E";
    }
  };

  // Sorting the violations based on selected sort option
  const sortedViolations = filteredViolations.sort((a, b) => {
    if (sortOption === "Recent") {
      return new Date(b.date) - new Date(a.date); // Sort by date (newest first)
    } else {
      return new Date(a.date) - new Date(b.date); // Sort by date (oldest first)
    }
  });

  // Filter violations based on the selected filter
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    let filteredList = [...violations];

    if (filter === "All") {
      filteredList = violations;
    } else if (filter === "Major Offense") {
      filteredList = violations.filter((violation) => violation.violationCategory === "Major Offense");
    } else if (filter === "Minor Offense") {
      filteredList = violations.filter((violation) => violation.violationCategory === "Minor Offense");
    } else if (filter === "Archive") {
      filteredList = violations.filter((violation) => violation.status?.toLowerCase() === "archived");
    }

    setFilteredViolations(filteredList);
  };

  const handleRowClick = (caseData) => {
    setSelectedCase(caseData);  // Set the selected case
    setIsCaseDetailVisible(true);  // Show the case detail modal
  };

  return (
    <View style={styles.container}>
      <Header title="Violations" />

      {/* Header Section */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Violation Record</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{filteredViolations.length}</Text>
        </View>
      </View>

      {/* Search and Filter Section */}
      <View style={styles.searchFilterRow}>
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={16} color="#666" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search.."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <FontAwesome name="close" size={16} color="#666" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Buttons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.centeredButtons}>
          {["All", "Major Offense", "Minor Offense", "Archive"].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterButton, selectedFilter === filter && styles.activeFilter]}
              onPress={() => handleFilterChange(filter)}
            >
              <Text style={[styles.filterText, selectedFilter === filter && styles.activeFilterText]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Add Violation and Sorting Section */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.addViolationButton} onPress={() => setIsAddViolationVisible(true)}>
          <Text style={styles.addViolationButtonText}>Add Violation</Text>
        </TouchableOpacity>

        {/* Sorting Dropdown */}
        <View style={styles.sortingContainer}>
          <Picker
            selectedValue={sortOption}
            style={styles.sortingDropdown}
            onValueChange={(itemValue) => setSortOption(itemValue)}
          >
            <Picker.Item label="Recent" value="Recent" />
            <Picker.Item label="Oldest" value="Oldest" />
          </Picker>
        </View>
      </View>

      {/* Violations List - Scrollable Table */}
      <ScrollView horizontal={true}>
        <ScrollView style={styles.tableContainer} contentContainerStyle={styles.tableContent}>
          <View style={styles.table}>
            <View style={styles.rowHeader}>
              <Text style={[styles.cellHeader, { flex: 1.2 }]}>Status</Text>
              <Text style={styles.cellHeader}>Case No.</Text>
              <Text style={styles.cellHeader}>Student ID</Text>
              <Text style={styles.cellHeader}>Full Name</Text>
              <Text style={styles.cellHeader}>Type</Text>
            </View>

            {sortedViolations.map((item, index) => (
              <TouchableOpacity key={index} style={styles.row} onPress={() => handleRowClick(item)}>
                <View style={[styles.cell, { flex: 1.2, flexDirection: "row", justifyContent: "center", alignItems: "center" }]}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>
                <View style={styles.cell}><Text style={styles.cellText}>{item.caseNo}</Text></View>
                <View style={styles.cell}><Text style={styles.cellText}>{item.studentId}</Text></View>
                <View style={styles.cell}><Text style={styles.cellText}>{item.offender}</Text></View>
                <View style={styles.cell}><Text style={styles.cellText}>{item.type}</Text></View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ScrollView>

      {/* Modals */}
      <AddViolationModal
        visible={isAddViolationVisible}
        onClose={() => setIsAddViolationVisible(false)}
        onSubmit={async () => {
          await fetchViolations();
          setIsAddViolationVisible(false);
        }}
      />

      {/* Case Detail Modal */}
      <CaseDetailModal
        visible={isCaseDetailVisible}
        onClose={() => setIsCaseDetailVisible(false)}
        caseData={selectedCase}
        onEdit={() => {}}  // Pass the edit action here if needed
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F9FC",
    padding: 20,
    marginTop: 30,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  countBadge: {
    borderWidth: 2,
    borderColor: "#B0B0B0",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginLeft: 10,
  },
  countText: {
    fontSize: 16,
    color: "#0D2B79",
    fontWeight: "600",
  },

  searchFilterRow: {
    marginTop: 10,
    marginBottom: 15,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FC",
    borderColor: "#D1D1D1",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 45,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },

  centeredButtons: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  activeFilter: {
    backgroundColor: "#0F296F",
  },

  filterText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },

  activeFilterText: {
    color: "#fff",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  addViolationButton: {
    backgroundColor: "#27AE60",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  addViolationButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  sortingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  sortingDropdown: {
    height: 40,
    width: 140,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  tableContainer: {
    flex: 1,
    maxHeight: 400,
  },

  tableContent: {
    paddingBottom: 10,
  },

  table: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    elevation: 2,
    marginTop: 10,
    minWidth: 600,
  },

  rowHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 14,
    paddingHorizontal: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cellHeader: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
    color: "#333",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    fontSize: 13,
    color: "#333",
    textAlign: "center",
  },
  statusBadge: {
    backgroundColor: "#FFA500",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    minHeight: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

export default DOViolations;

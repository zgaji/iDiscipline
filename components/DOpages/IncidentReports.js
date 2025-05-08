import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, StyleSheet, Platform, ToastAndroid, Alert, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import Header from "../parts/Header";
import { firestore } from "../backend/firebaseConfig";
import { collection, getDocs, doc, updateDoc, addDoc } from "firebase/firestore";

const IncidentReports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Recent");


  const showToast = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "incidentReports"));
      const fetchedIncidents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setIncidents(fetchedIncidents);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredIncidents = incidents
    .filter((incident) => {
      const nameMatch = `${incident.firstName} ${incident.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());
      const typeMatch = incident.violationType?.toLowerCase().includes(searchQuery.toLowerCase());
      const statusMatch = incident.status?.toLowerCase().includes(searchQuery.toLowerCase());
      return nameMatch || typeMatch || statusMatch;
    })
    .filter((incident) => {
      if (selectedFilter === "All") return true;
      if (selectedFilter === "Logged") return incident.status === "Logged";
      if (selectedFilter === "Under Review") return incident.status === "Under Review";
      if (selectedFilter === "Archived") return incident.status === "Archived";
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "Recent") return (b.dateReported || "").localeCompare(a.dateReported || "");
      if (sortOrder === "Oldest") return (a.dateReported || "").localeCompare(b.dateReported || "");
      return 0;
    });

    const handleArchive = async () => {
      if (selectedIncident) {
        const docRef = doc(firestore, "incidentReports", selectedIncident.id);
        await updateDoc(docRef, { status: "Archived" });
        setSelectedIncident(null);
        fetchIncidents();
        Alert.alert("Success", "Incident successfully archived!");
      }
    };
  
    const handleLogAsViolation = async () => {
      if (selectedIncident) {
        await addDoc(collection(firestore, "violations"), {
          caseNo: `V-${Date.now()}`,
          fullName: selectedIncident.reportedByName || "Unknown",
          studentID: selectedIncident.reportedByStudentNo || "-",
          violationCategory: selectedIncident.violationCategory || "-",
          violationType: selectedIncident.violationType || "-",
          description: selectedIncident.description || "-",
          dateTime: selectedIncident.dateTime || "-",
          status: "Unresolved",
        });
        const docRef = doc(firestore, "incidentReports", selectedIncident.id);
        await updateDoc(docRef, { status: "Logged" });
        setSelectedIncident(null);
        fetchIncidents();
        Alert.alert("Success", "Incident has been logged as a violation!");
      }
    };


  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <Header title="Incident Reports" />

      <View style={styles.content}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Incident Reports</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{incidents.length}</Text>
        </View>
      </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
        <FontAwesome name="search" size={16} color="#666" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name, Type, or Status"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <FontAwesome name="close" size={16} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Buttons (Top Row) */}
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.centeredButtons}>
          {["All", "Logged", "Under Review", "Archived"].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterButton, selectedFilter === filter && styles.activeFilter]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[styles.filterText, selectedFilter === filter && styles.activeFilterText]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Dropdown (Bottom Row) */}
      <View style={styles.dropdownWrapper}>
        <Picker
          selectedValue={sortOrder}
          onValueChange={(itemValue) => setSortOrder(itemValue)}
          style={styles.dropdownPicker}
          dropdownIconColor="#333"
          mode="dropdown"
        >
          <Picker.Item label="Recent" value="Recent" />
          <Picker.Item label="Oldest" value="Oldest" />
        </Picker>
      </View>



        {/* Incident List */}
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={styles.tableRowHeader}>
              <Text style={[styles.tableHeader, styles.statusCol]}>Status</Text>
              <Text style={styles.tableHeader}>Student No.</Text>
              <Text style={styles.tableHeader}>Full Name</Text>
              <Text style={styles.tableHeader}>Violation Type</Text>
              <Text style={styles.tableHeader}>Date Sent</Text>
            </View>

            {loading ? (
              <Text style={styles.loadingText}>Loading incidents...</Text>
            ) : filteredIncidents.length === 0 ? (
              <Text style={styles.noResultsText}>No incident reports found.</Text>
            ) : (
              filteredIncidents.map((incident, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.tableRow}
                  onPress={() => setSelectedIncident(incident)}
                >
                  <View style={[styles.tableCell, styles.statusCol]}>
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>{incident.status || "Unknown"}</Text>
                    </View>
                  </View>
                  <Text style={styles.tableCell}>{incident.reportedByStudentNo || "-"}</Text>
                  <Text style={styles.tableCell}>{incident.reportedByName || "-"}</Text>
                  <Text style={styles.tableCell}>{incident.violationType || "-"}</Text>
                  <Text style={styles.tableCell}>{incident.dateReported || "-"}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </View>

      {/* Modal for Incident Details */}
      <Modal visible={!!selectedIncident} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Incident Report #{selectedIncident?.id || ""}</Text>
            <TouchableOpacity onPress={() => setSelectedIncident(null)}>
              <FontAwesome name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalLabel}>Date & Time of the Incident:</Text>
            <Text style={styles.modalText}>{selectedIncident?.dateTime || "-"}</Text>

            <Text style={styles.modalLabel}>Location:</Text>
            <Text style={styles.modalText}>{selectedIncident?.location || "-"}</Text>

            <Text style={styles.modalLabel}>Violation Category:</Text>
            <Text style={styles.modalText}>{selectedIncident?.violationCategory || "-"}</Text>

            <Text style={styles.modalLabel}>Violation Type:</Text>
            <Text style={styles.modalText}>{selectedIncident?.violationType || "-"}</Text>

            <Text style={styles.modalLabel}>Parties Involved:</Text>
            <Text style={styles.modalText}>
              Victim: {selectedIncident?.victim || "-"}{"\n"}
              Offender: {selectedIncident?.offender || "-"}{"\n"}
              Witness: {selectedIncident?.witness || "-"}
            </Text>

            <Text style={styles.modalLabel}>Description of the Incident:</Text>
            <Text style={styles.modalText}>{selectedIncident?.description || "-"}</Text>

            <Text style={styles.modalLabel}>Reported by:</Text>
            <Text style={styles.modalText}>{selectedIncident?.reportedBy || "-"}</Text>

            <Text style={styles.modalLabel}>Date Reported:</Text>
            <Text style={styles.modalText}>{selectedIncident?.dateReported || "-"}</Text>
          </ScrollView>

          

          {/* Action Buttons */}
          <View style={styles.modalButtons}>
          <TouchableOpacity
            style={styles.archiveButton}
            onPress={handleArchive}
          >
            <Text style={styles.buttonText}>Archive</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logButton}
            onPress={handleLogAsViolation}
          >
            <Text style={styles.buttonText}>Log as Violation</Text>
          </TouchableOpacity>
  

            <TouchableOpacity
              style={[styles.modalActionButton, { backgroundColor: "#FF5E5B" }]}
              onPress={async () => {
                if (selectedIncident) {
                  // Add to Violations Collection
                  await addDoc(collection(firestore, "violations"), {
                    caseNo: `V-${Date.now()}`,
                    fullName: selectedIncident.reportedByName || "Unknown",
                    studentID: selectedIncident.reportedByStudentNo || "-",
                    violationCategory: selectedIncident.violationCategory || "-",
                    violationType: selectedIncident.violationType || "-",
                    description: selectedIncident.description || "-",
                    dateTime: selectedIncident.dateTime || "-",
                    status: "Unresolved",
                  });
                  // Update Incident Status
                  const docRef = doc(firestore, "incidentReports", selectedIncident.id);
                  await updateDoc(docRef, { status: "Logged" });
                  setSelectedIncident(null);
                  fetchIncidents();
                  ToastAndroid.show("Logged as Violation!", ToastAndroid.SHORT);
                }
              }}
            >
              <Text style={styles.modalActionText}>Log as Violation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

      {/* Chatbot FAB */}
      <TouchableOpacity style={styles.fab} onPress={showToast}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default IncidentReports;

const styles = StyleSheet.create({
  content: { paddingHorizontal: 15, paddingTop: 10 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
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
  
  
  table: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    elevation: 3,
    marginTop: 10,
    minWidth: "100%",
  },
  tableRowHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 5,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 5,
  },
  statusCol: {
    flex: 1.5,
  },
  statusBadge: {
    backgroundColor: "#FFC107",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: "center",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  loadingText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  noResultsText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    fontStyle: "italic",
    color: "#999",
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 5,
    gap: 10,
  },
  centeredButtons: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
    width: 120,
    height: 40,
    justifyContent: "center",
  },
  picker: {
    fontSize: 10,
    height: 45,
    color: "#333",
  },
  dropdownWrapper: {
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: 38,
    width: 120,
    justifyContent: "center",
    overflow: "hidden",
  },
  dropdownPicker: {
    width: "100%",
    height: "100%",
    fontSize: 13,
    color: "#333",
  },
  
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  archiveButton: {
    flex: 1,
    backgroundColor: "#0F296F",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logButton: {
    flex: 1,
    backgroundColor: "#FF5E5B",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  

  // Modal and others stay the same
  modalBackground: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalContainer: { width: "85%", backgroundColor: "#fff", borderRadius: 10, padding: 20, elevation: 5 },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#0056FF", textAlign: "center" },
  modalLabel: { fontWeight: "bold", marginTop: 10 },
  modalText: { fontSize: 14, marginBottom: 5 },
  archiveButton: { backgroundColor: "#0F296F", padding: 10, borderRadius: 8, flex: 1, marginHorizontal: 5 },
  archiveButtonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  logButton: { backgroundColor: "#FF5E5B", padding: 10, borderRadius: 8, flex: 1, marginHorizontal: 5 },
  logButtonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  
  fab: { position: "absolute", bottom: 20, right: 20, backgroundColor: "#007AFF", width: 55, height: 55, borderRadius: 27.5, justifyContent: "center", alignItems: "center", elevation: 5 },
  fabIcon: { width: 30, height: 30, tintColor: "#fff" },
});

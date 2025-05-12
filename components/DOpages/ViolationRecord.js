import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Platform, ToastAndroid } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Header from "../parts/Header";
import MenuBar from "../parts/DOMenuBar";
import StudentCard from "../parts/StudentCard";
import ViolationCaseCard from "../parts/ViolationCaseCard";
import { useRoute } from "@react-navigation/native";
import CaseDetailModal from "../parts/CaseDetailModal";

const ViolationRecord = ({ navigation }) => {
<<<<<<< HEAD
  const route = useRoute();
  const { student } = route.params || {};
=======
>>>>>>> parent of 87154a4 (Login Auth +StudentList)
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Highest");
  const [selectedCase, setSelectedCase] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const violations = [
    {
      id: "001",
      studentId: "S-1001",
      category: "Minor",
      violation: "Tardiness",
      dateSent: "2025-04-20",
      description: "Student was late to class three times in a week."
    },
    {
      id: "002",
      studentId: "S-1002",
      category: "Minor",
      violation: "Dress Code Violation",
      dateSent: "2025-04-18",
      description: "Student wore inappropriate uniform attire."
    },
    {
      id: "003",
      studentId: "S-1003",
      category: "Minor",
      violation: "Unauthorized Use of Phone",
      dateSent: "2025-04-15",
      description: "Student was caught using a phone during lecture."
    },
    {
      id: "004",
      studentId: "S-1004",
      category: "Major",
      violation: "Bullying",
      dateSent: "2025-04-12",
      description: "Student involved in a verbal bullying incident."
    },
    {
      id: "005",
      studentId: "S-1005",
      category: "Major",
      violation: "Vandalism",
      dateSent: "2025-04-10",
      description: "Student vandalized school property in classroom."
    }
  ];
  

  const showToast = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 15 }}>
        <Header title="DOViolations" />
      </View>

      <Text style={styles.title}>Violation Record</Text>

      <View style={{ marginBottom: 5 }}>
        <StudentCard student={student} />
      </View>

<<<<<<< HEAD
      {/* Filter Row */}
      <View style={styles.filterRow}>
      <View style={styles.buttonGroup}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.centeredButtons}>
          {["All", "Major Offense", "Minor Offense", "Archive"].map((filter) => (
=======
        <StudentCard></StudentCard>
        <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["All", "Major Offense", "Minor Offense"].map((filter) => (
>>>>>>> parent of 87154a4 (Login Auth +StudentList)
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
    </View>

    <View style={styles.pickerContainer}>
    <View style={styles.pickerWrapper}>
      <Picker
        selectedValue={sortOrder}
        onValueChange={(value) => setSortOrder(value)}
        style={styles.picker}
        dropdownIconColor="#000"
      >
        <Picker.Item label="Highest" value="Highest" />
        <Picker.Item label="Lowest" value="Lowest" />
      </Picker>
    </View>
  </View>

      {/* Scrollable list only */}
      <ScrollView style={styles.cardScroll} showsVerticalScrollIndicator={false}>
      <View style={styles.listContainer}>
        {violations
          .filter((violation) => {
            if (selectedFilter === "All") return true;
            if (selectedFilter === "Major Offense") return violation.category === "Major";
            if (selectedFilter === "Minor Offense") return violation.category === "Minor";
            return true;
          })
          .map((caseData, index) => (
            <ViolationCaseCard
              key={index}
              caseData={caseData}
              openModal={(data) => {
                setSelectedCase(data);
                setModalVisible(true);
              }}
            />
          ))
        }
      </View>
    </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={showToast}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>

      {selectedCase && (
      <CaseDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        caseData={selectedCase}
      />
    )}

      
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  filterScroll: {
    flexGrow: 1,
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
  pickerContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  pickerWrapper: {
    width: 120,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    
  },  
  picker: {
    height: 40,
    width: "100%",
  },
  cardScroll: {
    flex: 1,
    marginTop: 10,
  },
  listContainer: {
    paddingBottom: 80,
  },
  buttonGroup: {
    width: "100%",
    alignItems: "center",
  },
  centeredButtons: {
    justifyContent: "center",
    paddingHorizontal: 10,
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
});


export default ViolationRecord;

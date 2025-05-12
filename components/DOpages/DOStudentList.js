// DOStudentList with Supabase Integration (Retained Design and Layout - Fully Optimized)

import React, { useState, useEffect, useMemo } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Platform, ToastAndroid, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import Header from "../parts/Header";
import DOStudentCard from "../parts/DOStudentCard";
import AddStudentModal from "../parts/AddStudentModal";
import supabase from '../backend/supabaseClient';

const DOStudentList = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const sectionOptions = {
    "7th Grade": ["St. Pedro", "St. Aloysious", "St. Dominic"],
    "8th Grade": ["St. Stephen", "St. Maximillian", "St. Lorenzo"],
    "9th Grade": ["St. Philip", "St. Andrew", "St. Bartholomew"],
    "10th Grade": ["St. Matthew", "St. John", "St. Paul"],
    "11th Grade": ["St. John Bosco", "St. Vincent"],
    "12th Grade": ["St. Benedict", "St. Sebastian"],
  };

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase.from('students').select('*').eq('roles', 'student');
      if (error) throw error;
      setStudents(data.filter((student) => !student.isArchived));
    } catch (error) {
      console.error("Error fetching students: ", error);
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesQuery = student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || student.lastName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear = selectedYear ? student.year === selectedYear : true;
      const matchesSection = selectedSection ? student.section === selectedSection : true;
      return matchesQuery && matchesYear && matchesSection;
    });
  }, [students, searchQuery, selectedYear, selectedSection]);

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <Header title="Student List" />

      <View style={styles.studentHeader}>
        <Text style={styles.studentText}>Students</Text>
        <View style={styles.studentCount}><Text style={styles.countText}>{filteredStudents.length}</Text></View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search.."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FontAwesome name="search" size={16} color="#666" />
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add Student</Text>
        </TouchableOpacity>

        <Picker selectedValue={selectedYear} style={styles.picker} onValueChange={setSelectedYear}>
          <Picker.Item label="Select Year" value="" />
          {Object.keys(sectionOptions).map((year) => (
            <Picker.Item key={year} label={year} value={year} />
          ))}
        </Picker>

        <Picker selectedValue={selectedSection} style={styles.picker} enabled={!!selectedYear} onValueChange={setSelectedSection}>
          <Picker.Item label="Select Section" value="" />
          {(sectionOptions[selectedYear] || []).map((section, idx) => (
            <Picker.Item key={idx} label={section} value={section} />
          ))}
        </Picker>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {filteredStudents.map((student, index) => (
          <DOStudentCard
            key={index}
            student={student}
            onPress={() => navigation.navigate("DOStudentProfile", { student })}
          />
        ))}
      </ScrollView>

      <AddStudentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onSubmit={fetchStudents}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  studentHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  studentText: { fontSize: 26, fontWeight: "bold" },
  studentCount: { borderWidth: 2, borderColor: "#B0B0B0", borderRadius: 15, paddingHorizontal: 20, paddingVertical: 2, marginLeft: 15 },
  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#F8F9FC", borderRadius: 25, paddingHorizontal: 15, height: 45 },
  searchInput: { flex: 1, fontSize: 16, color: "#333" },
  actionRow: { flexDirection: "row", alignItems: "center", gap: 5, marginVertical: 15 },
  addButton: { backgroundColor: "#27AE60", paddingVertical: 10, paddingHorizontal: 30, borderRadius: 999 },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  picker: { height: 36, width: 130 }
});

export default DOStudentList;

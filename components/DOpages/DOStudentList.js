import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ToastAndroid,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import Header from "../parts/Header";
import DOStudentCard from "../parts/DOStudentCard";
import AddStudentModal from "../parts/AddStudentModal";
import { firestore } from "../backend/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const DOStudentList = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    const studentsCollection = collection(firestore, "users");
    const q = query(studentsCollection, where("role", "==", "student"));
    try {
      const querySnapshot = await getDocs(q);
      const studentList = querySnapshot.docs.map((doc) => doc.data());
      setStudents(studentList);
      setFilteredStudents(studentList);
    } catch (error) {
      console.error("Error fetching students: ", error);
    }
    setLoading(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterStudents(query, selectedYear, selectedSection);
  };

  const filterStudents = (query, year, section) => {
    let filtered = students;

    if (query) {
      filtered = filtered.filter(
        (student) =>
          student.firstName.toLowerCase().includes(query.toLowerCase()) ||
          student.lastName.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (year) {
      filtered = filtered.filter((student) => student.year === year);
    }

    if (section) {
      filtered = filtered.filter((student) => student.section === section);
    }

    setFilteredStudents(filtered);
  };

  const showToast = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <Header title="Student List" />

      {/* Student Count */}
      <View style={styles.studentHeader}>
        <Text style={styles.studentText}>Students</Text>
        <View style={styles.studentCount}>
          <Text style={styles.countText}>{filteredStudents.length}</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search.."
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <FontAwesome name="search" size={16} color="#666" />
      </View>

      {/* Add + Filters */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add Student</Text>
        </TouchableOpacity>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue) => {
              if (itemValue !== "") {
                setSelectedYear(itemValue);
                setSelectedSection("");
                filterStudents(searchQuery, itemValue, "");
              }
            }}
            style={styles.picker}
          >
            <Picker.Item label="Select Year" value="" color="#888" />
            <Picker.Item label="7th Grade" value="7th Grade" />
            <Picker.Item label="8th Grade" value="8th Grade" />
            <Picker.Item label="9th Grade" value="9th Grade" />
            <Picker.Item label="10th Grade" value="10th Grade" />
            <Picker.Item label="11th Grade" value="11th Grade" />
            <Picker.Item label="12th Grade" value="12th Grade" />
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedSection}
            enabled={!!selectedYear}
            onValueChange={(itemValue) => {
              if (itemValue !== "") {
                setSelectedSection(itemValue);
                filterStudents(searchQuery, selectedYear, itemValue);
              }
            }}
            style={styles.picker}
          >
            <Picker.Item label="Select Section" value="" color="#888" />
            {(sectionOptions[selectedYear] || []).map((section, idx) => (
              <Picker.Item key={idx} label={section} value={section} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.tabRow}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === "all" && styles.tabButtonActive]}
        onPress={() => {
          setActiveTab("all");
          setSelectedYear("");
          setSelectedSection("");
          setSearchQuery("");
          setFilteredStudents(students);
        }}
      >
        <Text style={[styles.tabText, activeTab === "all" && styles.tabTextActive]}>
          All
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === "archive" && styles.tabButtonActive]}
        onPress={() => {
          setActiveTab("archive");
          const archived = students.filter((student) => student.isArchived); // assuming `isArchived` field
          setFilteredStudents(archived);
        }}
      >
        <Text style={[styles.tabText, activeTab === "archive" && styles.tabTextActive]}>
          Archive
        </Text>
      </TouchableOpacity>
    </View>

      {/* Student List */}
      {loading ? (
        <Text>Loading students...</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {filteredStudents.map((student, index) => (
            <DOStudentCard
              key={index}
              student={student}
              onPress={() =>
                navigation.navigate("DOStudentProfile", {
                  student: student,
                })
              }
            />
          ))}
        </ScrollView>
      )}

      {/* Chatbot FAB */}
      <TouchableOpacity style={styles.fab} onPress={showToast}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>

      {/* Modal */}
      <AddStudentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onSubmit={(studentData) => console.log(studentData)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  studentHeader: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  studentText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  studentCount: {
    borderWidth: 2,
    borderColor: "#B0B0B0",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 2,
    marginLeft: 15,
  },
  countText: {
    fontSize: 16,
    color: "#00008B",
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
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 5,
  },
  addButton: {
    backgroundColor: "#27AE60",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
    width: 100,
    height: 36,
    justifyContent: "center",
  },
  picker: {
    fontSize: 12,
    height: 36,
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
  tabRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
    gap: 10,
  },
  
  tabButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 68,
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 2,
  },
  
  tabButtonActive: {
    backgroundColor: "#0D2B79", // navy blue
    borderColor: "#0D2B79",
  },
  
  tabText: {
    color: "#555",
    fontWeight: "600",
    fontSize: 14,
  },
  
  tabTextActive: {
    color: "#fff",
  },  
});

export default DOStudentList;

import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Modal,Platform,ToastAndroid,Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../parts/Header";
<<<<<<< HEAD
import DOStudentCard from "../parts/DOStudentCard";
import AddStudentModal from "../parts/AddStudentModal";
import { firestore } from "../backend/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { checkVerificationAndSendPassword } from "../scripts/verificationCheck";
=======
import MenuBar from "../parts/DOMenuBar";
import StudentCard from "../parts/DOStudentCard";


// To modify: input field for the form, submit button, and any other necessary components

>>>>>>> parent of 87154a4 (Login Auth +StudentList)


const DOStudentList = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const students = [
    { name: "Full Name", year: "Year" },
    { name: "Full Name", year: "Year" },
    { name: "Full Name", year: "Year" },
    { name: "Full Name", year: "Year" },
  ];

<<<<<<< HEAD
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
      await checkVerificationAndSendPassword();
      // 🛡️ Only show non-archived students initially
      const activeStudents = studentList.filter((student) => !student.isArchived);
      setFilteredStudents(activeStudents);
  
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
=======
    const showToast = () => {
      if (Platform.OS === "android") {
        ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
      } 
    };
>>>>>>> parent of 87154a4 (Login Auth +StudentList)

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <View style={{ marginBottom: 15 }}> 
        <Header title="StudentList" />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Students Count */}
        <View style={styles.studentHeader}>
          <Text style={styles.studentText}>Students</Text>
          <View style={styles.studentCount}>
            <Text style={styles.countText}>20</Text>
          </View>
          <TouchableOpacity style={styles.yearButton}>
            <Text style={styles.yearText}>Year</Text>
            <FontAwesome name="caret-down" size={14} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput placeholder="Search" style={styles.searchInput} />
          <FontAwesome name="times-circle" size={18} color="#999" />
        </View>

        {/* Add Student Button */}
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add Student</Text>
        </TouchableOpacity>

        {/* Student List */}
        {students.map((student, index) => (
          <StudentCard
            key={index}
            name={student.name}
            year={student.year}
            onPress={() => navigation.navigate("DOStudentProfile")}
          />
        ))}
      </ScrollView>

<<<<<<< HEAD
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
          const activeStudents = students.filter((student) => !student.isArchived); 
          setFilteredStudents(activeStudents);
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
          const archivedStudents = students.filter((student) => student.isArchived); 
          setFilteredStudents(archivedStudents);
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
=======
>>>>>>> parent of 87154a4 (Login Auth +StudentList)
      <TouchableOpacity style={styles.fab} onPress={showToast}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>

<<<<<<< HEAD
      {/* Modal */}
      <AddStudentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onSubmit={(studentData) => {
          fetchStudents();
          setModalVisible(false);
          ToastAndroid.show("Student added successfully!", ToastAndroid.SHORT);
        }}
      />
=======
      {/* Add Student Modal */}
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>

            {/* Modal Content */}
            <Text style={styles.modalTitle}>Create New Student Account</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>First Name:</Text>
              <Text style={styles.infoText}>Middle Name:</Text>
              <Text style={styles.infoText}>Last Name:</Text>
              <Text style={styles.infoText}>Gender:</Text>
              <Text style={styles.infoText}>Birth Date:</Text>
              <Text style={styles.infoText}>Address:</Text>
              <Text style={styles.infoText}>Year & Section:</Text>
              <Text style={styles.infoText}>Adviser:</Text>

              <Text style={[styles.infoText, styles.emergencyContact]}>Emergency Contact</Text>
              <Text style={styles.infoText}>Parent/Guardian:</Text>
              <Text style={styles.infoText}>Email:</Text>
              <Text style={styles.infoText}>Contact Number:</Text>
            </View>
          </View>
        </View>
      </Modal>
>>>>>>> parent of 87154a4 (Login Auth +StudentList)
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
  },
  content: {
    padding: 20,
  },
  studentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  studentText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  studentCount: {
    backgroundColor: "#E3E3E3",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  countText: {
    fontWeight: "bold",
  },
  yearButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    backgroundColor: "#E3E3E3",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  yearText: {
    marginRight: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  addButton: {
    backgroundColor: "#27AE60",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
    tintColor: "#fff", // Keeps icon color consistent
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // ✅ Blurred background effect
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
<<<<<<< HEAD
  
  tabButtonActive: {
    backgroundColor: "#0D2B79", 
    borderColor: "#0D2B79",
=======
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
>>>>>>> parent of 87154a4 (Login Auth +StudentList)
  },
  closeText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0057FF",
    textAlign: "center",
  },
  infoContainer: {
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 3,
  },
  emergencyContact: {
    fontWeight: "bold",
    color: "#0057FF",
    marginTop: 10,
  },
  createButton: {
    backgroundColor: "#F4B400",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15, // ✅ Ensures proper spacing at the bottom
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DOStudentList;

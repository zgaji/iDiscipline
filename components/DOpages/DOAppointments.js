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
  Alert,
  Modal
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import Header from "../parts/Header";  // Adjust the import if necessary
import AddAppointmentModal from "../parts/AddAppointmentModal";


const DOAppointments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Recent");

  const [currentDate, setCurrentDate] = useState(new Date());  // Set default date to current date
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state

  const handleAddAppointment = () => {
    console.log("Appointment added");
    setModalVisible(false); // Close modal after appointment is added
  };

  const handleChatbotClick = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
    }
  };

  // Function to go to next month
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1); // Increment year after December
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Function to go to previous month
  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1); // Decrement year before January
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Function to get the number of days in the current month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate(); // Get the number of days in the month
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <View style={{ marginBottom: 15 }}>
        <Header title="Appointments" />
      </View>

      <View style={styles.content}>
        {/* Title and count */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Appointments</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>20</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={16} color="#666" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <FontAwesome name="times-circle" size={20} color="#aaa" />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filter Buttons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.centeredButtons}>
          {["All", "Counselling", "PTC", "Archived"].map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.filterButton, selectedCategory === category && styles.activeFilter]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[styles.filterText, selectedCategory === category && styles.activeFilterText]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Action Row (Add Appointment & Sorting) */}
        <View style={styles.actionRow}>
          {/* Add New Appointment Button */}
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.addButtonText}>Add new appointment</Text>
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

        {/* Calendar Section */}
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <Text style={styles.yearText}>{currentYear}</Text>
            <Text style={styles.monthText}>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })}</Text>
            <View style={styles.calendarNavButtons}>
              <TouchableOpacity onPress={handlePreviousMonth}>
                <Text style={styles.navText}>Prev</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextMonth}>
                <Text style={styles.navText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Weekdays */}
          <View style={styles.weekdays}>
            {["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"].map((day) => (
              <Text key={day} style={styles.weekdayText}>
                {day}
              </Text>
            ))}
          </View>

          {/* Calendar Grid */}
          <View style={styles.datesGrid}>
            {[...Array(getDaysInMonth(currentMonth, currentYear))].map((_, index) => (
              <Text key={index} style={styles.dateText}>
                {index + 1}
              </Text>
            ))}
          </View>
        </View>

        {/* Appointment List Table */}
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={styles.tableRowHeader}>
              <Text style={styles.tableHeader}>Status</Text>
              <Text style={styles.tableHeader}>First Name</Text>
              <Text style={styles.tableHeader}>Last Name</Text>
              <Text style={styles.tableHeader}>Case No.</Text>
              <Text style={styles.tableHeader}>Type</Text>
            </View>

            {/* Dummy Data */}
            {[1, 2, 3].map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>Pending</Text>
                <Text style={styles.tableCell}>John</Text>
                <Text style={styles.tableCell}>Doe</Text>
                <Text style={styles.tableCell}>2025-{index + 1}</Text>
                <Text style={styles.tableCell}>PTC</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Chatbot FAB */}
      <TouchableOpacity style={styles.fab} onPress={handleChatbotClick}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>

      {/* Add Appointment Modal */}
      <AddAppointmentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleAddAppointment={handleAddAppointment}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
    marginBottom: 10,
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

  addButton: {
    backgroundColor: "#27AE60",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
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
  table: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 3,
    minWidth: "100%",
  },
  tableRowHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "center",
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    textAlign: "center",
    color: "#333",
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

  // Calendar styles
  calendarContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    elevation: 3,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  yearText: {
    fontSize: 14,
    color: "#555",
  },
  monthText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  nextText: {
    fontSize: 14,
    color: "#007BFF",
  },
  weekdays: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  weekdayText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  datesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dateText: {
    width: "14%",
    textAlign: "center",
    paddingVertical: 5,
    fontSize: 14,
  },

  // Modal styles
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  modalButton: {
    backgroundColor: "#27AE60",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalCloseButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  
});

export default DOAppointments;

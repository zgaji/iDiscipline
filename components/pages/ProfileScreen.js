import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../parts/Header";
import StudentCard from "../parts/StudentCard";
import StatCard from "../parts/StatCard";
import MenuBar from "../parts/MenuBar";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Student Profile" />

      {/* Category Buttons (Horizontal Scroll) */}
      <MenuBar />

      {/* Profile Content */}
      <ScrollView>
        <StudentCard />

        {/* Student Details */}
        <StatCard
          title="Student Details"
          details={{
            "First Name": "",
            "Middle Name": "",
            "Last Name": "",
            Gender: "",
            "Birth Date": "",
            Address: "",
          }}
        />

        {/* Emergency Contact */}
        <StatCard
          title="Emergency Contact"
          details={{
            "Parent/Guardian": "",
            Email: "",
            "Contact Number": "",
          }}
          titleStyle={{ color: "red", fontStyle: "italic" }}
        />
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity style={styles.fab}>
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default ProfileScreen;

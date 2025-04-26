import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DOStudentCard = ({ student }) => {  // Accept the entire student object
  const navigation = useNavigation();
  const fullName = `${student.firstName || "No First Name"} ${student.lastName || "No Last Name"}`;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("DOStudentProfileScreen", {
          student: student,  // Pass the entire student object
        })
      }
      accessibilityLabel={`View profile of ${fullName}`}
      accessibilityHint={`Navigates to the profile of ${fullName}`}
    >
      <View style={styles.row}>
        <Image source={require("../../assets/user.png")} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{fullName}</Text>
          <View style={styles.yearSectionContainer}>
            <Text style={styles.year}>{student.year}</Text>
            <Text style={styles.section}>{student.section}</Text>
          </View>
        </View>
        <Text style={styles.viewText}>View</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    elevation: 3,
    shadowOpacity: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  yearSectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  year: {
    fontSize: 14,
    color: "#888",
    marginRight: 10,
  },
  section: {
    fontSize: 14,
    color: "#555",
  },
  viewText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "bold",
  },
});

export default DOStudentCard;

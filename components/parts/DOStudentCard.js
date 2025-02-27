import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const StudentCard = ({ name, year }) => {
  const navigation = useNavigation(); // ✅ Get navigation object

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate("DOStudentProfile", { studentName: name, studentYear: year })} // ✅ Navigate with data
    >
      <View style={styles.row}>
        <Image source={require("../../assets/user.png")} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.year}>{year}</Text>
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
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  year: {
    fontSize: 14,
    color: "#666",
  },
  viewText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});

export default StudentCard;

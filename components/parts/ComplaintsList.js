import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ComplaintsList = () => {
  const complaints = [
    { name: "User", position: "Position" },
    { name: "User", position: "Position" },
    { name: "User", position: "Position" },
    { name: "User", position: "Position" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Complaints</Text>
      {complaints.map((complaint, index) => (
        <View key={index} style={styles.complaintItem}>
          <Image source={require("../../assets/user.png")} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{complaint.name}</Text>
            <Text style={styles.position}>{complaint.position}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  complaintItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  position: {
    fontSize: 12,
    color: "#666",
  },
});

export default ComplaintsList;

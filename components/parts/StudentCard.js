import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const StudentCard = ({ student, onPress }) => {
  return (
    <TouchableOpacity style={styles.profileCard} onPress={onPress}>
      <View style={styles.profileHeader} />
      <View style={styles.profileBody}>
        <Image source={require("../../assets/user.png")} style={styles.avatar} />
        <View style={styles.profileText}>
          <Text style={styles.name}>Student Name</Text>
          <Text style={styles.details}>Student No.: </Text>
          <Text style={styles.details}>Year & Section: </Text>
          <Text style={styles.details}>School Year: </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 3,
  },
  profileHeader: {
    backgroundColor: "#0057FF",
    height: 30,
  },
  profileBody: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileText: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    color: "#666",
  },
});

export default StudentCard;

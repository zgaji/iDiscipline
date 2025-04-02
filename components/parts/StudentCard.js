import React from "react";
import { View, Text, Image, StyleSheet,TouchableOpacity } from "react-native";

const StudentCard = ({ student, onPress }) => {
  return (
    <TouchableOpacity style={styles.profileCard} onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.header} />

        <View style={styles.body}>
          <View style={styles.imagePlaceholder}>
            <Image source={require("../../assets/user.png")} style={styles.avatar} />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.name}>Student Name</Text>
            <Text style={styles.studentNo}>Student No.</Text>
            <Text style={styles.details}>Year & Section:</Text>
            <Text style={styles.details}>School Year:</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    width: 350, 
    marginBottom: 20,
    height: 175,
  },
  header: {
    backgroundColor: "#0057FF",
    height: 30, 
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  body: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 25,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  studentNo: {
    fontSize: 16  ,
    fontWeight: "bold",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
    marginTop: 5,
  },
  details: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4F4D4D",
    marginTop: 3,
    marginBottom: 3,
  },
});

export default StudentCard;

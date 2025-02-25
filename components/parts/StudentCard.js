import React from "react";
import { View, Text, Image } from "react-native";

const StudentCard = () => {
  return (
    <View style={{ backgroundColor: "white", padding: 10, borderRadius: 10, margin: 10 }}>
      <Image source={{ uri: "https://via.placeholder.com/50" }} style={{ width: 50, height: 50 }} />
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>Student Name</Text>
      <Text>Student No.</Text>
      <Text>Year & Section:</Text>
      <Text>School Year:</Text>
    </View>
  );
};

export default StudentCard;

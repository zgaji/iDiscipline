import React from "react";
import { View, Text } from "react-native";

const StatCard = ({ title, icon, count, bgColor }) => {
  return (
    <View style={{ backgroundColor: bgColor, padding: 20, borderRadius: 10, alignItems: "center", flex: 1, margin: 5 }}>
      <Text style={{ fontSize: 30 }}>{icon}</Text>
      <Text style={{ fontWeight: "bold" }}>{title}</Text>
      <Text style={{ fontSize: 24 }}>{count}</Text>
    </View>
  );
};

export default StatCard;

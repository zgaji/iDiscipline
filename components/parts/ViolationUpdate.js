import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ViolationUpdate = ({ text, date }) => {
  return (
    <View style={styles.updateItem}>
      <View style={styles.bullet} />
      <Text style={styles.updateText}>{text}</Text>
      <Text style={styles.updateDate}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  updateItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  bullet: {
    width: 10,
    height: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    marginRight: 10,
  },
  updateText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  updateDate: {
    fontSize: 12,
    color: "#666",
    marginLeft: 10,
  },
});

export default ViolationUpdate;

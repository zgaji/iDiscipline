import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatCard = ({ title, icon, count, bgColor }) => {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "45%", 
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, 
  },
  icon: {
    fontSize: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "left",
  },
  count: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default StatCard;
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DOStatCard = ({ title, icon, count, bgColor }) => {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "30%",
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    fontSize: 24,
    color: "#fff",
  },
  count: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default DOStatCard; // ✅ Updated export

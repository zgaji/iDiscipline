import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const StatCard = ({ title, icon, count, bgColor }) => {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <Text style={styles.title}>{title}</Text>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.count}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "47%", 
    padding: 18, 
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    width: "100%",
    marginBottom: 5,
  },
  icon: {
    width: 55, 
    height: 55,
    tintColor: "#fff",
    alignSelf: "left",
    marginBottom: 5,
  },
  count: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    position: "absolute",
    right: 20,
    bottom: 15, 
  },
});

export default StatCard;

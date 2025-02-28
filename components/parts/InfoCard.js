import React from "react";
import { View, Text, StyleSheet } from "react-native";

const InfoCard = ({ title, details, titleStyle }) => {
  return (
    <View style={styles.card}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {Object.entries(details).map(([key, value]) => (
        <Text key={key} style={styles.detailText}>
          <Text style={styles.label}>{key}:</Text> {value || ""}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#1A237E",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
});

export default InfoCard;

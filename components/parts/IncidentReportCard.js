import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const IncidentReportCard = ({ report, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{report.incidentReportNo}</Text>
        <View style={[styles.statusBadge, { backgroundColor: "#DF9D0E" }]}>
          <Text style={styles.statusText}>{report.status}</Text>
        </View>
      </View>
      <Text style={styles.cardInfo}>Date Sent: {report.dateReported}</Text>
      <Text style={styles.description}>{report.description}</Text>
      <TouchableOpacity style={styles.readMore} onPress={onPress}>
        <Text style={styles.readMoreText}>Read More</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  cardInfo: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: "#333",
  },
  readMore: {
    marginTop: 5,
  },
  readMoreText: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default IncidentReportCard;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ViolationCaseCard = ({ caseData, openModal }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => openModal(caseData)}>
      <View style={styles.caseHeader}>
        <Text style={styles.caseTitle}>Case #{caseData.id}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Status</Text>
        </View>
      </View>
      <Text style={styles.caseInfo}>Student ID: {caseData.studentId}</Text>
      <Text style={styles.caseInfo}>Date Sent: {caseData.dateSent}</Text>
      <Text style={styles.description}>{caseData.description}</Text>

      {/* Read More Button */}
      <TouchableOpacity style={styles.readMore} onPress={() => openModal(caseData)}>
        <Text style={styles.readMoreText}>Read More</Text>
        <FontAwesome name="chevron-right" size={14} color="#007AFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  caseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  caseTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statusBadge: {
    backgroundColor: "#FF5E5B",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  caseInfo: {
    fontSize: 14,
    color: "#666",
    marginVertical: 2,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginVertical: 8,
  },
  readMore: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  readMoreText: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 5,
  },
});

export default ViolationCaseCard;

import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const DOViolationsDetails = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.caseTitle}>Case #1</Text>
          <TouchableOpacity onPress={onClose}><FontAwesome name="close" size={20} color="#000" /></TouchableOpacity>
        </View>

        {/* Violation Details */}
        <Text style={styles.detailText}><Text style={styles.boldText}>Student Name:</Text> {data.firstName} {data.lastName}</Text>
        <Text style={styles.detailText}><Text style={styles.boldText}>Status:</Text> {data.status}</Text>
        <Text style={styles.detailText}><Text style={styles.boldText}>Violation:</Text> {data.type}</Text>
        <Text style={styles.detailText}><Text style={styles.boldText}>Time Reported:</Text> Thursday - Dec. 25, 2025</Text>

        {/* Updates Section */}
        <Text style={styles.updatesHeader}>Updates</Text>
        <View style={styles.timeline}>
          <View style={styles.timelineItem}>
            <View style={styles.dot} />
            <Text style={styles.updateText}>Report Sent</Text>
            <Text style={styles.dateText}>Thursday - Dec. 25, 2025</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.printButton}><Text style={styles.printText}>Print</Text></TouchableOpacity>
          <TouchableOpacity style={styles.messageButton}><Text style={styles.messageText}>Message</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "center", alignItems: "center" },
  modalContainer: { backgroundColor: "#fff", width: "85%", padding: 20, borderRadius: 10 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  caseTitle: { fontSize: 18, fontWeight: "bold", color: "#0057FF" },
  detailText: { fontSize: 14, marginVertical: 3 },
  boldText: { fontWeight: "bold" },
  updatesHeader: { fontSize: 16, fontWeight: "bold", marginTop: 15, color: "#0057FF" },
  timeline: { marginTop: 10 },
  timelineItem: { flexDirection: "row", alignItems: "center" },
  dot: { width: 8, height: 8, backgroundColor: "#0057FF", borderRadius: 4, marginRight: 10 },
  updateText: { fontSize: 14 },
  dateText: { fontSize: 12, color: "#888" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  printButton: { backgroundColor: "#ddd", padding: 10, borderRadius: 5 },
  messageButton: { backgroundColor: "#0057FF", padding: 10, borderRadius: 5 },
  printText: { fontWeight: "bold" },
  messageText: { color: "#fff", fontWeight: "bold" },
});

export default DOViolationsDetails;

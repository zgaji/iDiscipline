import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../parts/Header";
import ViolationUpdate from "../parts/ViolationUpdate";

const DOViolationDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const caseData = route.params?.caseData || {}; 

  return (
    <View style={styles.container}>
      <Header title="Violations" />

      <ScrollView contentContainerStyle={styles.detailsContainer}>
     
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <FontAwesome name="times" size={18} color="#666" />
        </TouchableOpacity>

      
        <Text style={styles.caseTitle}>Case #{caseData.id || "N/A"}</Text>
        <Text style={styles.info}>Student Name: {caseData.studentName || "N/A"}</Text>
        <Text style={styles.info}>Status: {caseData.status || "N/A"}</Text>
        <Text style={styles.info}>Category: {caseData.category || "N/A"}</Text>
        <Text style={styles.info}>Violation: {caseData.violation || "N/A"}</Text>
        <Text style={styles.info}>Time Reported: {caseData.timeReported || "N/A"}</Text>
        <Text style={styles.info}>Notes: {caseData.notes || "No additional notes"}</Text>

        <Text style={styles.updateTitle}>Updates</Text>
        <ViolationUpdate text="Report Sent" date={caseData.date || "Unknown Date"} />
      </ScrollView>

      <TouchableOpacity style={styles.messageButton} onPress={() => navigation.navigate("DOChatPortal")}>
        <Text style={styles.messageText}>Message</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  caseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0057FF",
  },
  info: {
    fontSize: 14,
    color: "#333",
    marginVertical: 2,
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    color: "#0057FF",
  },
  messageButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  messageText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DOViolationDetails;

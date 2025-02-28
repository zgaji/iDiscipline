import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../parts/Header";
import ViolationUpdate from "../parts/ViolationUpdate";
import ViolationCaseCard from "../parts/ViolationCaseCard";

const ViolationDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { type = "Unknown", count = 0 } = route.params || {};

  const [selectedCase, setSelectedCase] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const cases = [
    { id: 1, studentId: "#00000", dateSent: "Dec 25 2025", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { id: 2, studentId: "#00000", dateSent: "Dec 25 2025", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
  ];

  const openModal = (caseItem) => {
    setSelectedCase(caseItem);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Header title="Violations" />
      <TouchableOpacity style={styles.dropdownIcon} onPress={() => navigation.navigate("Violations")}>
        <FontAwesome name="angle-down" size={24} color="#999" />
      </TouchableOpacity>
      <View style={styles.violationInfo}>
        <Text style={styles.violationType}>{type}</Text>
        <Text style={styles.offenseType}>Major Offense</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.caseList}>
        {cases.map((caseItem) => (
          <ViolationCaseCard key={caseItem.id} caseData={caseItem} openModal={openModal} />
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <FontAwesome name="times" size={18} color="#666" />
            </TouchableOpacity>
            {selectedCase && (
              <ScrollView>
                <Text style={styles.caseTitle}>Case #{selectedCase.id}</Text>
                <Text style={styles.info}><Text style={styles.boldText}>Student Name:</Text> John Doe</Text>
                <Text style={styles.info}><Text style={styles.boldText}>Status:</Text></Text>
                <Text style={styles.info}><Text style={styles.boldText}>Category:</Text></Text>
                <Text style={styles.info}><Text style={styles.boldText}>Violation:</Text></Text>
                <Text style={styles.info}><Text style={styles.boldText}>Time Reported:</Text></Text>
                <Text style={styles.info}><Text style={styles.boldText}>Notes:</Text></Text>
                <View style={styles.divider} />
                <Text style={styles.updateTitle}>Updates</Text>
                <ViolationUpdate text="Report Sent" date={selectedCase.dateSent} />
              </ScrollView>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.printButton}>
                <Text style={styles.buttonText}>Print</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageButton} onPress={() => navigation.navigate("ChatPortal")}>
                <Text style={styles.buttonText}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
  },
  dropdownIcon: {
    alignSelf: "center",
    marginVertical: 10,
  },
  violationInfo: {
    backgroundColor: "#E8F0FF",
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  violationType: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  offenseType: {
    fontSize: 14,
    color: "#666",
  },
  countBadge: {
    backgroundColor: "#0057FF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  countText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  caseList: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  caseTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0057FF",
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: "#333",
    marginVertical: 2,
  },
  boldText: {
    fontWeight: "bold",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 10,
  },
  updateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0057FF",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "left",
    marginTop: 50,
  },
  printButton: {
    backgroundColor: "#4C66D6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  messageButton: {
    backgroundColor: "#0057FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ViolationDetailsScreen;

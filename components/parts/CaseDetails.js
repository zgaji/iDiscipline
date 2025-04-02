import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ViolationUpdate from "./ViolationUpdate";


const CaseDetails = ({ visible, caseData, onClose, onMessage }) => {
  if (!caseData) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          
          <ScrollView>
            <Text style={styles.caseTitle}>Case #{caseData.id}</Text>
            <Text style={styles.info}><Text style={styles.boldText}>Student Name:</Text> John Doe</Text>
            <Text style={styles.info}><Text style={styles.boldText}>Status:</Text></Text>
            <Text style={styles.info}><Text style={styles.boldText}>Category:</Text></Text>
            <Text style={styles.info}><Text style={styles.boldText}>Violation:</Text></Text>
            <Text style={styles.info}><Text style={styles.boldText}>Time Reported:</Text></Text>
            <Text style={styles.info}><Text style={styles.boldText}>Notes:</Text></Text>
            
            <View style={styles.divider} />
            <Text style={styles.updateTitle}>Updates</Text>
            <ViolationUpdate text="Report Sent" date={caseData.dateSent} />
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.printButton}>
              <Text style={styles.buttonText}>Print</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton} onPress={onMessage}>
              <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    position: "absolute", 
    top: 10, 
    right: 15 
  },
  closeButtonText: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#605E5E" 
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
    justifyContent: "flex-start",
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

export default CaseDetails;

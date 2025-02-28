import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../parts/Header";
import ViolationUpdate from "../parts/ViolationUpdate";
import { useRoute, useNavigation } from "@react-navigation/native";


const ChatPortalScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const navigation = useNavigation();
  const [selectedCase, setSelectedCase] = useState({
    id: 1,
    studentName: "John Doe",
    dateSent: "Dec 25 2025",
    status: "Pending",
    category: "Major",
    violation: "Disruptive Behavior",
    timeReported: "10:30 AM",
    notes: "Student was reported for loud behavior in the library."
  });

  return (
    <View style={styles.container}>
      <Header title="Chat" />
      <TouchableOpacity 
        style={styles.dropdownIcon} 
        onPress={() => navigation.navigate("ViolationDetails", { type: selectedCase.category, count: 3 })}
      >
        <FontAwesome name="angle-down" size={24} color="#999" />
      </TouchableOpacity>
      
      {/* Case Details Section */}
      <TouchableOpacity style={styles.caseDetails} onPress={() => setModalVisible(true)}>
        <Text style={styles.caseDetailsText}>Case Details:</Text>
        <FontAwesome name="angle-right" size={18} color="#000" />
      </TouchableOpacity>
      
      {/* Chat Messages */}
      <ScrollView contentContainerStyle={styles.chatContainer}>
        <View style={styles.messageBubble}>
          <View style={styles.avatar} />
          <View style={styles.messageContent}>
            <Text style={styles.senderName}>Disciplinary Officer</Text>
            <Text style={styles.messageText}>This is a reminder regarding your violation.</Text>
            <Text style={styles.messageDate}>Thursday - Dec. 25, 2025</Text>
          </View>
        </View>
      </ScrollView>

      {/* Message Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Chat Here..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>

      {/* Case Details Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
           {/* Close Button */}
           <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              console.log("Close button clicked!");
              setModalVisible(false);
            }}
          >
            <FontAwesome name="times" size={20} color="#666" />
          </TouchableOpacity>
            <ScrollView>
              <Text style={styles.caseTitle}>Case #{selectedCase.id}</Text>
              <Text style={styles.info}><Text style={styles.boldText}>Student Name:</Text> {selectedCase.studentName}</Text>
              <Text style={styles.info}><Text style={styles.boldText}>Status:</Text> {selectedCase.status}</Text>
              <Text style={styles.info}><Text style={styles.boldText}>Category:</Text> {selectedCase.category}</Text>
              <Text style={styles.info}><Text style={styles.boldText}>Violation:</Text> {selectedCase.violation}</Text>
              <Text style={styles.info}><Text style={styles.boldText}>Time Reported:</Text> {selectedCase.timeReported}</Text>
              <Text style={styles.info}><Text style={styles.boldText}>Notes:</Text> {selectedCase.notes}</Text>
              <View style={styles.divider} />
              <Text style={styles.updateTitle}>Updates</Text>
              <ViolationUpdate text="Report Sent" date={selectedCase.dateSent} />
            </ScrollView>
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
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    padding: 10,
    zIndex: 10, 
  },
  caseDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    margin: 15,
    borderRadius: 10,
    elevation: 3,
  },
  caseDetailsText: {
    fontWeight: "bold",
  },
  chatContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  messageBubble: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  messageContent: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
  },
  senderName: {
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  messageText: {
    color: "#fff",
  },
  messageDate: {
    fontSize: 12,
    color: "#ddd",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
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
    padding: 20,
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
  dropdownIcon: {
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default ChatPortalScreen;

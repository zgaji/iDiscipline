import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../parts/Header";
import CaseDetails from "../parts/CaseDetails";
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
        onPress={() => navigation.navigate("ViolationDetailsScreen", { type: selectedCase.category, count: 3 })}
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
          editable={!modalVisible} // Disable input when modal is open
        />
        <TouchableOpacity style={[styles.sendButton, modalVisible && styles.disabledButton]} disabled={modalVisible}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>

      {/* Case Details Modal */}
      <CaseDetails visible={modalVisible} caseData={selectedCase} onClose={() => setModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
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
  disabledButton: {
    backgroundColor: "#ccc",
  },
  dropdownIcon: {
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default ChatPortalScreen;

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

const DOChatPortal = ({ onClose }) => {
    const navigation = useNavigation();
  return (
    <View style={styles.chatBox}>
      {/* Header */}
      <View style={styles.chatHeader}>
        <Text style={styles.chatTitle}>Chat</Text>
        <TouchableOpacity onPress={onClose}>
          <FontAwesome name="close" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Case Details */}
      <TouchableOpacity style={styles.caseDetails}>
        <Text style={styles.caseText}>Case Details:</Text>
        <FontAwesome name="chevron-right" size={14} />
      </TouchableOpacity>

      {/* Chat Messages */}
      <View style={styles.chatContainer}>
        <Text style={styles.messageUser}>DO</Text>
        <View style={styles.messageBubble}><Text style={styles.messageText}>Hello!</Text></View>
      </View>

      {/* Input Box */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Chat Here.." />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DOViolationsDetails = ({ data, onClose }) => {
  const [showChat, setShowChat] = useState(false);
  const [isViolationModalOpen, setViolationModalOpen] = useState(true);

  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  if (!data) return null;

  const handleOpenChat = () => {
    setViolationModalOpen(false); 

    setTimeout(() => {
      setShowChat(true); 
    }, 300);
  };

  useEffect(() => {
    if (showChat) {
      // Animate Chat Portal Appearance
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    }
  }, [showChat]);

  return (
    <>
      {/* Violation Details Modal */}
      <Modal visible={isViolationModalOpen && !showChat} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.caseTitle}>Case #1</Text>
              <TouchableOpacity onPress={onClose}>
                <FontAwesome name="close" size={20} color="#000" />
              </TouchableOpacity>
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
                <Text style={styles.dateText}>     Thursday - Dec. 25, 2025</Text>
              </View>
            </View>

           <View style={styles.buttonContainer}>
                         <TouchableOpacity style={styles.printButton}>
                           <Text style={styles.buttonText}>Print</Text>
                         </TouchableOpacity>
                         <TouchableOpacity style={styles.messageButton} onPress={() => navigation.navigate("DOChatPortal")}>
                           <Text style={styles.buttonText}>Message</Text>
                         </TouchableOpacity>
                       </View>
          </View>
        </View>
      </Modal>

      {/* Chat Portal Modal */}
      <Modal visible={showChat} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <Animated.View style={[styles.chatContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <DOChatPortal onClose={() => setShowChat(false)} />
          </Animated.View>
        </View>
      </Modal>
    </>
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
  chatContainer: { backgroundColor: "#fff", width: "90%", height: "80%", borderRadius: 10, padding: 20 },
  chatBox: { backgroundColor: "#fff", width: "100%", height: "100%", borderRadius: 10, padding: 20 },
  chatHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  chatTitle: { fontSize: 18, fontWeight: "bold", color: "#0057FF" },
  caseDetails: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderColor: "#ddd" },
  caseText: { fontWeight: "bold" },
});

export default DOViolationsDetails;

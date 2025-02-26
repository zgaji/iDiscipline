import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Header from "../parts/Header";

const ChatPortalScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Violations" />

      <ScrollView contentContainerStyle={styles.chatContainer}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>✖</Text>
        </TouchableOpacity>

        {/* Chat Title */}
        <Text style={styles.chatTitle}>Chat</Text>

        {/* Message */}
        <View style={styles.chatMessage}>
          <Text style={styles.chatText}>DO</Text>
          <Text style={styles.chatDate}>Thursday - Dec. 25, 2025</Text>
        </View>
      </ScrollView>

      {/* Message Button */}
      <TouchableOpacity style={styles.messageButton}>
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
  chatContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  closeText: {
    fontSize: 18,
    color: "#666",
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  chatMessage: {
    marginTop: 10,
  },
  chatText: {
    fontSize: 14,
  },
  chatDate: {
    fontSize: 12,
    color: "#666",
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
  },
});

export default ChatPortalScreen;

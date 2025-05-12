// Enhanced ChatPortalScreen.js - Real-time Chat Interface
import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { UserContext } from '../contexts/UserContext';

const ChatPortalScreen = () => {
  const { messages, sendMessage, userRole, student } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState('');
  const scrollViewRef = useRef();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  useEffect(() => {
    // Automatically scroll to the bottom when a new message arrives
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef} style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={msg.sender === (userRole === 'admin' ? 'Disciplinary Officer' : student?.studentEmail) ? styles.sentMessage : styles.receivedMessage}
          >
            <Text style={styles.messageSender}>{msg.sender}</Text>
            <Text style={styles.messageText}>{msg.content}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder='Type your message...'
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '75%'
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '75%'
  },
  messageSender: {
    fontWeight: 'bold',
    marginBottom: 2
  },
  messageText: {
    fontSize: 16
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 8,
    elevation: 3
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  }
});

export default ChatPortalScreen;

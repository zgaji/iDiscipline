import React from "react";
import { View, Image, StyleSheet, ScrollView,Platform,ToastAndroid, TouchableOpacity } from "react-native";
import Header from "../parts/Header";
import MenuBar from "../parts/DOMenuBar";

const DOHandbookScreen = () => {
  const handleChatbotClick = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
    } 
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <View style={{ marginBottom: 15 }}> 
        <Header title="Handbook" />
      </View>
      <View style={{ marginBottom: 15 }}> 
        <MenuBar />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={require("../../assets/handbook.png")} style={styles.image} resizeMode="contain" />
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={handleChatbotClick}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 500, // Adjust based on image size
    borderWidth: 2,
    borderColor: "#0057FF",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabIcon: {
    width: 30,
    height: 30,
    tintColor: "#fff", // Keeps icon color consistent
  },
});

export default DOHandbookScreen;

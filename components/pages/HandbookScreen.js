import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Platform, ToastAndroid, Button, Alert } from "react-native";
import Header from "../parts/Header";
import MenuBar from "../parts/MenuBar";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const HandbookScreen = () => {
  const pdfUrl = "https://mipss.edu.ph/shb25.pdf"; 
  const [fileUri, setFileUri] = useState(null);

  useEffect(() => {
    const checkAndDownloadPDF = async () => {
      try {
        const localFileUri = `${FileSystem.documentDirectory}shb25.pdf`;
        const fileInfo = await FileSystem.getInfoAsync(localFileUri);

        if (!fileInfo.exists) {
          console.log("Downloading PDF...");
          const { uri } = await FileSystem.downloadAsync(pdfUrl, localFileUri);
          console.log("Download complete:", uri);
        }
        setFileUri(localFileUri);
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    };

    checkAndDownloadPDF();
  }, []);

  const handleChatbotClick = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot clicked", ToastAndroid.SHORT);
    } else {
      Alert.alert("Chatbot clicked");
    }
  };

  const downloadPDF = async () => {
    if (fileUri) {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert("Sharing is not available on this device.");
      }
    } else {
      Alert.alert("PDF not available. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <Header title="Student Handbook" />

      {/* Online PDF Viewer */}
      <View style={{ flex: 1, height: 500 }}>
        <WebView 
          source={{ uri: `https://docs.google.com/gview?embedded=true&url=${pdfUrl}` }} 
          style={{ flex: 1 }} 
        />
      </View>

      <View style={{ marginVertical: 20 }}>
        <Button title="Download Student Handbook" onPress={downloadPDF} />
      </View>

      <TouchableOpacity style={styles.fab} onPress={handleChatbotClick}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    tintColor: "#fff",
  },
});

export default HandbookScreen;

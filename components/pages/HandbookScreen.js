import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import Header from "../parts/Header";
import MenuBar from "../parts/MenuBar";

const HandbookScreen = () => {
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
});

export default HandbookScreen;

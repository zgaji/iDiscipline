import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

const MenuBar = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const menuItems = ["Home", "Profile", "Violations", "Complaints", "Appointments", "Handbook"];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.button, activeTab === item && styles.activeButton]}
            onPress={() => setActiveTab(item)}
          >
            <Text style={[styles.text, activeTab === item && styles.activeText]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  button: {
    paddingVertical: 11,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 }, 
    shadowOpacity: 0.2,
    shadowRadius: 4, 
    elevation: 5,
    overflow: "visible",
  },
  activeButton: {
    backgroundColor: "#0056FF", 
  },
  text: {
    color: "#333",
    fontWeight: "bold",
  },
  activeText: {
    color: "#fff",
  },
});

export default MenuBar;

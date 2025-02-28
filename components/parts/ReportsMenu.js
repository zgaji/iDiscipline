import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const ReportsMenu = () => {
  const [activeTab, setActiveTab] = useState("Incident Report");

  return (
    <View style={styles.container}>
      {["All", "Incident Report", "Archive"].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.button,
            activeTab === tab ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => setActiveTab(tab)}
        >
          <Text
            style={[
              styles.buttonText,
              activeTab === tab ? styles.activeText : styles.inactiveText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#007BFF",
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: "#007BFF",
  },
  inactiveButton: {
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  activeText: {
    color: "#fff",
  },
  inactiveText: {
    color: "#007BFF",
  },
});

export default ReportsMenu;

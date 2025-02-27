import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const AppointmentsMenu = () => {
  const [selected, setSelected] = useState("PTC"); // Default selection

  const categories = ["All", "Counselling", "PTC", "Archive"];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.button, selected === category && styles.selectedButton]}
            onPress={() => setSelected(category)}
          >
            <Text style={[styles.buttonText, selected === category && styles.selectedText]}>
              {category}
            </Text>
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
  label: {
    color: "#A0A0A0",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
  },
  scrollContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: "#0057FF",
    borderColor: "#0057FF",
  },
  buttonText: {
    fontSize: 14,
    color: "#000",
  },
  selectedText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default AppointmentsMenu;

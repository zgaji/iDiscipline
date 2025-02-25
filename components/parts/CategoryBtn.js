import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";

const categories = ["Home", "Profile", "Violations", "Complaints", "Appointments", "Handbook"];

const CategoryBTN = () => {
  const [selected, setSelected] = useState("Profile");

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
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
    backgroundColor: "#fff",
  },
  scrollView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedButton: {
    backgroundColor: "#0057FF",
    borderColor: "#0057FF",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  selectedText: {
    color: "#fff",
  },
});

export default CategoryBTN;

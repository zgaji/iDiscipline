import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const DOMenuBar = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get current screen name

  const menuItems = ["Home", "Student List", "Violations", "Incident Reports", "Appointments", "Reports", "DOHandbook"];

  const handlePress = (item) => {
    navigation.navigate(item);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.button, route.name === item && styles.activeButton]} 
            onPress={() => handlePress(item)}
          >
            <Text style={[styles.text, route.name === item && styles.activeText]}>
              {item.replace(/([A-Z])/g, " $1").trim()} 
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

export default DOMenuBar;

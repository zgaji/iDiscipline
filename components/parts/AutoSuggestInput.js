import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";

const AutoSuggestInput = ({ label, value, onChange, suggestions, placeholder }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const filteredSuggestions = suggestions
    .filter((suggestion) => {
      // Ensure suggestion is a string before calling toLowerCase()
      const suggestionName = String(suggestion).toLowerCase();
      return suggestionName.includes(value.toLowerCase()) && suggestion !== value;
    })
    .slice(0, 5);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={(text) => {
          onChange(text); // Update value as you type
          setShowSuggestions(true); // Show suggestions
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Delay closing suggestions
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {filteredSuggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onChange(suggestion); // Set the input value to the selected suggestion
                setShowSuggestions(false); // Close the suggestions after selecting
              }}
            >
              <Text style={styles.suggestion}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 10 },
  label: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  suggestionsContainer: {
    maxHeight: 150,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    position: "absolute",
    width: "100%",
    zIndex: 1000, // Ensure it's above other components
  },
  suggestion: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 14,
  },
});

export default AutoSuggestInput;

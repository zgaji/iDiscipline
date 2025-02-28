import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ViolationCard = ({ type, count }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate("ViolationDetailsScreen", { type, count })}
    >
      <View style={styles.iconContainer}>
        <FontAwesome name="gavel" size={24} color="#0057FF" />
      </View>
      <View style={styles.info}>
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.count}>{count}</Text>
      </View>
      <FontAwesome name="chevron-right" size={18} color="#999" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F0FF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  iconContainer: {
    backgroundColor: "#CDE3FF",
    padding: 10,
    borderRadius: 50,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  type: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  count: {
    fontSize: 14,
    color: "#666",
  },
});

export default ViolationCard;

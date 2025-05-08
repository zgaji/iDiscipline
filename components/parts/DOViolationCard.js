import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DOViolationCard = ({ type, count }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("DOViolationDetails", { type, count })}
    >
      {/* Left: Gavel Icon in rounded box */}
      <View style={styles.iconContainer}>
        <FontAwesome name="gavel" size={20} color="#2453C6" />
      </View>

      {/* Middle: Violation Type */}
      <View style={styles.middle}>
        <Text style={styles.type}>{type}</Text>
      </View>

      {/* Right: Count + Arrow */}
      <View style={styles.right}>
        <Text style={styles.count}>{count}</Text>
        <FontAwesome name="chevron-right" size={16} color="#999" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: "#8DB7FF",
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  middle: {
    flex: 1,
  },
  type: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E1E1E",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  count: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E1E1E",
    marginRight: 4,
  },
});

export default DOViolationCard;

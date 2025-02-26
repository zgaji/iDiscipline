import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../parts/Header";
import ViolationCaseCard from "../parts/ViolationCaseCard";

const ViolationDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { type, count } = route.params;

  const cases = [
    { id: 1, studentId: "#00000", dateSent: "Dec 25 2025", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 2, studentId: "#00000", dateSent: "Dec 25 2025", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
  ];

  return (
    <View style={styles.container}>
      <Header title="Violations" />
      
      {/* Dropdown Indicator */}
      <TouchableOpacity style={styles.dropdownIcon} onPress={() => navigation.goBack()}>
        <FontAwesome name="angle-down" size={24} color="#999" />
      </TouchableOpacity>

      {/* Violation Info */}
      <View style={styles.violationInfo}>
        <Text style={styles.violationType}>{type}</Text>
        <Text style={styles.offenseType}>Major Offense</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      </View>

      {/* Scrollable Cases */}
      <ScrollView contentContainerStyle={styles.caseList}>
        {cases.map((caseItem) => (
          <ViolationCaseCard key={caseItem.id} caseData={caseItem} />
        ))}
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity style={styles.fab}>
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
  },
  dropdownIcon: {
    alignSelf: "center",
    marginVertical: 10,
  },
  violationInfo: {
    backgroundColor: "#E8F0FF",
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  violationType: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  offenseType: {
    fontSize: 14,
    color: "#666",
  },
  countBadge: {
    backgroundColor: "#0057FF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  countText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  caseList: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default ViolationDetailsScreen;

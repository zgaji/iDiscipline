import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import ViolationCaseCard from "../parts/ViolationCaseCard";
import CaseDetails from "../parts/CaseDetails";


const ViolationDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { type = "Unknown", count = 0 } = route.params || {};

  const [selectedCase, setSelectedCase] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(100))[0];

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const navigateBack = () => {
    Animated.timing(slideAnim, {
      toValue: 500, 
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate("Violations");
    });
  };

  const cases = [
    { id: 1, studentId: "#00000", dateSent: "Dec 25 2025", description: "Lorem ipsum dolor sit amet." },
    { id: 2, studentId: "#00000", dateSent: "Dec 25 2025", description: "Lorem ipsum dolor sit amet." }
  ];

  const openModal = (caseItem) => {
    setSelectedCase(caseItem);
    setModalVisible(true);
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
      <TouchableOpacity style={styles.dropdownIcon} onPress={navigateBack}>
        <FontAwesome name="angle-down" size={24} color="#999" />
      </TouchableOpacity>
      <View style={styles.violationInfo}>
        <Text style={styles.violationType}>{type}</Text>
        <Text style={styles.offenseType}>Major Offense</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.caseList}>
        {cases.map((caseItem) => (
          <ViolationCaseCard key={caseItem.id} caseData={caseItem} openModal={openModal} />
        ))}
      </ScrollView>

      {/* Use the reusable modal */}
      <CaseDetails
        visible={modalVisible}
        caseData={selectedCase}
        onClose={() => setModalVisible(false)}
        onMessage={() => navigation.navigate("ChatPortal")}
      />
    </Animated.View>
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
  }
});

export default ViolationDetailsScreen;

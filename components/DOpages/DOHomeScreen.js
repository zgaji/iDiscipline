import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Header from "../parts/Header";
import MenuBar from "../parts/DOMenuBar";
import DOStatCard from "../parts/DOStatCard"; // ✅ Updated import
import ComplaintsList from "../parts/ComplaintsList";

const DOHomeScreen = () => {  
  return (
    <View style={styles.container}>
      <Header title="DO Home" />
      <MenuBar activeTab="Home" />
      
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* DOStatCards */}
        <View style={styles.cardRow}>
          <DOStatCard title="Violations" icon="⚖️" count="0" bgColor="#FF5E5B" />
          <DOStatCard title="Students" icon="👥" count="0" bgColor="#2BC999" />
          <DOStatCard title="Appointments" icon="📅" count="0" bgColor="#2C62FF" />
        </View>

        {/* Complaints Section */}
        <ComplaintsList />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
  },
  content: {
    padding: 20,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

export default DOHomeScreen; // ✅ Updated export


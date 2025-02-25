import React from "react";
import { View } from "react-native";
import Header from "../parts/Header";
import StudentCard from "../parts/StudentCard";
import StatCard from "../parts/StatCard";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0", padding: 10 }}>
      <Header />
      <StudentCard />
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
        <StatCard title="Violation" icon="⚖️" count="0" bgColor="red" />
        <StatCard title="Incident Reports" icon="👥" count="0" bgColor="green" />
        <StatCard title="Pending Case" icon="⏳" count="0" bgColor="orange" />
        <StatCard title="Appointment" icon="📅" count="0" bgColor="blue" />
      </View>
    </View>
  );
};

export default HomeScreen;

import React from "react";
import { View } from "react-native";
import Header from "../parts/Header";
import StudentCard from "../parts/StudentCard";
import StatCard from "../parts/StatCard";
import MenuBar from "../parts/MenuBar";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30}}>
      <View style={{ marginBottom: 15 }}> 
        <Header />
      </View>
      <View style={{ marginBottom: 15 }}> 
        <MenuBar />
      </View>
      <StudentCard />
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
        <StatCard title="Violation" icon="⚖️" count="0" bgColor="#FF5E5B" />
        <StatCard title="Incident Reports" icon="👥" count="0" bgColor="#2BC999" />
        <StatCard title="Pending Case" icon="⏳" count="1" bgColor="#FBB41A" />
        <StatCard title="Appointment" icon="📅" count="0" bgColor="#2C62FF" />
      </View>
    </View>
  );
};

export default HomeScreen;

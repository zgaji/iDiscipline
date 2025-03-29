import React from "react";
import { View, FlatList, TouchableOpacity, Image, ToastAndroid, Platform, StyleSheet } from "react-native";
import Header from "../parts/Header";
import StudentCard from "../parts/StudentCard";
import StatCard from "../parts/StatCard";
import MenuBar from "../parts/MenuBar";

const stats = [
  { title: "Violation", icon: require("../../assets/violation.png"), count: 0, bgColor: "#FF5A5F" },
  { title: "Pending Cases", icon: require("../../assets/pending.png"), count: 0, bgColor: "#FBB41A" },
  { title: "Appointments", icon: require("../../assets/appointment.png"), count: 0, bgColor: "#2C62FF" },
];

const ParentHomeScreen = () => { 
  const showToast = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
    } 
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      {/* Header */}
      <View style={{ marginBottom: 10 }}>
        <Header />
      </View>

      {/* Menu Bar */}
      <View style={{ marginBottom: 10 }}>
        <MenuBar />
      </View>

      {/* Student Card */}
      <StudentCard />

      {/* Stats Grid */}
      <FlatList
        data={stats}
        numColumns={2} 
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 5 }}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <StatCard title={item.title} icon={item.icon} count={item.count} bgColor={item.bgColor} />
        )}
      />

      {/* Floating Chatbot Button */}
      <TouchableOpacity style={styles.fab} onPress={showToast}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabIcon: {
    width: 30,
    height: 30,
    tintColor: "#fff",
  },
});

export default ParentHomeScreen;

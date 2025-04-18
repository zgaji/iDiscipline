import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Platform,
  StyleSheet,
} from "react-native";
import Header from "../parts/Header";
import StudentCard from "../parts/StudentCard";
import StatCard from "../parts/StatCard";
import MenuScreen from "./MenuScreen";

const stats = [
  { title: "Violation", icon: require("../../assets/violation.png"), count: 0, bgColor: "#FF5A5F" },
  { title: "Incident Reports", icon: require("../../assets/inc.png"), count: 0, bgColor: "#2BC999" },
  { title: "Pending Cases", icon: require("../../assets/pending.png"), count: 0, bgColor: "#FBB41A" },
  { title: "Appointments", icon: require("../../assets/appointment.png"), count: 0, bgColor: "#2C62FF" },
];

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const showToast = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Header openMenu={() => setMenuVisible(true)} />
      </View>

      <StudentCard />

      <FlatList
        data={stats}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <StatCard
            title={item.title}
            icon={item.icon}
            count={item.count}
            bgColor={item.bgColor}
          />
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={showToast}>
        <Image source={require("../../assets/chatbot.png")} style={styles.fabIcon} />
      </TouchableOpacity>

      {menuVisible && (
        <View style={styles.overlay}>
          <MenuScreen closeMenu={() => setMenuVisible(false)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F9FC",
    padding: 20,
    paddingTop: 30,
  },
  headerWrapper: {
    marginBottom: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 5,
  },
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10, // ensure it overlays other components
  },
});

export default HomeScreen;

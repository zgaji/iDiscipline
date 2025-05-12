<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> parent of 87154a4 (Login Auth +StudentList)
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
import { useContext } from 'react';
import { UserContext } from "../contexts/UserContext"; // ✅ import UserContext

const stats = [
  { title: "Violation", icon: require("../../assets/violation.png"), count: 0, bgColor: "#FF5A5F" },
  { title: "Incident Reports", icon: require("../../assets/inc.png"), count: 0, bgColor: "#2BC999" },
  { title: "Pending Cases", icon: require("../../assets/pending.png"), count: 0, bgColor: "#FBB41A" },
  { title: "Appointments", icon: require("../../assets/appointment.png"), count: 0, bgColor: "#2C62FF" },
];

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
<<<<<<< HEAD
  const { student, userRole } = useContext(UserContext); // ✅ read from context directly

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
=======
  const route = useRoute();
  const { userRole } = route.params || {};

  console.log('HomeScreen - userRole:', userRole);
>>>>>>> parent of 87154a4 (Login Auth +StudentList)

  const showToast = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
    }
  };

<<<<<<< HEAD
=======
  useEffect(() => {
    console.log('HomeScreen - userRole:', userRole);
  }, []);

>>>>>>> parent of 87154a4 (Login Auth +StudentList)
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Header openMenu={openMenu} />
      </View>

<<<<<<< HEAD
      {student ? (
        <StudentCard student={student} />
      ) : (
        <View style={styles.loadingWrapper}>
          <Text style={styles.loadingText}>Loading student information...</Text>
        </View>
      )}
=======
      <StudentCard />
>>>>>>> parent of 87154a4 (Login Auth +StudentList)

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

      {/* ✅ Render MenuScreen properly */}
      {menuVisible && (
        <View style={styles.overlay}>
<<<<<<< HEAD
          <MenuScreen closeMenu={closeMenu} />
=======
          <MenuScreen closeMenu={() => setMenuVisible(false)} />
>>>>>>> parent of 87154a4 (Login Auth +StudentList)
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: { flex: 1, backgroundColor: "#F4F9FC", padding: 20, paddingTop: 30 },
  headerWrapper: { marginBottom: 10 },
  columnWrapper: { justifyContent: "space-between", marginBottom: 5 },
  fab: { position: "absolute", bottom: 20, right: 20, backgroundColor: "#007AFF", width: 55, height: 55, borderRadius: 27.5, justifyContent: "center", alignItems: "center", elevation: 5 },
  fabIcon: { width: 30, height: 30, tintColor: "#fff" },
  loadingWrapper: { alignItems: "center", marginVertical: 20 },
  loadingText: { fontSize: 16, color: "#666" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.2)", zIndex: 10 },
=======
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
>>>>>>> parent of 87154a4 (Login Auth +StudentList)
});

export default HomeScreen;

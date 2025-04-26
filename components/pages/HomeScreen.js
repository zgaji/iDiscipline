import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Platform,
  Text,
  StyleSheet,
} from "react-native";
import Header from "../parts/Header";
import StudentCard from "../parts/StudentCard";
import StatCard from "../parts/StatCard";
import MenuScreen from "./MenuScreen";
import { useRoute } from '@react-navigation/native';

const stats = [
  { title: "Violation", icon: require("../../assets/violation.png"), count: 0, bgColor: "#D04B49" },
  { title: "Incident Reports", icon: require("../../assets/inc.png"), count: 0, bgColor: "#169971" },
  { title: "Pending Cases", icon: require("../../assets/pending.png"), count: 0, bgColor: "#DF9D0E" },
  { title: "Appointments", icon: require("../../assets/appointment.png"), count: 0, bgColor: "#10349E" },
];

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const route = useRoute();
  const { student, userRole } = route.params || {};


  console.log('HomeScreen - student:', student);  // Debugging to check student data

  const showToast = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Chatbot has been clicked", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    console.log('HomeScreen - student:', student);  // Log student to check data
  }, [student]);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Header openMenu={() => setMenuVisible(true)} />
      </View>

      {/* Ensure student exists before rendering StudentCard */}
      {student ? (
        <StudentCard student={student} />
      ) : (
        <Text>Loading student information...</Text>
      )}

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
          <MenuScreen 
            closeMenu={() => setMenuVisible(false)} 
            student={student}  
            userRole={userRole} 
          />
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
    zIndex: 10,
  },
});

export default HomeScreen;

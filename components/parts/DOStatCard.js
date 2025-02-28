import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const DOStatCard = ({ title, icon, count, bgColor }) => {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.count}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "30%",
    height: 100, 
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 10, 
  },
  icon: {
    width: 50,  
    height: 50, 
    resizeMode: "contain", 
    marginBottom: 5,
  },
  count: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default DOStatCard;

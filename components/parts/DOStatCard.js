import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const DOStatCard = ({ title, icon, count, bgColor }) => {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.icon} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",  
    height: 120,    
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    marginBottom: 5,  
    flexDirection: "row", 
    paddingLeft: 20, 
  },
  icon: {
    width: 60,  
    height: 60,
    resizeMode: "contain",  
  },
  title: {
    fontSize: 20,  // Title size
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 20,
    flex: 1,   // Ensures the title takes available space
    flexWrap: "wrap",  // Allows the title text to wrap to the next line if it overflows
    maxWidth: "60%",  // Limit the width to allow wrapping at an appropriate place
  },
  count: {
    fontSize: 30,  
    fontWeight: "bold",
    color: "#fff",
    position: "absolute",  
    right: 30,  
  },
});

export default DOStatCard;

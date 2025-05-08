import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const DOStatCard = ({ title, icon, count, bgColor }) => {
  // ✨ Split title manually by space (" ") so "Incident Reports" breaks nicely
  const titleParts = title.split(" ");

  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.icon} />
      </View>

      <View style={styles.textContainer}>
        {titleParts.map((part, index) => (
          <Text key={index} style={styles.title}>
            {part}
          </Text>
        ))}
      </View>

      <Text style={styles.count}>{count}</Text>
    </View>
  );
};

export default DOStatCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 120,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    marginRight: 15,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    lineHeight: 22,
  },
  count: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
});

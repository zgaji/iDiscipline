import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Header = () => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
      <TouchableOpacity>
        <Text>🔘</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Home</Text>
      <TouchableOpacity>
        <Text>🔔</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

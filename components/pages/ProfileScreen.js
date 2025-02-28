import React from "react";
import { View, ScrollView } from "react-native";
import Header from "../parts/Header";
import MenuBar from "../parts/MenuBar";
import StudentCard from "../parts/StudentCard";
import InfoCard from "../parts/InfoCard";

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#F4F9FC", padding: 20, marginTop: 30 }}>
      <View style={{ marginBottom: 15 }}> 
        <Header title="Student Profile" />
      </View>
      <View style={{ marginBottom: 15 }}> 
        <MenuBar />
      </View>
      <StudentCard />
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>


        <InfoCard
          title="Student Details"
          details={{
            "First Name": "",
            "Middle Name": "",
            "Last Name": "",
            Gender: "",
            "Birth Date": "",
            Address: "",
          }}
        />

        <InfoCard
          title="Emergency Contact"
          details={{
            "Parent/Guardian": "",
            Email: "",
            "Contact Number": "",
          }}
          titleStyle={{ color: "red", fontStyle: "italic" }}
        />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

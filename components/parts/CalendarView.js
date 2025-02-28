import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Example events
  const events = [
    { date: 11, title: "Case #1: Parent Meeting", time: "10:00 am to 11:00 pm", color: "#0057FF" },
    { date: 19, title: "Case #2: Student Counselling", time: "11:15 am to 11:40 pm", color: "#0057FF" },
  ];

  return (
    <View style={styles.container}>
      {/* Calendar Header */}
      <View style={styles.header}>
        <Text style={styles.year}>2021</Text>
        <Text style={styles.month}>February</Text>
        <TouchableOpacity>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Days */}
      <View style={styles.calendar}>
        {["Sun", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, index) => (
          <Text key={index} style={styles.dayLabel}>{day}</Text>
        ))}

        {/* Dates */}
        {[...Array(28)].map((_, index) => {
          const date = index + 1;
          const isEvent = events.some(event => event.date === date);

          return (
            <TouchableOpacity 
              key={index} 
              style={[styles.dateBox, isEvent && styles.eventDate]}
              onPress={() => setSelectedDate(date)}
            >
              <Text style={styles.dateText}>{date}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Event List */}
      <ScrollView style={styles.eventList}>
        {events.map((event, index) => (
          <View key={index} style={styles.eventCard}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDate}>January 06, 2021</Text>
            <View style={[styles.timeBox, { backgroundColor: event.color }]}>
              <Text style={styles.timeText}>{event.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  year: {
    fontSize: 18,
    fontWeight: "bold",
  },
  month: {
    fontSize: 16,
    color: "#666",
  },
  nextText: {
    fontSize: 14,
    color: "#0057FF",
    fontWeight: "bold",
  },
  calendar: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayLabel: {
    width: "14.2%",
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 5,
  },
  dateBox: {
    width: "14.2%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
  },
  eventDate: {
    backgroundColor: "#FF5E5B",
    borderRadius: 5,
  },
  eventList: {
    marginTop: 15,
  },
  eventCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventDate: {
    fontSize: 14,
    color: "#666",
  },
  timeBox: {
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  timeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default CalendarView;

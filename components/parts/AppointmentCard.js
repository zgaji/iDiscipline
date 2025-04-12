import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppointmentCard = ({ title, date, time }) => {
  return (
    <View style={styles.card}>
      <View style={styles.line} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.dateTime}>{date} - {time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',  // Icon and text will be in a row
    alignItems: 'flex-start', // Align elements to the start of the container
    marginBottom: 10,  // Spacing between cards
  },
  line: {
    width: 5,  // Width of the left blue line
    height: '100%',
    backgroundColor: '#007AFF',  // Blue color for the line
    marginLeft: 10,  // Space between the line and text
  },
  textContainer: {
    marginLeft: 10,  // Space between the blue line and text
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',  // Dark color for title
  },
  dateTime: {
    fontSize: 14,
    color: '#666',  // Lighter color for date/time
  },
});

export default AppointmentCard;

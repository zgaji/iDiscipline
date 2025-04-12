import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';

const MenuScreen = ({ closeMenu }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentRoute = route.name;

  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-280)).current;  // Starts off-screen

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,  // Slide to the center of the screen
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenuHandler = () => {
    Animated.timing(slideAnim, {
      toValue: -280,  // Slide back off-screen
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(false);
      if (closeMenu) closeMenu();
    });
  };

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
    closeMenuHandler();  // Close the menu when navigation happens
  };

  const menuItems = [
    { name: 'Home', icon: <MaterialIcons name="home" size={24} />, screen: 'HomeScreen' },
    { name: 'Violations', icon: <MaterialIcons name="gavel" size={24} />, screen: 'DOViolations' },
    { name: 'Student List', icon: <FontAwesome5 name="user" size={20} />, screen: 'DOStudentList' },
    { name: 'Incident Reports', icon: <FontAwesome5 name="user-friends" size={20} />, screen: 'DOIncidentReports' },
    { name: 'Appointments', icon: <MaterialIcons name="calendar-today" size={24} />, screen: 'DOAppointments' },
    { name: 'Reports', icon: <Entypo name="bar-graph" size={24} />, screen: 'ReportsScreen' },
    { name: 'Student Handbook', icon: <MaterialIcons name="menu-book" size={24} />, screen: 'DOHandbookScreen' },
  ];

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={closeMenuHandler}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <Image source={require('../../assets/user.png')} style={styles.avatar} />
        <Text style={styles.userName}>User</Text>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.menuList}>
        {menuItems.map((item, index) => {
          const isActive = currentRoute === item.screen;

          return (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, isActive && styles.activeItem]}
              onPress={() => handleNavigate(item.screen)}
            >
              <View style={styles.iconContainer}>
                {React.cloneElement(item.icon, {
                  color: isActive ? '#fff' : '#000',
                })}
              </View>
              <Text style={[styles.menuText, isActive && styles.activeText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 40,
    elevation: 5,
    position: 'absolute',  // Ensure the menu overlays the screen
    left: 0,
    top: 0,
  },
  header: {
    backgroundColor: '#0057FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  closeIcon: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  userInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
  },
  userName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuList: {
    paddingHorizontal: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  activeItem: {
    backgroundColor: '#0057FF',
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
    fontWeight: 'bold',
  },
  activeText: {
    color: '#fff',
  },
});

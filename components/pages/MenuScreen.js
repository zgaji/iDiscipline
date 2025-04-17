import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';

const MenuScreen = ({ closeMenu, userRole }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentRoute = route.name;

  // Define the menu items for Admin
  const adminMenuItems = [
    { name: 'Home', icon: <MaterialIcons name="home" size={24} />, screen: 'DOHomeScreen' },
    { name: 'Violations', icon: <MaterialIcons name="gavel" size={24} />, screen: 'DOViolations' },
    { name: 'Student List', icon: <FontAwesome5 name="user" size={20} />, screen: 'DOStudentList' },
    { name: 'Incident Reports', icon: <FontAwesome5 name="user-friends" size={20} />, screen: 'DOIncidentReports' },
    { name: 'Appointments', icon: <MaterialIcons name="calendar-today" size={24} />, screen: 'DOAppointments' },
    { name: 'Reports', icon: <Entypo name="bar-graph" size={24} />, screen: 'ReportsScreen' },
    { name: 'Student Handbook', icon: <MaterialIcons name="menu-book" size={24} />, screen: 'DOHandbookScreen' },
  ];

  // Define the menu items for Student
  const studentMenuItems = [
    { name: 'Home', icon: <MaterialIcons name="home" size={24} />, screen: 'HomeScreen' },
    { name: 'Profile', icon: <MaterialIcons name="person" size={24} />, screen: 'StudentProfile' },
    { name: 'Violations', icon: <MaterialIcons name="gavel" size={24} />, screen: 'ViolationsScreen' },
    { name: 'Incident Reports', icon: <FontAwesome5 name="user-friends" size={20} />, screen: 'IncidentReportsScreen' },
    { name: 'Appointments', icon: <MaterialIcons name="calendar-today" size={24} />, screen: 'AppointmentsScreen' },
    { name: 'Handbook', icon: <MaterialIcons name="menu-book" size={24} />, screen: 'HandbookScreen' },
  ];

  // Choose the appropriate menu items based on the user role
  const menuItems = userRole === 'admin' ? adminMenuItems : studentMenuItems;

  const [menuVisible, setMenuVisible] = useState(true);  // Set to true to make menu visible initially

  const openMenu = () => {
    setMenuVisible(true);  // Show menu
  };

  const closeMenuHandler = () => {
    setMenuVisible(false);  // Hide menu
    if (closeMenu) closeMenu();
    navigation.goBack(); // Go back to the previous screen when menu is closed
  };

  const handleNavigate = (screen) => {
    if (screen === currentRoute) {
      // If the menu item is the current screen, do not navigate
      closeMenuHandler();  // Close the menu if already on the current screen
      return;
    }
    
    navigation.navigate(screen);  // Navigate to the new screen
    closeMenuHandler();  // Close the menu when navigation happens
  };

  return (
    <View style={[styles.container, { display: menuVisible ? 'flex' : 'none' }]}>
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={closeMenuHandler}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.userInfo}>
        <Image source={require('../../assets/user.png')} style={styles.avatar} />
        <Text style={styles.userName}>User</Text>
      </View>

      <ScrollView style={styles.menuList}>
        {menuItems.map((item, index) => {
          const isActive = currentRoute === item.screen;

          return (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, isActive && styles.activeItem]}  // Add active style
              onPress={() => handleNavigate(item.screen)}  // Use handleNavigate for navigation
            >
              <View style={styles.iconContainer}>
                {React.cloneElement(item.icon, {
                  color: isActive ? '#fff' : '#000',  // Set icon color to white if active
                })}
              </View>
              <Text style={[styles.menuText, isActive && styles.activeText]}>  // Apply active text style
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Full screen layout
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,  // Ensure it overlays content
    elevation: 10,
    paddingTop: 40,
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
    backgroundColor: '#0057FF',  // Highlight active item with background color
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
    color: '#fff',  // Change active text color to white
  },
});

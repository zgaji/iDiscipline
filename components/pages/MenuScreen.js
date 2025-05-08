import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { UserContext } from '../contexts/UserContext'; 
import { useIsFocused } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const MenuScreen = ({ closeMenu }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { student, userRole } = useContext(UserContext);
  const isFocused = useIsFocused();

  const [menuVisible, setMenuVisible] = useState(true);
  const slideAnim = useState(new Animated.Value(-screenWidth))[0]; // Start off-screen
  const fadeAnim = useState(new Animated.Value(0))[0]; // Fade background

  useEffect(() => {
    // Animate in when mounted
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const closeMenuHandler = () => {
    // Animate out
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -screenWidth,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMenuVisible(false);
      if (closeMenu) closeMenu();
      navigation.goBack(); // After animation
    });
  };

  const handleNavigate = (screen) => {
    if (route.name === screen) {
      closeMenuHandler();
      return;
    }

    closeMenuHandler();
    setTimeout(() => {
      if (screen === 'HomeScreen') {
        navigation.replace('HomeScreen');
      } else {
        navigation.navigate(screen);
      }
    }, 400); // After closing animation
  };

  const userName = userRole === 'admin' 
    ? 'Admin' 
    : student 
    ? `${student.firstName} ${student.lastName}` 
    : 'Student';

  const adminMenuItems = [
    { name: 'Home', icon: <MaterialIcons name="home" size={24} />, screen: 'DOHomeScreen' },
    { name: 'Violations', icon: <MaterialIcons name="gavel" size={24} />, screen: 'DOViolations' },
    { name: 'Student List', icon: <FontAwesome5 name="user" size={20} />, screen: 'DOStudentList' },
    { name: 'Incident Reports', icon: <FontAwesome5 name="user-friends" size={20} />, screen: 'DOIncidentReports' },
    { name: 'Appointments', icon: <MaterialIcons name="calendar-today" size={24} />, screen: 'DOAppointments' },
    { name: 'Reports', icon: <Entypo name="bar-graph" size={24} />, screen: 'ReportsScreen' },
    { name: 'Student Handbook', icon: <MaterialIcons name="menu-book" size={24} />, screen: 'DOHandbookScreen' },
  ];

  const studentMenuItems = [
    { name: 'Home', icon: <MaterialIcons name="home" size={24} />, screen: 'HomeScreen' },
    { name: 'Profile', icon: <MaterialIcons name="person" size={24} />, screen: 'ProfileScreen' },
    { name: 'Violations', icon: <MaterialIcons name="gavel" size={24} />, screen: 'ViolationsScreen' },
    { name: 'Incident Reports', icon: <FontAwesome5 name="user-friends" size={20} />, screen: 'IncidentReportsScreen' },
    { name: 'Appointments', icon: <MaterialIcons name="calendar-today" size={24} />, screen: 'AppointmentsScreen' },
    { name: 'Handbook', icon: <MaterialIcons name="menu-book" size={24} />, screen: 'HandbookScreen' },
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : studentMenuItems;

  if (!menuVisible) return null; // Don't render if menu is hidden

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Fade background */}
      <TouchableWithoutFeedback onPress={closeMenuHandler}>
        <Animated.View style={[styles.fadeBackground, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      {/* Sliding menu */}
      <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.header}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <TouchableOpacity onPress={closeMenuHandler}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.userInfo}>
          <Image source={require('../../assets/user.png')} style={styles.avatar} />
          <Text style={styles.userName}>{userName}</Text>
        </View>

        <ScrollView style={styles.menuList}>
          {menuItems.map((item, index) => {
            const isActive = route.name === item.screen;

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
    </View>
  );
};

export default MenuScreen;


const styles = StyleSheet.create({
  fadeBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1,
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 2,
    elevation: 5,
    paddingTop: 40,
  },
  header: {
    backgroundColor: '#0F296F',
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
    fontSize: 20,
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

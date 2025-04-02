import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import InputField from '../parts/InputField';
import Button from '../parts/Button';
import Checkbox from '../parts/CheckBox';
import { useNavigation } from '@react-navigation/native';

const USERS = {
  student: { email: 'user', password: '123', role: 'student' },
  admin: { email: 'admin', password: '321', role: 'admin' },
  parent: { email: 'parent', password: '123', role: 'parent' },
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    let timer;
    if (isLocked) {
      timer = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsLocked(false);
            setAttempts(0);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked]);

  const handleLogin = () => {
    if (isLocked) {
      Alert.alert("Too Many Attempts", `Please wait ${remainingTime} seconds before trying again.`);
      return;
    }

    const enteredEmail = email.toLowerCase().trim();
    const enteredPassword = password.trim();

    const user = Object.values(USERS).find(u => u.email.toLowerCase() === enteredEmail);

    if (user) {
      if (user.password === enteredPassword) {
        Alert.alert("Login Successful", `Welcome, ${user.role}!`);
        setAttempts(0); // Reset attempts after successful login

        // Navigate based on role
        if (user.role === 'admin') {
          navigation.navigate('DOHome');
        } else if (user.role === 'parent') {
          navigation.navigate('ParentHomeScreen');
        } else {
          navigation.navigate('Home');
        }
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        Alert.alert("Login Failed", "Incorrect password. Please try again.");

        if (newAttempts >= 3) {
          setIsLocked(true);
          setRemainingTime(180);
          Alert.alert("Account Locked", "Too many failed attempts. Please try again in 3 minutes.");
        }
      }
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      Alert.alert("Login Failed", "Invalid email. Please try again.");

      if (newAttempts >= 3) {
        setIsLocked(true);
        setRemainingTime(180);
        Alert.alert("Account Locked", "Too many failed attempts. Please try again in 3 minutes.");
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Blue Background */}
      <View style={styles.blueBackground}>
      </View>

      {/* White Login Form with Rounded Top */}
      <View style={styles.whiteContainer}>
        <Text style={styles.title}>Login</Text>

        <InputField
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
        />

        <InputField
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.optionsRow}>
          <Checkbox label="Remember Me" />
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <Button title="Sign In" onPress={handleLogin} disabled={isLocked} />

        {isLocked && (
          <Text style={styles.lockoutText}>
            Too many attempts! Try again in {remainingTime} seconds.
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007AFF", 
  },
  blueBackground: {
    height: "40%", 
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    marginTop: -30, 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
    color: '#0057ff',
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  forgotText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  lockoutText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default LoginScreen;

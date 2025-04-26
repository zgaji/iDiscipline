import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import InputField from '../parts/InputField';
import Button from '../parts/Button';
import Checkbox from '../parts/CheckBox';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, getIdTokenResult } from 'firebase/auth'; // ✅ import getIdTokenResult
import { getDoc, doc } from 'firebase/firestore'; 
import { auth, firestore } from '../backend/firebaseConfig'; // adjust if needed

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

  const handleLogin = async () => {
    if (isLocked) {
      Alert.alert("Too Many Attempts", `Please wait ${remainingTime} seconds before trying again.`);
      return;
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      const user = userCredential.user;
  
      if (user) {
        // 1️⃣ Verify email first
        if (!user.emailVerified) {
          Alert.alert(
            "Email Not Verified",
            "Please verify your email address before logging in. A verification email has been sent to your inbox."
          );
          return;
        }
  
        // 2️⃣ Fetch custom claims (role)
        const idTokenResult = await getIdTokenResult(user);
        const role = idTokenResult.claims.role;
  
        console.log("🔥 Custom claims role:", role);
  
        if (!role) {
          Alert.alert("Error", "No role assigned to this user. Please contact support.");
          return;
        }
  
        if (role === 'admin') {
          // ✅ If Admin, no need to fetch student data
          navigation.replace('DOHomeScreen', { userRole: role });
        } else if (role === 'student') {
          // ✅ Fetch additional student data
          const userDocRef = doc(firestore, "users", user.email);
          const userDoc = await getDoc(userDocRef);
  
          if (userDoc.exists()) {
            const studentData = userDoc.data();
            navigation.replace('HomeScreen', { userRole: role, student: studentData });
          } else {
            Alert.alert("Error", "Student record not found.");
          }
        } else {
          Alert.alert("Error", "Unrecognized user role.");
        }
      }
    } catch (error) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      Alert.alert("Login Failed", "Incorrect email or password. Please try again.");
  
      if (newAttempts >= 10) {
        setIsLocked(true);
        setRemainingTime(180);
        Alert.alert("Account Locked", "Too many failed attempts. Please try again in 3 minutes.");
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.blueBackground}></View>

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

        <Button title="Sign In" onPress={handleLogin} disabled={isLocked} style={styles.btn}/>

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
    backgroundColor: "#E3EBF3", 
  },
  blueBackground: {
    height: "40%", 
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
    color: '#0F296F',
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
  btn: {
    backgroundColor: '#0F296F',
    marginTop: 20,
  },

});

export default LoginScreen;

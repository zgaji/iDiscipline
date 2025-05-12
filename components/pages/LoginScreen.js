import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import InputField from '../parts/InputField';
import Button from '../parts/Button';
import Checkbox from '../parts/CheckBox';
import { useNavigation } from '@react-navigation/native';
<<<<<<< HEAD
import { signInWithEmailAndPassword, getIdTokenResult } from 'firebase/auth'; // ✅ import getIdTokenResult
import { getDoc, doc } from 'firebase/firestore'; 
import { auth, firestore } from '../backend/firebaseConfig'; // adjust if needed
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { sendPasswordResetEmail } from 'firebase/auth';
=======
import { auth } from '../../firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
>>>>>>> parent of 87154a4 (Login Auth +StudentList)

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
<<<<<<< HEAD
  const { setUserRole, setStudent, setIsAuthenticated } = useContext(UserContext);
=======
  const [loading, setLoading] = useState(true);
>>>>>>> parent of 87154a4 (Login Auth +StudentList)
  
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

  // Handle Forgot Password functionality
  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    sendPasswordResetEmail(auth, email.trim())
      .then(() => {
        Alert.alert(
          "Password Reset",
          "An email with password reset instructions has been sent to your inbox."
        );
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "There was an issue sending the password reset email. Please try again.");
      });
  };

  const handleLogin = async () => {
    if (isLocked) {
      Alert.alert("Too Many Attempts", `Please wait ${remainingTime} seconds before trying again.`);
      return;
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      const user = userCredential.user;
  
      if (user) {
        const role = user.email === 'admin@email.com' ? 'admin' : 'student'; // Update as necessary
        Alert.alert("Login Successful", `Welcome, ${role}!`);
        setAttempts(0);
  
<<<<<<< HEAD
        // 2️⃣ Fetch custom claims (role)
        const idTokenResult = await getIdTokenResult(user);
        const role = idTokenResult.claims.role;
  
        console.log("🔥 Custom claims role:", role);
  
        if (!role) {
          Alert.alert("Error", "No role assigned to this user. Please contact support.");
          return;
        }
  
        if (role === 'admin') {
          setUserRole('admin');
          setIsAuthenticated(true);
          navigation.replace('DOHomeScreen');
        } else if (role === 'student') {
          const userDocRef = doc(firestore, "users", user.email);
          const userDoc = await getDoc(userDocRef);
      
          if (userDoc.exists()) {
            const studentData = userDoc.data();
  
            // 🛡️ Block login if archived
            if (studentData.isArchived || studentData.isDisabled) {
              Alert.alert("Account Archived", "This account has been disabled. Please contact the administration.");
              return;
            }
  
            setStudent(studentData);
            setUserRole('student');
            setIsAuthenticated(true);
            navigation.replace('HomeScreen');
          } else {
            Alert.alert("Error", "Student record not found.");
          }
        }
=======
        // Navigate to the redirect screen after login
        navigation.replace('RedirectScreen', { isAuthenticated: true, userRole: role });
>>>>>>> parent of 87154a4 (Login Auth +StudentList)
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
<<<<<<< HEAD
  
  
=======
>>>>>>> parent of 87154a4 (Login Auth +StudentList)

  return (
    <View style={styles.container}>
      {/* Blue Background */}
      <View style={styles.blueBackground}></View>

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
          <TouchableOpacity onPress={handleForgotPassword}>
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

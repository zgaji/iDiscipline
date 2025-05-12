// Optimized LoginScreen with Supabase Integration (Retained Design)

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import InputField from '../parts/InputField';
import Button from '../parts/Button';
import Checkbox from '../parts/CheckBox';
import { useNavigation } from '@react-navigation/native';
import supabase from '../backend/supabaseClient';
import { UserContext } from '../contexts/UserContext';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const { setUserRole, setStudent, setIsAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if (isLocked) {
      const timer = setInterval(() => {
        setRemainingTime(prev => prev > 0 ? prev - 1 : 0);
        if (remainingTime <= 1) {
          clearInterval(timer);
          setIsLocked(false);
          setAttempts(0);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isLocked, remainingTime]);

  const handleLogin = async () => {
    if (isLocked) return Alert.alert("Locked", `Try again in ${remainingTime} seconds.`);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: password.trim() });
      if (error) throw error;

      const { data: profile } = await supabase.from('students').select('*').eq('studentEmail', email.trim()).single();

      if (!profile) return Alert.alert("Error", "User profile not found.");

      if (profile.roles === 'admin') {
        setUserRole('admin');
        setIsAuthenticated(true);
        navigation.replace('DOHomeScreen');
      } else if (profile.roles === 'student') {
        if (profile.isArchived || profile.isDisabled) return Alert.alert("Account Disabled", "This account is disabled.");

        setStudent(profile);
        setUserRole('student');
        setIsAuthenticated(true);
        navigation.replace('HomeScreen');
      }
    } catch (error) {
      setAttempts(prev => prev + 1);
      Alert.alert("Login Failed", "Incorrect email or password.");

      if (attempts >= 4) {
        setIsLocked(true);
        setRemainingTime(180);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.blueBackground}></View>
      <View style={styles.whiteContainer}>
        <Text style={styles.title}>Login</Text>
        <InputField placeholder="Email Address" value={email} onChangeText={setEmail} />
        <InputField placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

        <View style={styles.optionsRow}>
          <Checkbox label="Remember Me" />
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <Button title="Sign In" onPress={handleLogin} disabled={isLocked} style={styles.btn} />

        {isLocked && <Text style={styles.lockoutText}>Locked! Try again in {remainingTime} seconds.</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E3EBF3" },
  blueBackground: { height: "40%" },
  whiteContainer: { flex: 1, backgroundColor: "#FFF", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 30, marginTop: -30 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "left", color: '#0F296F' },
  optionsRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 10 },
  forgotText: { color: "#007AFF", fontWeight: "bold" },
  lockoutText: { color: "red", textAlign: "center", marginTop: 10 },
  btn: { backgroundColor: '#0F296F', marginTop: 20 },
});

export default LoginScreen;
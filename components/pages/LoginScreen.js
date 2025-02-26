import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import InputField from '../parts/InputField';
import Button from '../parts/Button';
import Checkbox from '../parts/CheckBox';
import { styles } from '../stylesheet/Styles';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation(); 

  // State to manage email and password input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Hardcoded correct credentials (For demo purposes)
  const correctEmail = "test";
  const correctPassword = "password";

  // Function to check if credentials match
  const isValid = 
    email.trim().toLowerCase() === correctEmail.toLowerCase() && 
    password.trim() === correctPassword;

  const handleLogin = () => {
    if (isValid) {
      navigation.navigate("Home"); // Navigate to HomeScreen
    } else {
      Alert.alert("Invalid Credentials", "Please check your email and password.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Top section */}
      <View style={styles.topSection}>
        <Text style={styles.headerText}>Login</Text>
      </View>

      {/* Bottom section */}
      <View style={styles.bottomSection}>
        <Text style={styles.title}>Login</Text>
        
        <InputField 
          placeholder="Email Address" 
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        
        <InputField 
          placeholder="Password" 
          secureTextEntry 
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <View style={styles.optionsRow}>
          <Checkbox label="Remember Me" />
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button with Validation */}
        <Button title="Sign In" onPress={handleLogin} disabled={!isValid} />
      </View>
    </View>
  );
};

export default LoginScreen;


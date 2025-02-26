import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import InputField from '../parts/InputField';
import Button from '../parts/Button';
import Checkbox from '../parts/CheckBox';
import { styles } from '../stylesheet/Styles';
import { useNavigation } from '@react-navigation/native';

const USERS = {
  student: { email: 'student@example.com', password: 'student123', role: 'student' },
  admin: { email: 'admin@example.com', password: 'admin123', role: 'admin' },
};

const LoginScreen = () => {
  const navigation = useNavigation(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const enteredEmail = email.toLowerCase().trim();
    const enteredPassword = password.trim();

    console.log("Entered Email:", enteredEmail);
    console.log("Entered Password:", enteredPassword);

    const user = Object.values(USERS).find(
      u => u.email.toLowerCase() === enteredEmail && u.password === enteredPassword
    );

    if (user) {
      Alert.alert('Login Successful', `Welcome, ${user.role}!`);
      navigation.navigate('Home'); 
    } else {
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.headerText}>Login</Text>
      </View>

      <View style={styles.bottomSection}>
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

        <Button title="Sign In" onPress={handleLogin} />
      </View>
    </View>
  );
};

export default LoginScreen;

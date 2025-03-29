import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import InputField from '../parts/InputField';
import Button from '../parts/Button';
import Checkbox from '../parts/CheckBox';
import { styles } from '../stylesheet/Styles';
import { useNavigation } from '@react-navigation/native';

const USERS = {
  student: { email: 'user', password: '123', role: 'student' },
  admin: { email: 'admin', password: '321', role: 'admin' },
  parent: { email: 'parent' , password: '123', role: 'parent' },
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
      
      if (user.role === 'admin') {
        navigation.navigate('DOHome'); // Admin's Home Screen
      } else if (user.role === 'parent') {
        navigation.navigate('ParentHomeScreen'); // Parent's Home Screen
      } else {
        navigation.navigate('Home'); // Student's Home Screen
      }
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

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import InputField from '../parts/InputField';
import Button from '../parts/Button';
import Checkbox from '../parts/CheckBox';
import { styles } from '../stylesheet/Styles';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation(); // Hook to handle navigation

  const handleLogin = () => {
    // Add authentication logic here (optional)
    navigation.navigate("Home"); // Navigate to HomeScreen
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
        <InputField placeholder="Email Address" />
        <InputField placeholder="Password" secureTextEntry />

        <View style={styles.optionsRow}>
          <Checkbox label="Remember Me" />
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button with Navigation */}
        <Button title="Sign In" onPress={handleLogin} />
      </View>
    </View>
  );
};

export default LoginScreen;

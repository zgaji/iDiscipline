import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Checkbox from '../components/CheckBox';
import { styles } from '../components/stylesheet/Styles';

const LoginScreen = () => {
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

        <Button title="Sign In" />
      </View>
    </View>
  );
};

export default LoginScreen;

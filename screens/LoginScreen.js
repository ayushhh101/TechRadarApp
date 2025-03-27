import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { login } from '../helpers/authService';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
      Alert.alert('Login Successful');
      navigation.replace('Home'); // Navigate to home screen
    } catch (error) {
      Alert.alert('Login Failed', error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Username:</Text>
      <TextInput value={username} onChangeText={setUsername} placeholder="Enter username" />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} placeholder="Enter password" secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen;
